
import React from "react";

export default function MobileBookingBar({
  count,
  subtotal,
  openDrawer
}) {
  return (
    <div className="mobile-booking-bar">
      <button className="mobile-selection-button" onClick={openDrawer}>
        <span className="mobile-cart-count">{count}</span>

        <span className="mobile-booking-text">
          <strong>
            {count === 0 ? "Choose Services" : "View Your Selection"}
          </strong>
          <small>
            {count === 0
              ? "Select your salon services"
              : `${count} service${count > 1 ? "s" : ""} selected`}
          </small>
        </span>

        <span className="mobile-booking-price">
          ₹{subtotal.toLocaleString("en-IN")}
        </span>

        <span className="mobile-booking-arrow">↑</span>
      </button>
    </div>
  );
}
