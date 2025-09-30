import React from "react"
import { useState } from "react";
import EditCustomerModal from "./EditCustomerModal.jsx";

export default function CustomerTable({customer, onChanged}){
  const [editing, setEditing] = useState(null)
    const token = localStorage.getItem("token")

    if (!token) {
        return <p className="text-center mt-4"> Please log in to see Customer Information.</p> 
    }
    const deleteCustomer =async (id)=> {
        await fetch(`https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customer/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
    )
    alert("Customer profile successfully deleted!")
   if (onChanged) onChanged()
    }

    return (
    <div className="bg-white rounded shadow flex justify-center items-center mt-2">
      <table className="mt-5 mb-5">
        <thead className="bg-gray-500 ">
          <tr>
            <th className="border px-4 py-2 text-white font-semibold">Picture</th>
            <th className="border px-4 py-2 text-white font-semibold">Name</th>
            <th className="border px-4 py-2 text-white font-semibold">Email</th>
            <th className="border px-4 py-2 text-white font-semibold">Phone</th>
            <th className="border px-4 py-2 text-white font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customer.map((c) => (
            <tr key={c.customer_id}>
              <td className="border px-4 py-2">{c.profile_picture_url ? (
              <img src={c.profile_picture_url} alt={c.name} className="w-[10rem] h-[10rem] object-cover rounded"/>
              ) : (<span className="italic text-gray-400">No Image</span>)
              }
              </td>
              <td className="border px-4 py-2">{c.name}</td>
              <td className="border px-4 py-2">${c.email}</td>
              <td className="border px-4 py-2">{c.phone}</td>
              <td className="border px-4 py-2">
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0"
                    onClick={() => deleteCustomer(c.customer_id)}
                  >
                    DELETE
                  </button>
                  <button className="bg-orange-500 text-white font-semibold px-2 py-1 rounded flex-shrink-0" onClick={() => setEditing(c)}>
                    EDIT
                  </button>
                  
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
      <EditCustomerModal customer={editing} onClose={() => setEditing(null)} onUpdated={onChanged}/>
      )}
    </div>
  );
}

