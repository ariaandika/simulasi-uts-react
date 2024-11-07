import { Route, Routes } from "react-router-dom";
import * as Inventory from "../Inventory"
import Dashboard from "./Dashboard"



export function Router() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard}></Route>
      <Route path="/inventories" Component={Inventory.Page}></Route>
      <Route path="/inventories/new" Component={Inventory.AddPage}></Route>
    </Routes>
  )
}

export default Router;

