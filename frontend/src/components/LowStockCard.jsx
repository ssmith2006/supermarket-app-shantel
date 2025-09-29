function LowStockCard({ products=[], threshold }) {
    const lowStockProducts = products.filter((p) => p.stock <= threshold);
//it's gonna filter through the products
if(lowStockProducts.length === 0){
  return null;
}
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mt-5 mb-10">Low Stock Products</h2>
      <ol className="list-disc pl-5">
        {lowStockProducts.length === 0 ? (
          <li className="italic text-gray-400">No low-stock products</li>
        ) : (
        lowStockProducts.map((p) => (
          <li className="italic" key={p.product_id}>
            {p.name} - only {p.stock} left.
          </li>
        ))
      )}
      </ol>
    </div>
  );
}

export default LowStockCard;