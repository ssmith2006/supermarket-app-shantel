import React from "react";
import { useState } from "react";

export default function SalesTable({ sales, refresh }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <p className="text-center mt-4">
        {" "}
        Please log in to see Sales Information.
      </p>
    );
  }
  const deleteCustomer = async (id) => {
    await fetch(
      `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/sales/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Sale successfully deleted!");
    refresh();
  };

  return (
    <div className="bg-white rounded shadow flex justify-center items-center mt-2">
      <table className="mt-5 mb-5">
        <thead className="bg-gray-500 ">
          <tr>
            <th className="border px-4 py-2 text-white font-semibold">
              Sales ID
            </th>
            <th className="border px-4 py-2 text-white font-semibold">
              Customer Name
            </th>
            <th className="border px-4 py-2 text-white font-semibold">
              Products
            </th>
            <th className="border px-4 py-2 text-white font-semibold">
              Quantity
            </th>
            <th className="border px-4 py-2 text-white font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s.sales_id}>
              <td className="border px-4 py-2">{s.sale_id}</td>
              <td className="border px-4 py-2">{s.name}</td>
              <td className="border px-4 py-2">${s.email}</td>
              <td className="border px-4 py-2">{s.phone}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0"
                    onClick={() => deleteCustomer(s.customer_id)}
                  >
                    DELETE
                  </button>
                  <button
                    className="bg-orange-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0"
                    onClick={() => setEditing(c)}
                  >
                    EDIT
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
