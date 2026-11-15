
// import React from "react";
// import { formatPrice } from "./Booking";

// export default function PaymentStep({
//   totals,
//   selectedDate,
//   selectedTime,
//   onBack,
//   onPay,
// }) {
//   const dateLabel = new Date(
//     `${selectedDate}T00:00:00`
//   ).toLocaleDateString("en-IN", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const [hour, minute] = selectedTime.split(":").map(Number);

//   const timeLabel = `${hour % 12 || 12}:${String(minute).padStart(
//     2,
//     "0"
//   )} ${hour >= 12 ? "PM" : "AM"}`;

//   return (
//     <div className="gt-booking-panel">

//       <div className="gt-booking-panel-heading">
//         <span className="gt-booking-kicker">
//           STEP 03 / SECURE YOUR VISIT
//         </span>

//         <h2>
//           A little commitment.
//           <br />
//           <em>A lot of self-care.</em>
//         </h2>

//         <p>
//           Pay a 25% advance to confirm your appointment.
//         </p>
//       </div>

//       <div className="gt-payment-appointment">
//         <div>
//           <span>YOUR APPOINTMENT</span>
//           <strong>{dateLabel}</strong>
//           <small>{timeLabel}</small>
//         </div>

//         <span className="gt-appointment-symbol">✳</span>
//       </div>

//       <div className="gt-payment-breakdown">

//         <div className="gt-payment-row">
//           <span>Total service amount</span>
//           <strong>{formatPrice(totals.total)}</strong>
//         </div>

//         <div className="gt-payment-row gt-advance-row">
//           <span>Advance payment (25%)</span>
//           <strong>{formatPrice(totals.advance)}</strong>
//         </div>

//         <div className="gt-payment-row">
//           <span>Remaining after service (75%)</span>
//           <strong>{formatPrice(totals.remaining)}</strong>
//         </div>

//       </div>

//       <div className="gt-demo-payment-note">
//         <span>DEMO PAYMENT</span>
//         This is a demonstration checkout. No real money will be charged.
//       </div>

//       <div className="gt-booking-action gt-booking-action-split">

//         <button
//           type="button"
//           className="gt-booking-secondary"
//           onClick={onBack}
//         >
//           ← Back
//         </button>

//         <button
//           type="button"
//           className="gt-booking-primary"
//           onClick={onPay}
//         >
//           Pay {formatPrice(totals.advance)} <span>↗</span>
//         </button>

//       </div>

//       <p className="gt-payment-terms">
//         By continuing, you agree to the appointment and payment terms.
//       </p>

//     </div>
//   );
// }


import React, { useState } from "react";
import "./Booking.css";

