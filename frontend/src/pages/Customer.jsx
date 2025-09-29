import { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";

export default function Customer(){
 const [customer, setCustomer] = useState([]);
 const token = localStorage.getItem("token") 

 if(!token){
    return (
       <p className="text-center mt-4"> Please log in to see Customer Information.</p> 
    )
 }

 const fetchCustomer = async () => {
    if(!token) return
    const res = await fetch("https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/customer", 
        {
        headers: {
            Authorization: `Bearer ${token}`},
    }
    )
    const data = await res.json()
    setCustomer(data)
 }
 useEffect(()=>{
    fetchCustomer()
 }, [])

 return (
    <div className="flex justify-center mt-8">
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-3xl text-center font-bold mb-6">Customer Information</h1>
          
        <CustomerTable customer={customer} refresh={fetchCustomer}/>
      </div>
    </div>
  );
}