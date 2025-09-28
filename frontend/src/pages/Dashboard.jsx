export default function Dashboard() {
  const token = localStorage.getItem("token");
  const username = "Customer";

  if (!token) {
    return (
      <div className="p-6">
      <h2 className="text-2xl font bold text-red-500">Please login</h2>
      </div>
    )
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      {token ? <p>Welcome back, {username}! You are logged in!</p>}
    </div>
  );
}
