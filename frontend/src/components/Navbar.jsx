import { Link } from "react-router-dom";

import React from "react";



export default function Navbar() {
  return (
    //     <div style={{ background: "lime", color: "black", padding: "20"}}>
    //       <h1>DEBUG NAVBAR</h1>
    //        </div>
    //   );
    // }

    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Smith Family Supermarket</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Login
        </Link>
        <Link to="/register" className="hover:underline">
          Register
        </Link>
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
