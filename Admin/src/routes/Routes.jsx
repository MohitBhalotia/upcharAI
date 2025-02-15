import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AuthLayout from "../Layout/AuthLayout";
import Orders from "../pages/Orders";
import Requests from "../pages/Requests";
import Medicines from "../pages/Medicines";
import Dashboard from "../pages/Dashboard";

const PrivateRoute = ({ children }) => (
  <AuthLayout authentication={true}>{children}</AuthLayout>
);

const PublicRoute = ({ children }) => (
  <AuthLayout authentication={false}>{children}</AuthLayout>
);

const routes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <Home />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute>
        <Orders />
      </PrivateRoute>
    ),
  },
  {
    path: "/medicines",
    element: (
      <PrivateRoute>
        <Medicines />
      </PrivateRoute>
    ),
  },

  {
    path: "/requests",
    element: (
      <PrivateRoute>
        <Requests />
      </PrivateRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />, // Default 404 route
  },
];

export default routes;
