import { BrowserRouter } from "react-router-dom";
import * as Inventory from "./Inventory"
import Layout from "./pages/Layout";
import Router from "./pages/Router"
import './App.css'

function App() {
  return (
    <Inventory.Provider>
      <BrowserRouter>
        <Layout>
          <Router/>
        </Layout>
      </BrowserRouter>
    </Inventory.Provider>
  )
}

export default App
