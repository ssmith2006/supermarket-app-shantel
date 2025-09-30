function LowStockCard({ products = [], threshold = 5 }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl text-center font-semibold mt-5 mb-10">Low Stock Products</h2>
      {products.length === 0 ? (
        <p className="italic text-gray-400">No low-stock products</p>
      ) : (
        <ol className="list-disc pl-5">
          {products
            .filter((p) => p.stock <= threshold)
            .map((p) => (
              <li className="italic" key={p.product_id}>
                {p.name} - only {p.stock} left.
              </li>
            ))}
        </ol>
      )}
    </div>
  );
}

export default LowStockCard;
