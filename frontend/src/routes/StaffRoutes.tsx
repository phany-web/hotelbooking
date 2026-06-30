// import { Route } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";

// import StaffDashboard from "../pages/staff/Dashboard";
// // import MyTasks from "../pages/staff/MyTasks";
// // import RoomWork from "../pages/staff/RoomWork";
// // import Profile from "../pages/staff/Profile";

// export default function StaffRoutes() {
//   return (
//     <>
//       <Route
//         path="/staff"
//         element={
//           <ProtectedRoute allowedRoles={["STAFF"]}>
//             <StaffDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/staff/tasks"
//         element={
//           <ProtectedRoute allowedRoles={["STAFF"]}>
//             <MyTasks />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/staff/rooms"
//         element={
//           <ProtectedRoute allowedRoles={["STAFF"]}>
//             <RoomWork />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/staff/profile"
//         element={
//           <ProtectedRoute allowedRoles={["STAFF"]}>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />
//     </>
//   );
// }