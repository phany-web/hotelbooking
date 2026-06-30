import { Routes, Route } from "react-router-dom";

import Home from "../pages/public/Home/Home";
import HotelDetail from "../pages/public/HotelDetail";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import GuestRoute from "../components/GuestRoute";
export default function PublicRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/"
        element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="/hotel/:id" element={<HotelDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
