import React from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { state: authState } = useAuthContext();
  const { user } = authState;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to="/login" />,
        },
        {
          path: "/login",
          element: !user ? <Login /> : <Navigate to="/" />,
        },
        {
          path: "/signup",
          element: !user ? <Signup /> : <Navigate to="/" />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
