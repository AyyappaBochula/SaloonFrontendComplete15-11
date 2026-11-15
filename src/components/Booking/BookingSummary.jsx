
import React from "react";
import {
  getBookingTotals,
  formatPrice,
  getPrice,
} from "./Booking";

const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (hours && remaining) return `${hours} hr ${remaining} min`;
  if (hours) return `${hours} hr`;

  return `${remaining} min`;
};

export default function BookingSummary({ services }) {
  const totals = getBookingTotals(services);

  return (
    <aside className="gt-booking-summary">

      <div className="gt-summary-heading">
        <span className="gt-booking-kicker">YOUR SELECTION</span>
        <h3>The experience.</h3>
      </div>

      <div className="gt-summary-services">
        {services.map((service, index) => (
          <div
            className="gt-summary-service"
            key={`${service.name}-${index}`}
          >
            <div>
              <strong>{service.name}</strong>
              <span>{service.time || service.duration}</span>
            </div>

            <strong>{formatPrice(getPrice(service.price))}</strong>
          </div>
        ))}
      </div>

      <div className="gt-summary-duration">
        <span>Total duration</span>
        <strong>{formatDuration(totals.duration)}</strong>
      </div>

      <div className="gt-summary-total">
        <span>Total amount</span>
        <strong>{formatPrice(totals.total)}</strong>
      </div>

      <div className="gt-summary-advance">
        <span>Pay now · 25%</span>
        <strong>{formatPrice(totals.advance)}</strong>
      </div>

      <p className="gt-summary-note">
        The remaining {formatPrice(totals.remaining)} is payable
        after your service is completed.
      </p>

    </aside>
  );
}
