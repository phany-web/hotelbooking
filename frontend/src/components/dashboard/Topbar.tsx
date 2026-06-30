import { Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import NotificationDropdown from "../notification/NotificationDropdown";

import { useAuthStore } from "../../store/auth.store";

const Topbar = () => {
  const navigate = useNavigate();

  const { user, role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header
      className="
      h-20
      bg-white
      border-b
      border-slate-200
      px-6
      flex
      items-center
      justify-between
      "
    >
      <div className="relative w-100">
        <Search
          size={18}
          className="
          absolute
          left-3
          top-3.5
          text-slate-400
          "
        />

        <input
          type="text"
          placeholder="Search bookings, rooms, customers..."
          className="
          w-full
          pl-10
          pr-4
          py-3
          border
          border-slate-200
          rounded-xl
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />
      </div>

      <div className="flex items-center gap-5">
        <NotificationDropdown />

        <div className="text-right">
          <h3 className="font-semibold text-slate-900">{user?.fullName}</h3>

          <p className="text-sm text-slate-500">{role}</p>
        </div>

        <div
          className="
          w-11
          h-11
          rounded-full
          bg-blue-600
          text-white
          flex
          items-center
          justify-center
          font-bold
          "
        >
          {user?.fullName.charAt(0) || "A"}
        </div>

        <button
          onClick={handleLogout}
          className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-xl
          bg-red-500
          hover:bg-red-600
          text-white
          transition
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
