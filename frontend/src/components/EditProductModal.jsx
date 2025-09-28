import { useState} from "react"

function EditProductModal({product, onClose, onUpdated}){

const [name, setName] = useState ("")
const [stock, setStock] = useState ("")
const [price, setPrice] = useState ("")
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

if(!token){
  setMessage("You must be logged in to edit product.");
  return;
}
  const res = await fetch (`https://miniature-parakeet-4jw4wxj4x44g377rj-3000.app.github.dev/inventory/${product.product_id}`,{
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer $ {token}`},
    body:JSON.stringify({name, price, stock}),
  })
  const data = await res.json();
  if(res.ok){
    setMessage("Product updated successfully!")
    onUpdated();
    onClose();
  }else{
    setMessage(data:
               message || "Error updating product"),
    
  
}

return (
<div className="fixed inset-0 flex item-centr justify-center bg-black bg-opacity-40 min-height-100">
<div className="bg-white p-6 rounded shadow w-[25rem] h-[28rem] mt-20">
<h2 className="text-xl font-bold mb-4">Edit Product</h2>
<form className="space-y-3" onSubmit={handleSubmit}>
<div>
<label htmlFor="name" className="block text-gray-500 mb-1">Product Name</label>
<input type="text" className="w-full border p-2 mb-2 mt-2 rounded" onChange={(e) => setName(e.target.value)} value={name}</input>
</div>
<div>
<label htmlFor="name" className="block text-gray-500 mb-1">Stock</label>
<input type="number" className="w-full border p-2 mb-2 mt-2 rounded" onChange={(e) => setStock(e.target.value)} value={stock}</input>
</div>
<div>
<label htmlFor="name" className="block text-gray-500 mb-1">Price</label>
<input type="number" className="w-full border p-2 mb-2 mt-2 rounded" onChange={(e) => setPrice(e.target.value)} value={price}</input>
</div>
<div className="flex justify-end space-x-2 pt-8">
<button type="button" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>Cancel</button>
  </div>
  {message && (
        <p className="text-red-600 text-semibold ml-4 mr-4 mt-9">{message}</p>
      )}
  </form>
  </div>
  </div>
  )
}
export default EditProductModal;
<button type="submit" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-greeb-500">Save Changes</button>
