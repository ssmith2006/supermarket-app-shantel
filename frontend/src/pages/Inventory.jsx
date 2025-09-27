import { useState, useEffect } from "react";
import AddProductsForm from "../components/AddProductsForm";
import InventoryTable from "../components/InventoryTable";
import TopProductsCard from "../components/TopProductsCard";

function Inventory() {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts]  = useState([]);
  const token = localStorage.getItem("token");

  // TEMP: don't block rendering while building
  if (!token){
      return (
        <p className="text-center mt-4"> Please log in to see inventory.</p>
      );
  }

  const fetchInventory = async () => {
    if (!token) return;
    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    // console.log(data)
    setProducts(data);
  };
const fetchTopProducts = async ()=>{
  const res = await fetch(
    "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory/top/units",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  setTopProducts(data)
}
  useEffect(() => {
    fetchInventory();
    fetchTopProducts();
  }, []);

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6">Inventory Dashboard</h1>
        <div className="bg-white shadow rounded p-4 mb-6">
          <h2 className="text-xl font-semibold text-center">
            Total Inventory Value
          </h2>
          <p className="text-green-600 text-2xl font-bold text-center">$100</p>
        </div>
        <AddProductsForm />
        <InventoryTable products={products} />
        <TopProductsCard products={topProducts}/>
      {/* <LowStockCard/> */}
      </div>
    </div>
  );
}

export default Inventory;
