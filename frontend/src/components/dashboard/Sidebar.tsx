import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? "bg-blue-600 text-white"
      : "hover:bg-slate-800";

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      {" "}
      <h1 className="text-2xl font-bold mb-8">Hotel PMS </h1>
      {role === "SUPER_ADMIN" ? (
        <div className="space-y-2">
          <Link
            to="/super-admin"
            className={`block px-4 py-2 rounded ${isActive("/super-admin")}`}
          >
            Dashboard
          </Link>

          <Link
            to="/super-admin/admins"
            className={`block px-4 py-2 rounded ${isActive("/super-admin/admins")}`}
          >
            Admins
          </Link>

          <Link
            to="/super-admin/users"
            className={`block px-4 py-2 rounded ${isActive("/super-admin/users")}`}
          >
            Users
          </Link>

          <Link
            to="/super-admin/hotels"
            className={`block px-4 py-2 rounded ${isActive("/super-admin/hotels")}`}
          >
            Hotels
          </Link>

          <Link
            to="/super-admin/bookings"
            className={`block px-4 py-2 rounded ${isActive("/super-admin/bookings")}`}
          >
            Bookings
          </Link>

          <Link
            to="/super-admin/reviews"
            className={`block px-4 py-2 rounded ${isActive("/super-admin/reviews")}`}
          >
            Reviews
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs uppercase text-slate-400 mb-2">
            Management
          </div>

          <Link
            to="/admin"
            className={`block px-4 py-2 rounded ${isActive("/admin")}`}
          >
            Dashboard
          </Link>

          <Link
            to="/admin/hotels"
            className={`block px-4 py-2 rounded ${isActive("/admin/hotels")}`}
          >
            Hotels
          </Link>

          <Link
            to="/admin/staff"
            className={`block px-4 py-2 rounded ${isActive("/admin/staff")}`}
          >
            Staff
          </Link>

          <div className="text-xs uppercase text-slate-400 mt-6 mb-2">
            Inventory
          </div>

          <Link
            to="/admin/room-types"
            className={`block px-4 py-2 rounded ${isActive("/admin/room-types")}`}
          >
            Room Types
          </Link>

          <Link
            to="/admin/rooms"
            className={`block px-4 py-2 rounded ${isActive("/admin/rooms")}`}
          >
            Rooms
          </Link>

          <div className="text-xs uppercase text-slate-400 mt-6 mb-2">
            Operations
          </div>

          <Link
            to="/admin/bookings"
            className={`block px-4 py-2 rounded ${isActive("/admin/bookings")}`}
          >
            Bookings
          </Link>

          <Link
            to="/admin/payments"
            className="block px-4 py-2 rounded hover:bg-slate-800"
          >
            Payments
          </Link>

          <Link to="/admin/reviews" className="block px-4 py-2 rounded hover:bg-slate-800">
            Reviews
          </Link>
          <Link
            to="/admin/customers"
            className="block px-4 py-2 rounded hover:bg-slate-800"
          >
            Customers
          </Link>

          <div className="text-xs uppercase text-slate-400 mt-6 mb-2">
            Analytics
          </div>

          <Link
            to="/admin/reports"
            className="block px-4 py-2 rounded hover:bg-slate-800"
          >
            Reports
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
