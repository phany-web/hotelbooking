import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";

import AdminDashboard from "../pages/admin/Dashboard";
import SuperAdminDashboard from "../pages/superAdmin/Dashboard";
import Users from "../pages/superAdmin/Users";
import Admins from "../pages/superAdmin/Admins";
import Hotels from "../pages/admin/Hotels";
import RoomTypes from "../pages/admin/RoomTypes";
import Hotel from "../pages/superAdmin/Hotels";
// import Bookings from "../pages/superAdmin/Bookings";
import Reviews from "../pages/superAdmin/Reviews";
import Rooms from "../pages/admin/Rooms";
import Staff from "../pages/admin/Staff";
import Bookings from "../pages/admin/Bookings";
import Customers from "../pages/admin/Customers";
import Review from "../pages/admin/Reviews";

import ProtectedRoute from "../components/ProtectedRoute";
import Register from "../pages/auth/Register";
import HotelDetail from "../pages/public/HotelDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/users"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Users />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/admins"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Admins />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/hotels"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Hotel />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/bookings"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Bookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/super-admin/reviews"
        element={
          <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
            <Reviews />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/admin/hotels"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Hotels />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/room-types"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <RoomTypes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/rooms"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Rooms />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/staff"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Staff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Bookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/customers"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reviews"
        element={
          <ProtectedRoute allowedRoles={["ADMIN", "STAFF"]}>
            <Review />
          </ProtectedRoute>
        }
      />

      <Route path="/hotel/:id" element={<HotelDetail />} />
    </Routes>
  );
};

export default AppRoutes;
