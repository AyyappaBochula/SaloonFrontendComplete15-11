
import React from "react";
import { formatPrice } from "./Booking";

export default function BookingConfirmation({ booking }) {
  const dateLabel = new Date(
    `${booking.date}T00:00:00`
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [hour, minute] = booking.time.split(":").map(Number);

  const timeLabel = `${hour % 12 || 12}:${String(minute).padStart(
    2,
    "0"
  )} ${hour >= 12 ? "PM" : "AM"}`;

  return (
    <div className="gt-booking-confirmation">

      <div className="gt-confirmation-icon">✓</div>

      <span className="gt-booking-kicker">
        GOLDEN TOUCH / BOOKING CONFIRMED
      </span>

      <h1>
        Your moment of <em>care is reserved.</em>
      </h1>

      <p>
        Thank you, {booking.details.name}.
        Your demo appointment has been created.
      </p>

      <div className="gt-confirmation-details">

        <div>
          <span>Booking ID</span>
          <strong>{booking.id}</strong>
        </div>

        <div>
          <span>Appointment date</span>
          <strong>{dateLabel}</strong>
        </div>

        <div>
          <span>Appointment time</span>
          <strong>{timeLabel}</strong>
        </div>

        <div>
          <span>Advance paid (demo)</span>
          <strong>{formatPrice(booking.advance)}</strong>
        </div>

        <div>
          <span>Remaining after service</span>
          <strong>{formatPrice(booking.remaining)}</strong>
        </div>

      </div>

      <p className="gt-confirmation-demo">
        Demo only: no real payment was processed and this is not
        a live salon reservation.
      </p>

      <a
        href="/"
        className="gt-booking-primary gt-confirmation-home"
      >
        Back to home <span>↗</span>
      </a>

    </div>
  );
}
