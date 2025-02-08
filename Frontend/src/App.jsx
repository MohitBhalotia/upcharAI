import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dispensary from "./pages/Dispensary";
import SOS from "./pages/SOS";
import Login from "./pages/Login";
import FirstAid from "./pages/FirstAid";
import Abha from "./pages/Abha";
import ChatComponent from "./components/ChatComponent";
import LoginQr from "./pages/LoginQr";
import Dashboard from "./pages/Dashboard";
import AiCheckup from "./pages/AiCheckup";
import DoctorAppointment from "./pages/DoctorAppointment";
import Cart from "./pages/Cart";
import Symptoms from "./pages/Symptoms";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/dispensary"} element={<Dispensary />} />
        <Route path={"/sos"} element={<SOS />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/first-aid"} element={<FirstAid />} />
        <Route path={"/abha"} element={<Abha />} />
        <Route path={"/query-bot"} element={<ChatComponent />} />
        <Route path={"/login-qr"} element={<LoginQr />} />
        <Route path={"/dashboard"} element={<Dashboard />} />
        <Route path={"/ai-checkup"} element={<AiCheckup />} />
        <Route path={"/doctor-appointment"} element={<DoctorAppointment />} />
        <Route path={"/cart"} element={<Cart />} />
        <Route path={"/through-symptoms"} element={<Symptoms />} />
      </Routes>
    </div>
  );
};

export default App;
