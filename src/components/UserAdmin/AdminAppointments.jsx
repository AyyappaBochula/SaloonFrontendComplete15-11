import React, { useMemo, useState } from "react";

const STATUSES = ["Booked", "Confirmed", "In Progress", "Completed", "Cancelled"];
const normalized = (status) => !status || status === "Demo confirmed" ? "Booked" : status;
const servicesOf = (booking) => booking.services || booking.selectedServices || [];
const totalOf = (booking) => Number(booking.total ?? booking.totalAmount ?? booking.subtotal ?? servicesOf(booking).reduce((sum, service) => sum + Number(service.price || 0), 0));
const money = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;
const nameOf = (b) => b.details?.name || b.customer?.name || b.customerDetails?.name || b.name || "Customer";
const mobileOf = (b) => b.details?.mobile || b.customer?.mobile || b.customer?.phone || b.customerDetails?.mobile || b.mobile || b.phone || "—";
const dateOf = (b) => b.date || b.appointmentDate || b.bookingDate || "";

export default function AdminAppointments({ bookings = [], setBookings }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState(null);
  const rows = useMemo(() => bookings.map((booking, index) => ({ ...booking, _index: index, _key: booking.bookingId || booking.id || `GT-${index + 1}`, status: normalized(booking.status) })), [bookings]);
  const filtered = rows.filter((b) => {
    const term = query.trim().toLowerCase();
    const matches = !term || [nameOf(b), mobileOf(b), b._key].some((value) => String(value).toLowerCase().includes(term));
    return matches && (status === "All statuses" || b.status === status) && (!date || dateOf(b) === date);
  });
  const updateStatus = (booking, next) => {
    setBookings((current) => current.map((item, index) => index === booking._index ? { ...item, status: next } : item));
    setSelected((current) => current ? { ...current, status: next } : null);
  };
  const pending = rows.filter((b) => !["Completed", "Cancelled"].includes(b.status)).length;
  const completed = rows.filter((b) => b.status === "Completed").length;

  return <section className="admin-section">
    <div className="admin-section-heading"><div><span className="admin-eyebrow">BOOKING MANAGEMENT</span><h2>Appointments</h2><p>Review customer bookings and keep each appointment up to date.</p></div></div>
    <div className="admin-appointment-stats"><div><span>Total bookings</span><strong>{rows.length}</strong></div><div><span>Pending</span><strong>{pending}</strong></div><div><span>Completed</span><strong>{completed}</strong></div></div>
    <div className="admin-appointment-filters"><label><span className="sr-only">Search appointments</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, phone or booking ID" /></label><label><span className="sr-only">Filter by status</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label><label><span className="sr-only">Filter by date</span><input type="date" aria-label="Filter by appointment date" value={date} onChange={(e) => setDate(e.target.value)} /></label></div>
    {!filtered.length ? <div className="admin-empty"><span aria-hidden="true">◇</span><h3>{rows.length ? "No matching appointments" : "No appointments yet"}</h3><p>{rows.length ? "Try changing your search or filters." : "New customer bookings will appear here."}</p></div> : <>
      <div className="admin-appointment-cards">{filtered.map((b) => { const total = totalOf(b); const advance = Number(b.advance ?? Math.round(total * .25)); return <article className="admin-appointment-card" key={b._key}>
        <div className="admin-appointment-card-head"><div><span className="admin-booking-id">{b._key}</span><h3>{nameOf(b)}</h3><span>{mobileOf(b)}</span></div><span className="admin-status-pill">{b.status}</span></div>
        <div className="admin-appointment-card-detail"><span>Services</span><strong>{servicesOf(b).map((s) => s.name).filter(Boolean).join(", ") || "Salon appointment"}</strong></div>
        <div className="admin-appointment-card-detail"><span>Date and time</span><strong>{dateOf(b) || "Date not set"} · {b.time || b.appointmentTime || "Time not set"}</strong></div>
        <div className="admin-appointment-payment"><span>Total <b>{money(total)}</b></span><span>Advance <b>{money(advance)}</b></span><span>Balance <b>{money(b.remaining ?? total - advance)}</b></span></div>
        <div className="admin-appointment-actions"><button className="admin-detail-btn" onClick={() => setSelected(b)}>View details</button><label className="sr-only" htmlFor={`appointment-status-${b._index}`}>Update status for {nameOf(b)}</label><select id={`appointment-status-${b._index}`} className="admin-status-select" value={b.status} onChange={(e) => updateStatus(b, e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
      </article>; })}</div>
      <div className="admin-table-wrapper admin-appointment-table"><table className="admin-table"><thead><tr><th>BOOKING / CUSTOMER</th><th>SERVICES</th><th>DATE &amp; TIME</th><th>TOTAL / BALANCE</th><th>STATUS</th><th>DETAILS</th></tr></thead><tbody>{filtered.map((b) => { const total = totalOf(b); const advance = Number(b.advance ?? Math.round(total * .25)); return <tr key={b._key}><td><div className="admin-customer-cell"><strong>{nameOf(b)}</strong><span>{b._key} · {mobileOf(b)}</span></div></td><td>{servicesOf(b).map((s) => s.name).filter(Boolean).join(", ") || "Salon appointment"}</td><td>{dateOf(b) || "—"}<br />{b.time || b.appointmentTime || "—"}</td><td>{money(total)}<br /><span>{money(b.remaining ?? total - advance)} due</span></td><td><select aria-label={`Update status for ${nameOf(b)}`} className="admin-status-select" value={b.status} onChange={(e) => updateStatus(b, e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td><td><button className="admin-detail-btn" onClick={() => setSelected(b)}>View</button></td></tr>; })}</tbody></table></div>
    </>}
    {selected && <div className="admin-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelected(null); }}><section className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="appointment-details-title"><div className="admin-modal-heading"><h3 id="appointment-details-title">Appointment details</h3><button onClick={() => setSelected(null)} aria-label="Close details">×</button></div><div className="admin-detail-list"><p><b>Booking:</b> {selected.bookingId || selected.id || "—"}</p><p><b>Customer:</b> {nameOf(selected)} · {mobileOf(selected)}</p><p><b>Date &amp; time:</b> {dateOf(selected) || "Not set"} · {selected.time || selected.appointmentTime || "Not set"}</p><p><b>Services:</b> {servicesOf(selected).map((s) => `${s.name || "Service"} (${money(s.price)})`).join(", ") || "Not available"}</p><p><b>Total / advance / balance:</b> {money(totalOf(selected))} / {money(selected.advance ?? Math.round(totalOf(selected) * .25))} / {money(selected.remaining ?? totalOf(selected) - Math.round(totalOf(selected) * .25))}</p></div><label className="admin-modal-status">Appointment status<select className="admin-status-select" value={normalized(selected.status)} onChange={(e) => updateStatus(selected, e.target.value)}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></label></section></div>}
  </section>;
}
