import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/auth/login", {
        method: "POST",
        headers: { Authorization: "Basic " + btoa(`${username}: ${password}`) },
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data)
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

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 min-h-screen text-center">
      {/* My Market name */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0 }}
        className="text-7xl font-bold font-serif text-blue-500 mb-2"
      >
        Smith Family Market
      </motion.h1>

      {/* My market Slogan */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="text-2xl text-orange-400 font-serif font-semibold mt-2 mb-5"
      >
        Groceries with Heart, For Every Home
      </motion.p>

      {/* My Login form with motion */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="bg-white p-6 rounded-lg shadow w-100"
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-blue-400">
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
          className="w-7/12 bg-blue-500 text-white py-2 rounded mb-3 hover:bg-orange-300"
        >
          Login
        </button>{" "}
        <button
          type="submit"
          className="w-7/12 bg-blue-500 text-white py-2 rounded hover:bg-orange-300"
        >
          Register
        </button>
        {message && <p className="mt-3 text-red-500">{message}</p>}
      </motion.form>
    </div>
  );
}
