import { useState } from "react";

function AddProductsForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to add a new product.");
      return;
    }
    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ name, price, stock }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setMessage("Product added successfully!");
      setName("");
      setPrice(0);
      setStock(0);
    } else {
      setMessage(data.message || "Error adding product.");
    }
  };

  return (
    <div className="flex justify-center mt-8">
    {/* start of form */}
    <form className="bg-white shadow rounded p-4 mb-6 flex space-x-3 " onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="name" className="block text-gray-500 mb-1 ml-2">
          Product Name
        </label>
        <input
          type="text"
          placeholder="Product name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-gray-500 mb-1 ml-2">
          Price
        </label>
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-gray-500 mb-1 ml-2">
          Stock
        </label>
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2  mt-4 rounded hover:bg-green-700"
      >
        Add Product
      </button>

      {message && (
        <p className="text-red-600 text-semibold ml-4 mr-4 mt-9">{message}</p>
      )}
    </form>
    </div>
  );
}

export default AddProductsForm;
