import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: Props) => {
  const { token, role } = useAuthStore();

  if (token) {
    switch (role) {
      case "SUPER_ADMIN":
        return <Navigate to="/super-admin" replace />;

      case "ADMIN":
        return <Navigate to="/admin" replace />;

      case "STAFF":
        return <Navigate to="/staff" replace />;

      default:
        return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default GuestRoute;
