import { Link } from "react-router-dom";

interface SidebarProps {
  role: string;
}

const Sidebar = ({ role }: SidebarProps) => {
  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">Hotel System</h1>

      {role === "SUPER_ADMIN" ? (
        <div className="space-y-4">
          <Link to="/super-admin" className="block">
            Dashboard
          </Link>

          <Link to="/super-admin/admins" className="block">
            Admins
          </Link>

          <Link to="/super-admin/users" className="block">
            Users
          </Link>

          <Link to="/super-admin/hotels" className="block">
            Hotels
          </Link>

          <Link to="/super-admin/bookings" className="block">
            Bookings
          </Link>

          <Link to="/super-admin/reviews" className="block">
            Reviews
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <Link to="/admin" className="block">
            Dashboard
          </Link>

          <Link to="/admin/hotels" className="block">
            Hotels
          </Link>

          <Link to="/admin/room-types" className="block">
            Room Types
          </Link>

          <Link to="/admin/rooms" className="block">
            Rooms
          </Link>

          <Link to="/admin/bookings" className="block">
            Bookings
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
