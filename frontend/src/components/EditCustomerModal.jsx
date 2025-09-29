import { useState } from "react";

function EditCustomerModal({ customer, onClose, onUpdated }) {
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.emaii);
  const [phone, setPhone] = useState(customer.phone);
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to edit a customer.");
      return;
    }

    // Update customer info
    const res = await fetch(
      `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customers/${customer.customer_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, phone }),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.message || "Error updating customer.");
      return;
    }

    // Upload photo if selected
    if (photo) {
      const formData = new FormData();
      formData.append("photo", photo);
      const photoRes = await fetch(
        `https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customers/${customer.customer_id}/upload-image`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );
      if (!photoRes.ok) {
        setMessage("Customer updated, but failed to upload photo.");
      }
    }

    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 min-h-screen">
      <div className="bg-white p-6 rounded shadow w-[25rem] mt-20">
        <h2 className="text-xl font-bold mb-4">Edit Customer</h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-500 mb-1">Name</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-500 mb-1">Photo (optional)</label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>

          {message && <p className="text-red-600 mt-2">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditCustomerModal;
