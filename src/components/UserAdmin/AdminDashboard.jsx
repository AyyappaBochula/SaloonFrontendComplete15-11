
import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminAppointments from "./AdminAppointments";
import AdminStyles from "./AdminStyles";
import AdminWorkers from "./AdminWorkers";
import AdminCustomers from "./AdminCustomers";

const normalizeBookingStatus = (status) => {
  if (!status || status === "Demo confirmed") return "Booked";
  return status;
};

const readBookings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("goldenTouchBookings") || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.map((booking) => ({
      ...booking,
      status: normalizeBookingStatus(booking.status),
    }));
  } catch {
    return [];
  }
};

const getServices = (booking) =>
  booking.services || booking.selectedServices || [];

const getTotal = (booking) =>
  Number(
    booking.total ??
    booking.totalAmount ??
    booking.subtotal ??
    getServices(booking).reduce((sum, service) => sum + Number(service.price || 0), 0)
  );

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function AdminDashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookings, setBookings] = useState(readBookings);

  useEffect(() => {
    const sanitizedBookings = bookings.map((booking) => ({
      ...booking,
      status: normalizeBookingStatus(booking.status),
    }));
    localStorage.setItem("goldenTouchBookings", JSON.stringify(sanitizedBookings));
    if (sanitizedBookings.length !== bookings.length || sanitizedBookings.some((booking, index) => booking.status !== bookings[index].status)) {
      setBookings(sanitizedBookings);
    }
  }, [bookings]);

  const workers = (() => {
    try {
      return JSON.parse(localStorage.getItem("goldenTouchWorkers") || "[]");
    } catch {
      return [];
    }
  })();

  const customers = new Set(
    bookings.map((booking) =>
      booking.details?.mobile ||
      booking.customer?.mobile ||
      booking.mobile ||
      booking.phone ||
      ""
    ).filter(Boolean)
  );

  const revenue = bookings
    .filter((booking) => normalizeBookingStatus(booking.status) !== "Cancelled")
    .reduce((sum, booking) => sum + getTotal(booking), 0);

  const pending = bookings.filter(
    (booking) => !["Completed", "Cancelled"].includes(normalizeBookingStatus(booking.status))
  ).length;

  const renderPage = () => {
    switch (activePage) {
      case "appointments":
        return (
          <AdminAppointments
            bookings={bookings}
            setBookings={setBookings}
          />
        );

      case "styles":
        return <AdminStyles />;

      case "workers":
        return <AdminWorkers />;

      case "customers":
        return <AdminCustomers bookings={bookings} />;

      case "payments":
        return <PaymentsPage bookings={bookings} />;

      case "reports":
        return <ReportsPage bookings={bookings} />;

      case "settings":
        return <SettingsPage />;

      default:
        return (
          <div className="admin-section">
            <div className="admin-welcome">
              <div>
                <span className="admin-eyebrow">SALON OVERVIEW</span>
                <h1>Welcome back, Admin</h1>
                <p>Here's what's happening at Golden Touch today.</p>
              </div>
              <div className="admin-welcome-icon">♛</div>
            </div>

            <div className="admin-stats-grid">
              <StatCard icon="▣" label="Total Bookings" value={bookings.length} />
              <StatCard icon="₹" label="Total Revenue" value={formatPrice(revenue)} />
              <StatCard icon="♧" label="Customers" value={customers.size} />
              <StatCard icon="♙" label="Workers" value={workers.length} />
            </div>

            <div className="admin-overview-grid">
              <div className="admin-overview-card">
                <div className="admin-card-heading">
                  <div>
                    <span className="admin-eyebrow">BOOKING ACTIVITY</span>
                    <h3>Recent Appointments</h3>
                  </div>
                  <button onClick={() => setActivePage("appointments")}>
                    View All →
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="admin-empty-small">
                    No bookings available yet.
                  </div>
                ) : (
                  <div className="admin-recent-list">
                    {bookings.slice(0, 5).map((booking, index) => {
                      const name =
                        booking.details?.name ||
                        booking.customer?.name ||
                        booking.name ||
                        "Customer";

                      return (
                        <div className="admin-recent-item" key={booking.bookingId || booking.id || index}>
                          <div className="admin-recent-avatar">
                            {name.charAt(0).toUpperCase()}
                          </div>
                          <div className="admin-recent-info">
                            <strong>{name}</strong>
                            <span>
                              {getServices(booking).map((s) => s.name).join(", ") || "Salon appointment"}
                            </span>
                          </div>
                          <div className="admin-recent-amount">
                            <strong>{formatPrice(getTotal(booking))}</strong>
                            <span>{normalizeBookingStatus(booking.status)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="admin-overview-card admin-quick-card">
                <span className="admin-eyebrow">QUICK OVERVIEW</span>
                <h3>Business Summary</h3>

                <div className="admin-summary-row">
                  <span>Pending Appointments</span>
                  <strong>{pending}</strong>
                </div>

                <div className="admin-summary-row">
                  <span>Completed Appointments</span>
                  <strong>
                    {bookings.filter((b) => normalizeBookingStatus(b.status) === "Completed").length}
                  </strong>
                </div>

                <div className="admin-summary-row">
                  <span>Cancelled Appointments</span>
                  <strong>
                    {bookings.filter((b) => normalizeBookingStatus(b.status) === "Cancelled").length}
                  </strong>
                </div>

                <div className="admin-summary-row">
                  <span>Average Booking Value</span>
                  <strong>
                    {formatPrice(bookings.length ? revenue / bookings.length : 0)}
                  </strong>
                </div>

                <button
                  className="admin-gold-btn admin-full-btn"
                  onClick={() => setActivePage("appointments")}
                >
                  Manage Appointments →
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="admin-main">
        <AdminHeader
          activePage={activePage}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="admin-content">
          {renderPage()}
        </main>

        <footer className="admin-footer">
          <span>GOLDEN TOUCH</span>
          <p>Premium Salon Management · © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-top">
        <span>{label}</span>
        <div>{icon}</div>
      </div>
      <h2>{value}</h2>
      <span className="admin-stat-caption">Salon overview</span>
    </div>
  );
}

function PaymentsPage({ bookings }) {
  const rows = bookings.map((booking, index) => {
    const total = getTotal(booking);
    const advance = Number(booking.advance ?? Math.round(total * 0.25));
    const remaining = Number(booking.remaining ?? total - advance);

    return {
      id: booking.bookingId || booking.id || `GT-${index + 1}`,
      name: booking.details?.name || booking.customer?.name || booking.name || "Customer",
      total,
      advance,
      remaining,
      status: normalizeBookingStatus(booking.status)
    };
  });

  return (
    <div className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">FINANCIAL MANAGEMENT</span>
          <h2>Payments</h2>
          <p>Track booking totals, advances and outstanding balances.</p>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>BOOKING</th>
              <th>CUSTOMER</th>
              <th>TOTAL</th>
              <th>ADVANCE</th>
              <th>REMAINING</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{formatPrice(row.total)}</td>
                <td>{formatPrice(row.advance)}</td>
                <td>{formatPrice(row.remaining)}</td>
                <td>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="admin-empty-small">No payment records yet.</div>}
      </div>
    </div>
  );
}

function ReportsPage({ bookings }) {
  const completed = bookings.filter((b) => normalizeBookingStatus(b.status) === "Completed");
  const cancelled = bookings.filter((b) => normalizeBookingStatus(b.status) === "Cancelled");
  const revenue = completed.reduce((sum, booking) => sum + getTotal(booking), 0);

  return (
    <div className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">BUSINESS PERFORMANCE</span>
          <h2>Reports</h2>
          <p>A summary of your salon's recorded bookings.</p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <StatCard icon="▣" label="All Bookings" value={bookings.length} />
        <StatCard icon="✓" label="Completed" value={completed.length} />
        <StatCard icon="×" label="Cancelled" value={cancelled.length} />
        <StatCard icon="₹" label="Completed Revenue" value={formatPrice(revenue)} />
      </div>

      <div className="admin-overview-card">
        <h3>Booking status breakdown</h3>
        {["Booked", "Confirmed", "In Progress", "Completed", "Cancelled"].map((status) => {
          const count = bookings.filter((b) => normalizeBookingStatus(b.status) === status).length;
          const percentage = bookings.length ? (count / bookings.length) * 100 : 0;

          return (
            <div className="admin-report-row" key={status}>
              <div>
                <span>{status}</span>
                <strong>{count}</strong>
              </div>
              <div className="admin-report-track">
                <div style={{ width: `${percentage}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPage() {
  const [name, setName] = useState(
    localStorage.getItem("goldenTouchSalonName") || "Golden Touch"
  );
  const [phone, setPhone] = useState(
    localStorage.getItem("goldenTouchSalonPhone") || ""
  );
  const [address, setAddress] = useState(
    localStorage.getItem("goldenTouchSalonAddress") || ""
  );
  const [saved, setSaved] = useState(false);

  const saveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem("goldenTouchSalonName", name);
    localStorage.setItem("goldenTouchSalonPhone", phone);
    localStorage.setItem("goldenTouchSalonAddress", address);
    setSaved(true);
  };

  return (
    <div className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">BUSINESS PREFERENCES</span>
          <h2>Salon Settings</h2>
          <p>Update your salon's basic business information.</p>
        </div>
      </div>

      <form className="admin-settings-form" onSubmit={saveSettings}>
        <label>Salon Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Contact Number</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter salon contact number" />

        <label>Salon Address</label>
        <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter salon address" rows={3} />

        <button className="admin-gold-btn" type="submit">Save Settings</button>
        {saved && <span className="admin-saved-message">Settings saved in this browser.</span>}
      </form>
    </div>
  );
}
