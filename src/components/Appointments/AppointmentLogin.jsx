
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AppointmentLogin({
  mobile,
  setMobile,
  error,
  onSubmit
}) {
  const navigate = useNavigate();

  return (
    <>
      <header className="appointments-navbar">
        <a className="appointments-logo" href="/" aria-label="Golden Touch home">
          <span className="appointments-logo-mark">✳</span>
          <span className="appointments-logo-copy">
            <strong>Golden Touch</strong>
            <small>THE ART OF SELF-CARE</small>
          </span>
        </a>

        <button
          className="appointments-home-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </header>

      <main className="appointments-container">
        <section className="appointments-intro">
          <span className="appointments-eyebrow">
            YOUR GOLDEN EXPERIENCE
          </span>

          <h1>
            My <span>Appointments</span>
          </h1>

          <p>
            Manage your salon bookings and view your appointment details
            in one place.
          </p>
        </section>

        <section className="appointment-search-panel">
          <div className="search-icon">✆</div>

          <h2>Welcome Back</h2>

          <p>
            Enter the mobile number you used while booking your appointment.
          </p>

          <form onSubmit={onSubmit}>
            <label htmlFor="appointment-mobile">
              MOBILE NUMBER
            </label>

            <div className="mobile-input-wrapper">
              <span>+91</span>

              <input
                id="appointment-mobile"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                onChange={(e) =>
                  setMobile(
                    e.target.value.replace(/\D/g, "").slice(0, 10)
                  )
                }
              />
            </div>

            {error && (
              <div className="appointment-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="find-appointments-btn"
            >
              Find My Appointments <span>→</span>
            </button>
          </form>

          <div className="search-security-note">
            ♢ Your booking details are shown for the entered mobile number.
          </div>
        </section>
      </main>

      <footer className="appointments-footer">
        <span>GOLDEN TOUCH</span>
        <p>Where every detail makes a difference.</p>
        <small>
          © {new Date().getFullYear()} Golden Touch. All rights reserved.
        </small>
      </footer>
    </>
  );
}
