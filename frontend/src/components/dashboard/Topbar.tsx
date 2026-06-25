import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

import NotificationDropdown from "../notification/NotificationDropdown";

const Topbar = () => {
  const navigate = useNavigate();

  const { role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">
      <div className="flex items-center gap-4">
        <NotificationDropdown />
        <h2 className="font-bold">{role}</h2>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
