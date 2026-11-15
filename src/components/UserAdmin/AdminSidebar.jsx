import React from "react";

const pages = [
  ["dashboard", "Dashboard", "⌂"],
  ["appointments", "Appointments", "▣"],
  ["styles", "Styles & Services", "✦"],
  ["workers", "Workers", "♙"],
  ["customers", "Customers", "♧"],
  ["payments", "Payments", "₹"],
  ["reports", "Reports", "▤"],
  ["settings", "Settings", "⚙"],
];

export default function AdminSidebar({ activePage, setActivePage, sidebarOpen, onClose, onLogout }) {
  return (
    <>
      {sidebarOpen && <button className="admin-sidebar-overlay" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`admin-sidebar${sidebarOpen ? " sidebar-open" : ""}`} aria-label="Admin navigation">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon" aria-hidden="true">♛</div>
          <div><h2>GOLDEN TOUCH</h2><span>SALON MANAGEMENT</span></div>
          <button className="admin-mobile-close" onClick={onClose} aria-label="Close navigation">×</button>
        </div>
        <nav className="admin-menu">
          <div className="admin-menu-section">WORKSPACE</div>
          {pages.map(([id, label, icon]) => (
            <button key={id} className={`admin-menu-item${activePage === id ? " active" : ""}`} onClick={() => { setActivePage(id); onClose(); }} aria-current={activePage === id ? "page" : undefined}>
              <span className="admin-menu-icon" aria-hidden="true">{icon}</span><span>{label}</span>
              {activePage === id && <span className="admin-menu-indicator" />}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-sidebar-profile"><div className="admin-profile-avatar">GT</div><div><strong>Admin</strong><span>Salon owner</span></div></div>
          <button className="admin-logout-btn" onClick={onLogout}><span aria-hidden="true">↪</span> Log out</button>
        </div>
      </aside>
    </>
  );
}
