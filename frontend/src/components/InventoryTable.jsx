import React from "react";

export default function InventoryTable({ products }) {
  const token = localStorage.getItem("token");

  // TEMP: don't block rendering while building
  if (!token) {
    return <p className="text-center mt-4"> Please log in to see inventory.</p>
  }
  const deleteProduct = async (id) => {
    await fetch(
      `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    refresh() || alert("Item deleted successfully");
  };

  return (
    <div className="bg-white rounded shadow flex justify-center items-center mt-2">
      <table className="mt-5 mb-5">
        <thead className="bg-gray-500 ">
          <tr>
            <th className="border px-4 py-2 text-white font-semibold">Name</th>
            <th className="border px-4 py-2 text-white font-semibold">Price</th>
            <th className="border px-4 py-2 text-white font-semibold">Stock</th>
            <th className="border px-4 py-2 text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.product_id}>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">${p.price}</td>
              <td className="border px-4 py-2">{p.stock}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0"
                    onClick={() => deleteProduct(p.product_id)}
                  >
                    DELETE
                  </button>
                  <button className="bg-orange-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0">
                    EDIT
                  </button>
                  <button className="bg-green-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0">
                    UPLOAD
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
