function TopProductsCard({ products }) {
  return (
    <div className="bg-white shadow rounded p-4 mb-4">
      <h2 className="text-xl font-semibold mb-4">Top 5 Products by Unit</h2>
      <ol className="list-disc pl-5">
        {products.map((p) => (
          <li className="italic" key={p.product_id}>
            {p.name} -{p.total_units} units sold.
          </li>
        ))}
      </ol>
    </div>
  );
}

export default TopProductsCard;
