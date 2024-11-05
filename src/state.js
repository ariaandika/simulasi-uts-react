
/**
  * @typedef {{
  *   nama: string
  *   kategori: string
  *   stok: number
  *   harga: number
  * }} Data
  * */

/** @type {Data[]} */
export const inventories = [];

export function seedInventories() {
  inventories.push([
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
  ]);
}


