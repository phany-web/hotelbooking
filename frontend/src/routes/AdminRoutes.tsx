import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import Hotels from "../pages/admin/Hotels";
import Rooms from "../pages/admin/Rooms";
import Staff from "../pages/admin/Staff";
import Bookings from "../pages/admin/Bookings";
import Customers from "../pages/admin/Customers";
import RoomTypes from "../pages/admin/RoomTypes";
import Reviews from "../pages/admin/Reviews";
import Payments from "../pages/admin/Payments";
import Tasks from "../pages/admin/Tasks";
import Notifications from "../pages/admin/Notifications";
import Reports from "../pages/admin/Reports";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route
        path=""
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="hotels"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Hotels />
          </ProtectedRoute>
        }
      />

      <Route
        path="rooms"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Rooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="staff"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Staff />
          </ProtectedRoute>
        }
      />

      <Route
        path="bookings"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Bookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="customers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="room-types"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <RoomTypes />
          </ProtectedRoute>
        }
      />

      <Route
        path="reviews"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Reviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="payments"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="tasks"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Tasks />
          </ProtectedRoute>
        }
      />

      <Route
        path="notifications"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="reports"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]}>
            <Reports />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}