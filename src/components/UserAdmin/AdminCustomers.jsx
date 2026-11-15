import React, { useMemo, useState } from "react";

export default function AdminCustomers({ bookings = [] }) {
  const [query, setQuery] = useState("");
  const customers = useMemo(() => {
    const unique = new Map();
    bookings.forEach((booking) => {
      const details = booking.details || booking.customer || booking.customerDetails || {};
      const name = details.name || booking.name || "Customer";
      const mobile = details.mobile || details.phone || booking.mobile || booking.phone || "—";
      const key = String(mobile);
      const current = unique.get(key) || { name, mobile, visits: 0, lastBooking: "" };
      current.visits += 1;
      current.lastBooking = booking.date || booking.appointmentDate || current.lastBooking;
      unique.set(key, current);
    });
    return [...unique.values()];
  }, [bookings]);
  const filtered = customers.filter((customer) => `${customer.name} ${customer.mobile}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="admin-section">
    <div className="admin-section-heading"><div><span className="admin-eyebrow">CUSTOMER RELATIONSHIPS</span><h2>Customers</h2><p>Customer details are collected from your existing bookings.</p></div><span className="admin-count-badge">{customers.length} Customers</span></div>
    <div className="admin-appointment-filters"><label><span className="sr-only">Search customers</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search customer name or phone" /></label></div>
    {filtered.length === 0 ? <div className="admin-empty"><h3>{customers.length ? "No matching customers" : "No customers yet"}</h3><p>Customer records appear after a booking is made.</p></div> : <div className="admin-table-wrapper"><table className="admin-table"><thead><tr><th>CUSTOMER</th><th>MOBILE</th><th>APPOINTMENTS</th><th>LAST BOOKING</th></tr></thead><tbody>{filtered.map((customer) => <tr key={customer.mobile}><td>{customer.name}</td><td>{customer.mobile}</td><td>{customer.visits}</td><td>{customer.lastBooking || "—"}</td></tr>)}</tbody></table></div>}
  </section>;
}
