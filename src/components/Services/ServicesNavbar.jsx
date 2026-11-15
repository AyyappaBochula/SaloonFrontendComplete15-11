
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesNavbar({ count = 0 }) {
  const navigate = useNavigate();

  return (
    <header className="gt-services-header">

      {/* Brand */}
      <a
        className="gt-services-logo"
        href="/"
      >
        <span className="gt-services-logo-mark">✳</span>

        <span className="gt-services-logo-copy">
          <strong>Golden Touch</strong>
          <small>THE ART OF SELF-CARE</small>
        </span>
      </a>

      {/* Actions */}
      <div className="gt-services-actions">

        <button
          className="gt-back-home"
          onClick={() => navigate("/")}
          type="button"
        >
          <span className="back-arrow">←</span>
          <span>Back to Home</span>
        </button>

        <button
          className="gt-services-booked"
          onClick={() => navigate("/appointments")}
          type="button"
        >
          <span className="booked-icon">▣</span>
          <span>Services Booked</span>
          {/* <span className="booked-count">({count})</span> */}
        </button>

      </div>

    </header>
  );
}
