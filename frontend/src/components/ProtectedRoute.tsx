import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

interface Props {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const { token, role } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
