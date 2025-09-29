import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Inventory from "./pages/Inventory.jsx"
import Customer from "./pages/Customer.jsx";
import Sales from "./pages/Sales.jsx"

export default function App() {
  return (
    <>
      {/* Always render NavBar */}
      <NavBar />

      {/* Page content */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/sales" element={<Sales />} />
      </Routes>
    </>
  );
}
