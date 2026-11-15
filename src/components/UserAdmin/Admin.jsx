
import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import "./Admin.css";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("goldenTouchAdminLoggedIn") === "true"
  );

  const handleLogin = (username, password) => {
    if (username.trim() === "admin" && password === "admin123") {
      sessionStorage.setItem("goldenTouchAdminLoggedIn", "true");
      setIsLoggedIn(true);
      return true;
    }

    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("goldenTouchAdminLoggedIn");
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
