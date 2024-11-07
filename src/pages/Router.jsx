import { Route, Routes } from "react-router-dom";
import * as Inventory from "../Inventory"

export function Router() {
  return (
    <Routes>
      <Route path="/" Component={Inventory.DashboardPage}></Route>
      <Route path="/inventories" Component={Inventory.Page}></Route>
      <Route path="/inventories/new" Component={Inventory.AddPage}></Route>
      <Route path="/inventories/:id" Component={Inventory.DetailPage}></Route>
    </Routes>
  )
}

export default Router;

