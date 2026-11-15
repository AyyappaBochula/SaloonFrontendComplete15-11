
import React from "react";
import { useNavigate } from "react-router-dom";

const getServices = (booking) =>
  booking.services || booking.selectedServices || [];

const getPrice = (value) =>
  Number(String(value ?? 0).replace(/[₹,\s]/g, "")) || 0;

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const getTotal = (booking) => {
  if (booking.total != null) return getPrice(booking.total);
  if (booking.totalAmount != null) return getPrice(booking.totalAmount);
  if (booking.subtotal != null) return getPrice(booking.subtotal);

  return getServices(booking).reduce(
    (sum, service) => sum + getPrice(service.price),
    0
  );
};

const getDate = (booking) =>
  booking.date || booking.appointmentDate || booking.bookingDate || "";

const getTime = (booking) =>
  booking.time || booking.appointmentTime || "";

const getBookingId = (booking) =>
  booking.bookingId || booking.id || "Not available";

export default function AppointmentResults({
  mobile,
  bookings,
  onBack
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

      <main className="appointments-container results-page">
        <section className="results-heading">
          <div>
            <span className="appointments-eyebrow">
              YOUR GOLDEN EXPERIENCE
            </span>

            <h1>
              My <span>Appointments</span>
            </h1>

            <p>Booking history for +91 {mobile}</p>
          </div>

          <button
            className="change-number-btn"
            onClick={onBack}
          >
            ← Change Number
          </button>
        </section>

        {bookings.length === 0 ? (
          <div className="no-appointments">
            <div>✂</div>
            <h3>No appointments found</h3>
            <p>
              We couldn't find any bookings linked to this mobile number.
            </p>

            <button onClick={() => navigate("/bookservice")}>
              Explore Our Services →
            </button>
          </div>
        ) : (
          <>
            <div className="booking-count">
              {bookings.length} appointment
              {bookings.length > 1 ? "s" : ""} found
            </div>

            <div className="appointments-list">
              {bookings.map((booking, index) => {
                const services = getServices(booking);
                const total = getTotal(booking);

                const advance =
                  booking.advance != null
                    ? getPrice(booking.advance)
                    : Math.round(total * 0.25);

                const remaining =
                  booking.remaining != null
                    ? getPrice(booking.remaining)
                    : total - advance;

                const otp =
                  booking.otp || booking.bookingOtp || "Not assigned";

                const date = getDate(booking);

                const formattedDate = date
                  ? new Date(`${date}T00:00:00`).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                      }
                    )
                  : "Not available";

                return (
                  <article
                    className="appointment-card"
                    key={`${getBookingId(booking)}-${index}`}
                  >
                    <div className="appointment-card-top">
                      <div>
                        <span className="booking-label">
                          BOOKING ID
                        </span>
                        <h3>{getBookingId(booking)}</h3>
                      </div>

                      <span className="booking-status">
                        {booking.status || "Booked"}
                      </span>
                    </div>

                    <div className="appointment-date-time">
                      <div>
                        <span>APPOINTMENT DATE</span>
                        <strong>{formattedDate}</strong>
                      </div>

                      <div>
                        <span>APPOINTMENT TIME</span>
                        <strong>{getTime(booking) || "Not available"}</strong>
                      </div>
                    </div>

                    <div className="appointment-services">
                      <h4>Services Booked</h4>

                      {services.length > 0 ? (
                        services.map((service, serviceIndex) => (
                          <div
                            className="appointment-service-row"
                            key={service.id || serviceIndex}
                          >
                            <div>
                              <strong>
                                {service.name || "Salon Service"}
                              </strong>
                              <span>
                                {service.duration
                                  ? `${service.duration} min`
                                  : ""}
                              </span>
                            </div>

                            <strong>
                              {formatPrice(getPrice(service.price))}
                            </strong>
                          </div>
                        ))
                      ) : (
                        <p>No service details available.</p>
                      )}
                    </div>

                    <div className="appointment-otp">
                      <div>
                        <span>YOUR SERVICE OTP</span>
                        <p>Share this code with salon staff</p>
                      </div>

                      <strong>{otp}</strong>
                    </div>

                    <div className="appointment-payment">
                      <div>
                        <span>Total Amount</span>
                        <strong>{formatPrice(total)}</strong>
                      </div>

                      <div>
                        <span>Advance Payment</span>
                        <strong>{formatPrice(advance)}</strong>
                      </div>

                      <div>
                        <span>Remaining Balance</span>
                        <strong>{formatPrice(remaining)}</strong>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
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
