import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { AccessDenied, Login, Register, User, Profile } from "../containers";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navbar } from "../components";
import { useAuth } from "../provider/AuthProvider";

const Routes = () => {
  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <NavbarWrapper />,
      children: [
        {
          path: "/",
          element: <Profile />,
        },
        {
          path: "/users",
          element: <User />,
        },
      ],
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/access-denied",
          element: <AccessDenied />,
        },
        {
          path: "/logout",
          element: <div>logout</div>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    // ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  function NavbarWrapper() {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
};
export default Routes;
