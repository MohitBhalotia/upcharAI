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
import LoginAbhaNumber from "../pages/LoginAbhaNumber";
import Profile from "../pages/Profile";
import MyProfile from "../pages/Myprofile";
import MyOrders from "../pages/MyOrders";
import MyAppointments from "../pages/MyAppointments";
import MyReqMed from "../pages/MyReqMed";
import ImageAI from "../pages/ImageAI";
import CheckoutPage from "../pages/Checkout";

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
    path: "/login/login-number",
    element: (
      <PublicRoute>
        <LoginAbhaNumber />
      </PublicRoute>
    ),
  },
  {
    path: "/sos",
    element: <SOS />,
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
        <ImageAI />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/my-profile",
    element: (
      <PrivateRoute>
        <MyProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/my-orders",
    element: (
      <PrivateRoute>
        <MyOrders />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/my-appointments",
    element: (
      <PrivateRoute>
        <MyAppointments />
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/my-requests",
    element: (
      <PrivateRoute>
        <MyReqMed />
      </PrivateRoute>
    ),
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
  },
  {
    path: "*",
    element: <NotFound />, // Default 404 route
  },
];

export default routes;
