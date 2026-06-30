import { Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AdminRoutes from "./AdminRoutes";
// import StaffRoutes from "./StaffRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      {/* <Route path="/staff/*" element={<StaffRoutes />} /> */}
      <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
    </Routes>
  );
};

export default AppRoutes;