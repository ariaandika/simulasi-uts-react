import { useNavigate, useParams } from "react-router-dom";
import * as tw from "./tw"
import { createContext, useContext, useState } from "react";

const key = "inventory";
const State = createContext();
const Mutate = createContext();

export function Provider({ children }) {
  let storage = localStorage.getItem(key);
  if (!storage) {
    storage = '[]';
    localStorage.setItem(key, '[]')
  }

  const [data,setData] = useState(JSON.parse(storage));

  const mutation = {
    save(newDatas) {
      localStorage.setItem(key,JSON.stringify(newDatas));
      setData(newDatas)
    },
    add(newData) { this.save([...data,newData]); },
    delete(i) { this.save(data.toSpliced(i,1)) },
  };

  return <State.Provider value={data}>
    <Mutate.Provider value={mutation}>
      {children}
    </Mutate.Provider>
  </State.Provider>
}

export function Page() {
  const mutate = useContext(Mutate);
  const goto = useNavigate();

  const [select, setSelect] = useState(0);
  const [modal,setModal] = useState(null);

  const detailModal = String((modal != "detail") && tw.hide);
  const addModal = String((modal != "add") && tw.hide);
  const deleteModal = String((modal != "delete") && tw.hide);

  const modalListener = e => {
    let id;

    if (id = e.target.dataset.detail) {
      if (e.altKey) {
        goto("/inventories/" + parseInt(id));
      } else {
        setSelect(parseInt(id));
        setModal("detail");
      }
    }

    if (id = e.target.dataset.delete) {
      setSelect(parseInt(id));
      setModal("delete");
    }

    if (id = e.target.dataset["confirmDelete"]) {
      mutate.delete(parseInt(id));
      setModal(null);
    }

    if (e.target.dataset.add) {
      if (e.altKey) {
        goto("/inventories/new")
      } else {
        setModal("add");
      }
    }

    if (e.target.dataset.close) {
      setModal(null);
    }
  };

  const escape = e => {
    if (e.key == "Escape") {
      setModal(null);
    }
  };

  return (
    <section className="p-16 " onClick={modalListener} onKeyDown={escape} tabIndex="-1">
      <section data-close="true" className={tw.backdrop + detailModal}>
        <div className="w-full max-w-[480px]"><Detail i={select}/></div>
      </section>

      <section data-close="true" className={tw.backdrop + addModal}>
        <div className="w-full max-w-[1080px]"><Add/></div>
      </section>

      <section data-close="true" className={tw.backdrop + deleteModal}>
        <div className="w-full max-w-[1080px]"><Delete i={select}/></div>
      </section>

      <List/>

      <div className="my-4">
        <button data-add="true" className={tw.button}>Tambah Item</button>
      </div>

    </section>
  )
}

export function List() {
  const state = useContext(State);

  return (
    <section className="w-full rounded-md shadow-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b hover:bg-gray-100">
            <th className={tw.th}>Nama</th>
            <th className={tw.th}>Kategori</th>
            <th className={tw.th}>Stok</th>
            <th className={tw.th}>Harga</th>
            <th className={tw.th}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {state.map((e,i) =>
            <tr key={i} className="hover:bg-gray-100">
              <td className={tw.td}>{e.nama}</td>
              <td className={tw.td}>{e.kategori}</td>
              <td className={tw.td}>{e.stok}</td>
              <td className={tw.td}>{e.harga}</td>
              <td className={tw.td}>
                <div className="flex gap-2">
                  <button data-detail={i} className={tw.button}>
                    Detail
                  </button>
                  <button data-delete={i} className={tw.button + "bg-red-600 hover:bg-red-500"}>
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  )
}

export function Detail({ i }) {
  const data = useContext(State)[i] ?? {};

  return <div className="w-full min-h-[240px] bg-white rounded-md">
    <div className="grid gap-4 p-8">
      <h2 className="mb-2 text-4xl font-bold">Inventory Detail</h2>

      <div className="grid grid-cols-2">
        <div className="grid font-bold">
          <div>Nama</div>
          <div>Kategori</div>
          <div>Stok</div>
          <div>Harga</div>
        </div>
        <div>
          <div>: {data.nama}</div>
          <div>: {data.kategori}</div>
          <div>: {data.stok}</div>
          <div>: {data.harga}</div>
        </div>
      </div>
    </div>
  </div>
}

export function Add() {
  const mutate = useContext(Mutate);

  function onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    mutate.add(Object.fromEntries(new FormData(form)))
    form.reset();
    form.click();
  }

  return (
    <form data-close="true" onSubmit={onSubmit}>
      <div className="grid gap-4 w-full p-8 bg-white rounded-md">
        <h2 className="mb-2 text-4xl font-bold">Tambah Inventory</h2>

        <Input name="nama">Nama</Input>
        <Input name="kategori">Kategori</Input>
        <Input name="stok">Stok</Input>
        <Input name="harga">Harga</Input>

        <button className={tw.button}>Tambah</button>

      </div>
    </form>
  )
}

export function Delete({ i }) {
  return (
    <div className="p-8 w-full bg-white rounded-md">
      <h2 className="mb-4 text-4xl font-bold">LAH HAPUSS ??</h2>
      <p className="mb-2">Anda akan menghapus data dengan index {i}</p>
      <div className="w-full flex justify-end gap-2">
        <button data-close="true" className={tw.button}>
          Batal
        </button>
        <button data-confirm-delete={i} className={tw.button + "bg-red-600 hover:bg-red-500"}>
          Hapus
        </button>
      </div>
    </div>
  )
}

const label = "flex flex-col gap-2 ";
const input = "px-4 py-2 border border-gray-400 focus:border-indigo-600 rounded-md ";

function Input({ name, children }) {
  return <label className={label}>
    <span>{children}</span>
    <input name={name} className={input} required/>
  </label>
}

export function DetailPage() {
  const goto = useNavigate();
  const back = () => goto("/inventories");

  const id = parseInt(useParams().id ?? "NaN");
  if (isNaN(id)) {
    back();
  }

  return (
    <section className="py-4 max-w-[480px]">
      <Detail i={id}/>
      <div className="px-8">
        <button className={tw.button} onClick={back}>Kembali</button>
      </div>
    </section>
  )
}

export function AddPage() {
  const goto = useNavigate();

  const submitListener = e => {
    if (e.target.dataset.close) {
      e.preventDefault();
      goto("/inventories");
    }
  };

  return (
    <section className="py-4" onClick={submitListener}>
      <Add/>
    </section>
  )
}

function seedInventories() {
  return [
    {
      nama: "BMW M3 GTR",
      kategori: "Mobil",
      stok: 128,
      harga: 76_600_000,
    },
    {
      nama: "Glukol",
      kategori: "Kebutuhan Sekolah",
      stok: 42176,
      harga: 2_000,
    },
    {
      nama: "Infinix M5",
      kategori: "Handphone",
      stok: 1736,
      harga: 1_599_000,
    },
    {
      nama: "Indomie",
      kategori: "Makanan Instan",
      stok: 7163,
      harga: 4_000,
    },
  ]
}

