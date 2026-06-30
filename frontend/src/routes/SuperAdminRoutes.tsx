import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import SuperAdminDashboard from "../pages/superAdmin/Dashboard";
import Users from "../pages/superAdmin/Users";
import Admins from "../pages/superAdmin/Admins";
import Hotels from "../pages/superAdmin/Hotels";
import Bookings from "../pages/superAdmin/Bookings";
import Reviews from "../pages/superAdmin/Reviews";

import { ROLES } from "../constants/roles";

export default function SuperAdminRoutes() {
  const allowed = [ROLES.SUPER_ADMIN];

  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="users"
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="admins"
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <Admins />
          </ProtectedRoute>
        }
      />

      <Route
        path="hotels"
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <Hotels />
          </ProtectedRoute>
        }
      />

      <Route
        path="bookings"
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <Bookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="reviews"
        element={
          <ProtectedRoute allowedRoles={allowed}>
            <Reviews />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}