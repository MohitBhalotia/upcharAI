import Home from "../pages/Home";
import Dispensary from "../pages/Dispensary";
import SOS from "../pages/SOS";
import Login from "../pages/Login";
import FirstAid from "../pages/FirstAid";
import Abha from "../pages/Abha";
import LoginQr from "../pages/LoginQr";
import Dashboard from "../pages/Dashboard";
import AiCheckup from "../pages/AiCheckup";
import DoctorAppointment from "../pages/DoctorAppointment";
import Cart from "../pages/Cart";
import Symptoms from "../pages/Symptoms";
import QueryBot from "../pages/QueryBot";
import NotFound from "../pages/NotFound";

import AuthLayout from "../Layout/AuthLayout";

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
    path: "/login/login-qr",
    element: (
      <PublicRoute>
        <LoginQr />
      </PublicRoute>
    ),
  },
  {
    path: "/sos",
    element: (
      <PublicRoute>
        <SOS />
      </PublicRoute>
    ),
  },
  {
    path: "/dispensary",
    element: <Dispensary />,
  },
  {
    path: "/first-aid",
    element: (
      <PublicRoute>
        <FirstAid />
      </PublicRoute>
    ),
  },
  {
    path: "/abha",
    element: (
      <PublicRoute>
        <Abha />
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
    path: "/query-bot",
    element: (
      <PrivateRoute>
        <QueryBot />
      </PrivateRoute>
    ),
  },
  {
    path: "/ai-checkup",
    element: (
      <PrivateRoute>
        <AiCheckup />
      </PrivateRoute>
    ),
  },
  {
    path: "/doctor-appointment",
    element: (
      <PrivateRoute>
        <DoctorAppointment />
      </PrivateRoute>
    ),
  },
  {
    path: "/ai-checkup/via-symptoms",
    element: (
      <PrivateRoute>
        <Symptoms />
      </PrivateRoute>
    ),
  },
  {
    path: "/ai-checkup/via-image",
    element: (
      <PrivateRoute>
        <Symptoms />
      </PrivateRoute>
    ),
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "*",
    element: <NotFound />, // Default 404 route
  },
];

export default routes;
