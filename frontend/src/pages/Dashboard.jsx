export default function Dashboard() {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"))
  } catch (error) {
    user = null;
  }

  const name =user?.name || user?.username;
  

  if (!token) {
    return (
      <div className="p-6">
      <h2 className="text-2xl font-bold text-red-500">Please login</h2>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-3xl font-bold ">Welcome back, {name || "User"}! You are logged in!</p>
    </div>
  );
}
