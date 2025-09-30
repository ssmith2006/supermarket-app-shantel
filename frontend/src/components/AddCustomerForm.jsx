import { useState } from "react";

function AddCustomerForm({onAdded}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to add a new customer.");
      return;
    }
    console.log({name, email, phone});

    const res = await fetch(
      "https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({ name, email, phone }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      setMessage("Customer added successfully!");
      setName("");
      setEmail("");
      setPhone("");

      if (onAdded) onAdded()
    } else {
      setMessage(data.message || "Error adding customer.");
    }
  };

  return (
    <div className="flex justify-center mt-8">
    {/* start of form */}
    <form className="bg-white shadow rounded p-4 mb-6 flex space-x-3 " onSubmit={handleSubmit}>
      
      <div>
        <label htmlFor="name" className="block text-gray-500 mb-1 ml-2">
          Customer Name
        </label>
        <input
          type="text"
          placeholder="Customer name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="text" className="block text-gray-500 mb-1 ml-2">
          Customer Email
        </label>
        <input
          type="text"
          placeholder="Customer Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="text" className="block text-gray-500 mb-1 ml-2">
          Phone
        </label>
        <input
          type="number"
          placeholder="Phone"
          className="border p-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2  mt-4 rounded hover:bg-green-700"
      >
        Add Customer
      </button>

      {message && (
        <p className="text-red-600 text-semibold ml-4 mr-4 mt-9">{message}</p>
      )}
    </form>
    </div>
  );
}

export default AddCustomerForm;
