
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import Services from "./components/Services/Services";
import Booking from "./components/Booking/Booking";
import Appointments from "./components/Appointments/Appointments";
import Admin from "./components/UserAdmin/Admin";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookservice" element={<Services />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}
