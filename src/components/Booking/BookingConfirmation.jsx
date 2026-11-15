
import React, { useEffect, useState } from "react";
import "./Booking.css";

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function BookingConfirmation({ booking }) {
  const [otp, setOtp] = useState(
    String(booking?.otp || booking?.bookingOtp || "")
  );

  // Ensure the OTP is saved and reused in My Appointments.
  useEffect(() => {
    if (!booking?.id) return;

    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("goldenTouchBookings") || "[]"
      );

      const existingBooking = savedBookings.find(
        (item) => item.id === booking.id
      );

      const existingOtp =
        booking.otp ||
        booking.bookingOtp ||
        existingBooking?.otp ||
        existingBooking?.bookingOtp;

      const finalOtp =
        existingOtp ||
        String(Math.floor(100000 + Math.random() * 900000));

      setOtp(String(finalOtp));

      const updatedBookings = savedBookings.map((item) =>
        item.id === booking.id
          ? {
              ...item,
              otp: String(finalOtp),
              bookingOtp: String(finalOtp),
            }
          : item
      );

      localStorage.setItem(
        "goldenTouchBookings",
        JSON.stringify(updatedBookings)
      );
    } catch (error) {
      console.error("Unable to save booking OTP:", error);
    }
  }, [booking?.id]);

  if (!booking) return null;

  const dateLabel = new Date(
    `${booking.date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [hour, minute] = (booking.time || "10:00")
    .split(":")
    .map(Number);

  const timeLabel = `${hour % 12 || 12}:${String(minute).padStart(
    2,
    "0"
  )} ${hour >= 12 ? "PM" : "AM"}`;

  // Flexible payment details
  const total = Number(booking.total || 0);
  const paid = Number(booking.advance || 0);
  const remaining = Number(
    booking.remaining ?? Math.max(0, total - paid)
  );

  const paymentPercentage = Number(
    booking.paymentPercentage ||
    (total > 0 ? Math.round((paid / total) * 100) : 0)
  );

  const isFullyPaid = remaining <= 0;

  const paymentStatus =
    booking.paymentStatus ||
    (isFullyPaid ? "Fully Paid" : "Partially Paid");

  return (
    <main className="gt-booking-confirmation">
      <div className="gt-confirmation-card">

        {/* SUCCESS */}
        <div className="gt-confirmation-success">
          <span>✓</span>
        </div>

        <span className="gt-booking-kicker">
          GOLDEN TOUCH · BOOKING CONFIRMED
        </span>

        <h1>
          Your appointment is <em>reserved.</em>
        </h1>

        <p className="gt-confirmation-description">
          Thank you, {booking.details?.name || "Customer"}.
          Your appointment details are ready.
        </p>

        {/* APPOINTMENT OTP */}
        <section className="gt-confirmation-otp">
          <div className="gt-otp-heading">
            <div>
              <span className="gt-otp-label">
                YOUR APPOINTMENT OTP
              </span>
              <h2>6-digit verification code</h2>
            </div>

            <span className="gt-otp-lock">✦</span>
          </div>

          <div className="gt-otp-digits">
            {(otp || "------").split("").map((digit, index) => (
              <span key={index} className="gt-otp-digit">
                {digit}
              </span>
            ))}
          </div>

          <p>
            Show this OTP to the salon staff when you arrive
            for your appointment.
          </p>
        </section>

        {/* BOOKING DETAILS TABLE */}
        <section className="gt-confirmation-details">

          <div className="gt-confirmation-table-header">
            <span>Booking Information</span>
            <span>Details</span>
          </div>

          <div className="gt-confirmation-detail">
            <span>Booking ID</span>
            <strong>{booking.id}</strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Appointment date</span>
            <strong>{dateLabel}</strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Appointment time</span>
            <strong>{timeLabel}</strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Total service amount</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Payment percentage</span>
            <strong className="gt-gold-text">
              {paymentPercentage}%
            </strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Amount paid (demo)</span>
            <strong className="gt-gold-text">
              {formatPrice(paid)}
            </strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Remaining after service</span>
            <strong>{formatPrice(remaining)}</strong>
          </div>

          <div className="gt-confirmation-detail">
            <span>Payment status</span>
            <strong
              className={
                isFullyPaid
                  ? "gt-gold-text"
                  : "gt-partial-payment-status"
              }
            >
              {paymentStatus}
            </strong>
          </div>

        </section>

        {/* PAYMENT NOTE */}
        <div className="gt-confirmation-note">
          <span>ⓘ</span>
          <p>
            This is a demo booking. No real payment was processed.
            The payment amount shown is for demonstration only.
          </p>
        </div>

        <a href="/" className="gt-booking-primary gt-confirmation-home">
          Back to Home <span>↗</span>
        </a>

        <p className="gt-confirmation-footer">
          WE LOOK FORWARD TO WELCOMING YOU
        </p>

      </div>
    </main>
  );
}
