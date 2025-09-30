import { useState, useEffect } from "react";
import SalesTable from "../components/SalesTable";

export default function Sales() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <p className="text-center mt-4">
        {" "}
        Please log in to see Sales Information.
      </p>
    );
  }

  //to get all my customers
  const fetchCustomers = async () => {
    if (!token) return;
    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customer/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log("Fetched customers", data);
    setCustomers(data);
  };

  const fetchProducts = async () => {
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
    setProducts(data);
  };

  //to get all my sales
  const fetchSales = async () => {
    if (!token) return;
    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/sales",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchProducts();
    fetchSales();
  }, []);

  const handleProductChange = (product_id, quantity) => {
    const product = products.find((p) => p.product_id === product_id);
    if (!product) return;

    const updated = selectedProducts.map((p) =>
      p.product_id === product_id ? { ...p, quantity, price: product.price } : p
    );
    if (existing) {
      existing.quantity = quantity;
      existing.price = product.price;
    } else {
      updated.push({
        product_id,
        name: product.name,
        quantity,
        price: product.price,
      });
    }

    setSelectedProducts(updated);
    if (!selectedProducts.find((p) => p.product_id === product_id)) {
      updated.push({
        product_id: product_id,
        name: product.name,
        quantity,
        price: product.price,
      });
    }

    setSelectedProducts(updated);
    const newTotal = updated.reduce((sum, p) => sum + p.quantity * p.price, 0);
    setTotal(newTotal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer || selectedProducts.length === 0)
      return alert("Select customer and products");

    // 1. Create sale
    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/sales",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ customer_id: selectedCustomer, total }),
      }
    );
    const data = await res.json();
    const sale_id = data.sale_id;

    // 2. Add products to sale
    for (const p of selectedProducts) {
      await fetch(
        `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/sales-inventory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            sale_id: sale_id,
            product_id: p.product_id,
            quantity: p.quantity,
            price: p.price,
          }),
        }
      );

      // Optionally, update stock
      const newStock =
        products.find((prod) => prod.product_id === p.product_id).stock -
        p.quantity;
      if (newStock <= 0) alert(`Stock for ${p.name} is low!`);
    }

    // Refresh sales table
    fetchSales();

    // Reset form
    setSelectedCustomer("");
    setSelectedProducts([]);
    setTotal(0);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl text-center font-bold mb-6">
          Sales Information Management
        </h1>

        {/* Record Sale Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded p-6 mb-6"
        >
          <h2 className="text-xl font-bold mb-4">Record New Sale</h2>

          <label className="block mb-2 font-semibold">Customer</label>
          <select
            value={selectedCustomer}
            onChange={(e) => setSelectedCustomer(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          >
            <option value="">Select Customer</option>
            {customers.map((c) => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.name}
              </option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Products</label>
          {products.map((p) => (
            <div
              key={p.product_id}
              className="flex justify-between mb-2 items-center"
            >
              <span>
                {p.name} (${p.price}) - Stock: {p.stock}
              </span>
              <input
                type="number"
                min="0"
                max={p.stock}
                placeholder="Qty"
                className="border p-1 w-20 rounded"
                onChange={(e) =>
                  handleProductChange(p.product_id, Number(e.target.value))
                }
              />
            </div>
          ))}

          <p className="mt-4 font-bold">Total: ${total}</p>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-green-400"
          >
            Submit Sale
          </button>
        </form>

        <SalesTable sales={sales} refresh={fetchSales} />
      </div>
    </div>
  );
}
