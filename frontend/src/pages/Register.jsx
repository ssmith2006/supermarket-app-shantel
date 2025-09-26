import { useState } from "react";
export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token, data.token")
        setMessage("Registered successfully!");
      } else {
        setMessage(data.message || "Error registering");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded shadow w-96 mx-auto mt-20"
    >
      {" "}
      <h2 className="text-2xl font-bold mb-4">Register</h2>{" "}
      <input
        className="border p-2 w-full mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <input
        type="password"
        className="border p-2 w-full mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-green-500">
        Register
      </button>{" "}
      {message && <p className="mt-3 text-red-500">{message}</p>}{" "}
    </form>
  );
}
