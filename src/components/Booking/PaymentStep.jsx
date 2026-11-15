
import React from "react";
import { formatPrice } from "./Booking";

export default function PaymentStep({
  totals,
  selectedDate,
  selectedTime,
  onBack,
  onPay,
}) {
  const dateLabel = new Date(
    `${selectedDate}T00:00:00`
  ).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [hour, minute] = selectedTime.split(":").map(Number);

  const timeLabel = `${hour % 12 || 12}:${String(minute).padStart(
    2,
    "0"
  )} ${hour >= 12 ? "PM" : "AM"}`;

  return (
    <div className="gt-booking-panel">

      <div className="gt-booking-panel-heading">
        <span className="gt-booking-kicker">
          STEP 03 / SECURE YOUR VISIT
        </span>

        <h2>
          A little commitment.
          <br />
          <em>A lot of self-care.</em>
        </h2>

        <p>
          Pay a 25% advance to confirm your appointment.
        </p>
      </div>

      <div className="gt-payment-appointment">
        <div>
          <span>YOUR APPOINTMENT</span>
          <strong>{dateLabel}</strong>
          <small>{timeLabel}</small>
        </div>

        <span className="gt-appointment-symbol">✳</span>
      </div>

      <div className="gt-payment-breakdown">

        <div className="gt-payment-row">
          <span>Total service amount</span>
          <strong>{formatPrice(totals.total)}</strong>
        </div>

        <div className="gt-payment-row gt-advance-row">
          <span>Advance payment (25%)</span>
          <strong>{formatPrice(totals.advance)}</strong>
        </div>

        <div className="gt-payment-row">
          <span>Remaining after service (75%)</span>
          <strong>{formatPrice(totals.remaining)}</strong>
        </div>

      </div>

      <div className="gt-demo-payment-note">
        <span>DEMO PAYMENT</span>
        This is a demonstration checkout. No real money will be charged.
      </div>

      <div className="gt-booking-action gt-booking-action-split">

        <button
          type="button"
          className="gt-booking-secondary"
          onClick={onBack}
        >
          ← Back
        </button>

        <button
          type="button"
          className="gt-booking-primary"
          onClick={onPay}
        >
          Pay {formatPrice(totals.advance)} <span>↗</span>
        </button>

      </div>

      <p className="gt-payment-terms">
        By continuing, you agree to the appointment and payment terms.
      </p>

    </div>
  );
}
