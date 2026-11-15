import React from "react";

const pageNames = { dashboard: "Dashboard", appointments: "Appointments", styles: "Styles & Services", workers: "Workers", customers: "Customers", payments: "Payments", reports: "Reports", settings: "Settings" };

export default function AdminHeader({ activePage, onMenuClick }) {
  return <header className="admin-header">
    <div className="admin-header-left">
      <button className="admin-menu-toggle" onClick={onMenuClick} aria-label="Open navigation">☰</button>
      <div><span className="admin-header-breadcrumb">GOLDEN TOUCH / ADMIN</span><h2>{pageNames[activePage] || "Dashboard"}</h2></div>
    </div>
    <div className="admin-header-right">
      <div className="admin-header-date">{new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
      <div className="admin-header-user"><div className="admin-profile-avatar">GT</div><div><strong>Admin</strong><span>Owner</span></div></div>
    </div>
  </header>;
}
