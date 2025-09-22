export default function Dashboard() {
  const token = localStorage.getItem("token");
  return (
    <div className="p-6">
      {" "}
      <h2 className="text-2xl font-bold">Dashboard</h2>{" "}
      {token ? <p>You are logged in </p> : <p>Please login.</p>}{" "}
    </div>
  );
}
