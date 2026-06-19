import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const Topbar = () => {
  const navigate = useNavigate();

  const { role, logout } = useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-6">
      <h2 className="font-bold">{role}</h2>

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
