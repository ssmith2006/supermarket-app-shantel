import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { Authorization: "Basic " + btoa(`${username}: ${password}`) },
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Network Error");
    }
  };

  /** if (username === "admin" && password === "1234") {setMessage ("Successfully logged in!")
     }else{
        setMessage("Invalid username or password. Please try again!")}**/

  return (
    <div className="flex items-center justify-center bg-gray-100 min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-100">
        <h2 className="text-2xl font-bold text-center mb-8 text-pink-400">
          Login
        </h2>
        <input
          type="text"
          placeholder="username"
          className="w-full border rounded p-2 mb-6"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="w-full border rounded p-2 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-700"
        >Login</button>
        {message && <p className="mt-3 text-red-500">{message}</p>}
      </form>
    </div>
  );
}
