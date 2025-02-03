import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dispensary from "./pages/Dispensary";
import SOS from "./pages/SOS";
import Login from "./pages/Login";
import FirstAid from "./pages/FirstAid";
import Abha from "./pages/Abha";

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
      </Routes>
    </div>
  );
};

export default App;