const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function PaymentStep({
  totals,
  selectedDate,
  selectedTime,
  onBack,
  onPay,
}) {
  const [percentage, setPercentage] = useState(25);

  const total = Number(totals?.total || 0);

  // Minimum advance is 25% of the total.
  const minimumAdvance = Math.ceil(total * 0.25);

  const paymentAmount =
    percentage === 100
      ? total
      : Math.max(
          minimumAdvance,
          Math.round((total * percentage) / 100)
        );

  const remainingAmount = Math.max(0, total - paymentAmount);

  const dateLabel = selectedDate
    ? new Date(`${selectedDate}T00:00:00`).toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Date not selected";

  const [hour, minute] = (selectedTime || "10:00")
    .split(":")
    .map(Number);

  const timeLabel = `${hour % 12 || 12}:${String(minute).padStart(
    2,
    "0"
  )} ${hour >= 12 ? "PM" : "AM"}`;

  const paymentOptions = [25, 50, 75, 100];

  const handlePayment = () => {
    onPay({
      advance: paymentAmount,
      remaining: remainingAmount,
      paymentPercentage: percentage,
      total,
    });
  };

  return (
    <div className="gt-booking-panel gt-payment-panel">

      {/* HEADING */}
      <div className="gt-booking-panel-heading">
        <span className="gt-booking-kicker">
          STEP 03 / SECURE YOUR VISIT
        </span>

        <h2>
          Choose your
          <br />
          <em>payment amount.</em>
        </h2>

        <p>
          Pay at least 25% now or complete your payment in full.
        </p>
      </div>

      {/* APPOINTMENT SUMMARY */}
      <div className="gt-payment-appointment">
        <div className="gt-payment-appointment-info">
          <span className="gt-payment-small-label">
            YOUR APPOINTMENT
          </span>

          <strong>{dateLabel}</strong>
          <small>{timeLabel}</small>
        </div>

        <span className="gt-appointment-symbol">✳</span>
      </div>

      {/* TOTAL */}
      <div className="gt-payment-total-card">
        <span>Total service amount</span>
        <strong>{formatPrice(total)}</strong>
      </div>

      {/* PAYMENT SELECTION */}
      <div className="gt-payment-selection">

        <div className="gt-payment-selection-heading">
          <div>
            <span className="gt-payment-small-label">
              SELECT YOUR PAYMENT
            </span>
            <h3>How much would you like to pay?</h3>
          </div>

          <div className="gt-payment-percentage">
            {percentage}%
          </div>
        </div>

        {/* SLIDER */}
        <div className="gt-payment-slider-container">
          <input
            type="range"
            min="25"
            max="100"
            step="1"
            value={percentage}
            onChange={(e) =>
              setPercentage(Number(e.target.value))
            }
            className="gt-payment-slider"
            style={{
              "--payment-progress": `${((percentage - 25) / 75) * 100}%`,
            }}
            aria-label="Select payment percentage"
          />

          <div className="gt-payment-slider-labels">
            <span>25% Minimum</span>
            <span>100% Full payment</span>
          </div>
        </div>

        {/* QUICK OPTIONS */}
        <div className="gt-payment-options">
          {paymentOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`gt-payment-option ${
                percentage === option ? "active" : ""
              }`}
              onClick={() => setPercentage(option)}
            >
              {option}%
              {option === 100 && (
                <small>Full</small>
              )}
            </button>
          ))}
        </div>

        {/* PAYMENT AMOUNT */}
        <div className="gt-payment-amount-card">
          <div>
            <span>Pay now</span>
            <small>{percentage}% of total amount</small>
          </div>

          <strong>{formatPrice(paymentAmount)}</strong>
        </div>

        {/* REMAINING */}
        <div className="gt-payment-remaining">
          <span>Remaining amount</span>
          <strong
            className={
              remainingAmount === 0 ? "gt-payment-completed" : ""
            }
          >
            {formatPrice(remainingAmount)}
          </strong>
        </div>

        {percentage === 100 && (
          <div className="gt-payment-full-message">
            <span>✓</span>
            Your service amount is fully paid.
          </div>
        )}

      </div>

      {/* PAYMENT BREAKDOWN */}
      <div className="gt-payment-breakdown">
        <div className="gt-payment-row">
          <span>Total service amount</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <div className="gt-payment-row gt-advance-row">
          <span>Paying now ({percentage}%)</span>
          <strong>{formatPrice(paymentAmount)}</strong>
        </div>

        <div className="gt-payment-row">
          <span>Pay after service</span>
          <strong>{formatPrice(remainingAmount)}</strong>
        </div>
      </div>

      {/* DEMO NOTE */}
      <div className="gt-demo-payment-note">
        <span>DEMO PAYMENT</span>
        This is a demonstration checkout. No real money will be charged.
      </div>

      {/* ACTION BUTTONS */}
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
          onClick={handlePayment}
          disabled={total <= 0}
        >
          Pay {formatPrice(paymentAmount)}
          <span>↗</span>
        </button>

      </div>

      <p className="gt-payment-terms">
        Minimum 25% advance is required to confirm your appointment.
      </p>

    </div>
  );
}
