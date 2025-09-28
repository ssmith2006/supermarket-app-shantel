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
      <h1 className="text-xl font-bold font-serif">Smith Family Market</h1>
      <p className="text-sm italic text-orange-300">
        Groceries with Heart, For Every Home
      </p>
      <div className="space-x-4">
        <Link to="/" className="hover:text-orange-400 font-semibold underline">
          Login
        </Link>
        <Link to="/register" className="hover:text-orange-400 font-semibold underline">
          Register
        </Link>
        <Link to="/dashboard" className="hover:text-orange-400 font-semibold underline">
          Dashboard
        </Link>
        <Link to="/inventory" className="hover:text-orange-400 font-semibold underline">
          Inventory
        </Link>
         <Link to="/customer" className="hover:text-orange-400 font-semibold underline">
          Customers
        </Link> 
        <Link to="/sales" className="hover:text-orange-400 font-semibold underline">
          Sales
        </Link>
      </div>
    </nav>
  );
}
