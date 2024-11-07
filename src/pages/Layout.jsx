import { Link } from "react-router-dom"

export function Layout({ children }) {
  return <section className="w-full h-screen flex">
    <Sidebar/>
    <div className="flex-1">
      <Header/>
      {children}
    </div>
  </section>
}

const links = [
  ["Dashboard","/"],
  ["Inventory List","/inventories"],
  ["Add Item","/inventories/new"],
]

function Sidebar() {
  return <div className="px-4 py-4 flex flex-col text-white bg-indigo-900">
    <h2 className="mb-8 text-3xl font-bold">Inventaris</h2>
    <div className="grid gap-4">
      {links.map(([name,link],i) =>
        <Link to={link} key={i}
          className="py-2 px-4 pr-16 w-full
          font-bold cursor-pointer rounded-md
          hover:bg-indigo-600 transition-colors "
        >
            {name}
        </Link>
      )}
    </div>
  </div>
}

function Header() {
  return <div className="px-8 py-4 shadow">
    <h1 className="text-4xl font-bold mb-1">Manajemen Inventaris Barang</h1>
    <div className="text-gray-500">Aria Putra Andika</div>
  </div>
}

export default Layout;

