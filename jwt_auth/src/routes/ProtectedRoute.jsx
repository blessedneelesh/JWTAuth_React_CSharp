// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../provider/AuthProvider";
// import { Navbar } from "../components";

// export const ProtectedRoute = () => {
//   const { token, roles } = useAuth();

//   // Check if the user is authenticated
//   if (!token) {
//     // If not authenticated, redirect to the login page
//     return <Navigate to="/login" />;
//   }

//   // If authenticated, render the child routes
//   return (
//     <>
//       <Navbar />
//       <Outlet />;
//     </>
//   );
// };
