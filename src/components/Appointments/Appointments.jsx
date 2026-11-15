
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Appointments.css";

// const BOOKINGS_KEY = "goldenTouchBookings";

// const getMobile = (booking) =>
//   String(
//     booking.mobile ||
//     booking.phone ||
//     booking.customer?.mobile ||
//     booking.customer?.phone ||
//     booking.details?.mobile ||
//     booking.customerDetails?.mobile ||
//     ""
//   ).replace(/\D/g, "").slice(-10);

// const getServices = (booking) =>
//   booking.services || booking.selectedServices || [];

// const getPrice = (value) =>
//   Number(String(value ?? 0).replace(/[₹,\s]/g, "")) || 0;

// const formatPrice = (value) =>
//   `₹${Number(value || 0).toLocaleString("en-IN")}`;

// const getTotal = (booking) => {
//   if (booking.total != null) return getPrice(booking.total);
//   if (booking.totalAmount != null) return getPrice(booking.totalAmount);
//   if (booking.subtotal != null) return getPrice(booking.subtotal);

//   return getServices(booking).reduce(
//     (sum, service) => sum + getPrice(service.price),
//     0
//   );
// };

// const getDate = (booking) =>
//   booking.date || booking.appointmentDate || booking.bookingDate || "";

// const getTime = (booking) =>
//   booking.time || booking.appointmentTime || "";

// const getBookingId = (booking) =>
//   booking.bookingId || booking.id || "Not available";

// const generateOTP = () =>
//   String(Math.floor(100000 + Math.random() * 900000));

// export default function Appointments() {
//   const navigate = useNavigate();

//   const [mobile, setMobile] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [searched, setSearched] = useState(false);
//   const [error, setError] = useState("");

//   const findAppointments = (e) => {
//     e.preventDefault();

//     if (!/^[6-9]\d{9}$/.test(mobile)) {
//       setError("Please enter a valid 10-digit mobile number.");
//       setBookings([]);
//       setSearched(false);
//       return;
//     }

//     setError("");

//     try {
//       const savedBookings = JSON.parse(
//         localStorage.getItem(BOOKINGS_KEY) || "[]"
//       );

//       const allBookings = Array.isArray(savedBookings)
//         ? savedBookings
//         : [];

//       const matchingBookings = allBookings
//         .filter((booking) => getMobile(booking) === mobile)
//         .map((booking) => {
//           // Assign an OTP once if this booking does not already have one.
//           if (!booking.otp && !booking.bookingOtp) {
//             return { ...booking, otp: generateOTP() };
//           }

//           return booking;
//         });

//       // Save assigned OTPs so they remain the same on future searches.
//       const updatedBookings = allBookings.map((booking) => {
//         const updated = matchingBookings.find(
//           (item) => getBookingId(item) === getBookingId(booking)
//         );

//         return updated || booking;
//       });

//       localStorage.setItem(
//         BOOKINGS_KEY,
//         JSON.stringify(updatedBookings)
//       );

//       setBookings(matchingBookings);
//       setSearched(true);
//     } catch (err) {
//       console.error("Unable to load appointments:", err);
//       setError("Unable to load appointments. Please try again.");
//     }
//   };

//   const resetSearch = () => {
//     setMobile("");
//     setBookings([]);
//     setSearched(false);
//     setError("");
//   };

//   return (
//     <div className="appointments-page">
//       <header className="appointments-navbar">
//         <div
//           className="appointments-logo"
//           onClick={() => navigate("/")}
//         >
//           <span>GOLDEN</span>
//           <strong>TOUCH</strong>
//           <small>PREMIUM SALON EXPERIENCE</small>
//         </div>

//         <button
//           className="appointments-home-btn"
//           onClick={() => navigate("/")}
//         >
//           ← Back to Home
//         </button>
//       </header>

//       <main className="appointments-container">
//         <section className="appointments-intro">
//           <span className="appointments-eyebrow">
//             YOUR GOLDEN EXPERIENCE
//           </span>

//           <h1>
//             My <span>Appointments</span>
//           </h1>

//           <p>
//             View your salon bookings, appointment details and service OTP
//             in one place.
//           </p>
//         </section>

//         <section className="appointment-search-panel">
//           <div className="search-icon">✆</div>

//           <h2>Find Your Appointments</h2>

//           <p>
//             Enter the mobile number used when booking your appointment.
//           </p>

//           <form onSubmit={findAppointments}>
//             <label htmlFor="appointment-mobile">
//               MOBILE NUMBER
//             </label>

//             <div className="mobile-input-wrapper">
//               <span>+91</span>

//               <input
//                 id="appointment-mobile"
//                 type="tel"
//                 inputMode="numeric"
//                 maxLength={10}
//                 placeholder="Enter 10-digit mobile number"
//                 value={mobile}
//                 onChange={(e) =>
//                   setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
//                 }
//               />
//             </div>

//             {error && (
//               <div className="appointment-error">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="find-appointments-btn"
//             >
//               Find My Appointments <span>→</span>
//             </button>
//           </form>

//           <div className="search-security-note">
//             ♢ Your booking details are shown for the entered mobile number.
//           </div>
//         </section>

//         {searched && (
//           <section className="appointment-results">
//             <div className="results-heading">
//               <div>
//                 <span className="appointments-eyebrow">
//                   BOOKING HISTORY
//                 </span>

//                 <h2>Your Appointments</h2>

//                 <p>Mobile number: +91 {mobile}</p>
//               </div>

//               <button
//                 className="change-number-btn"
//                 onClick={resetSearch}
//               >
//                 Change Number
//               </button>
//             </div>

//             {bookings.length === 0 ? (
//               <div className="no-appointments">
//                 <div>✂</div>
//                 <h3>No appointments found</h3>
//                 <p>
//                   We couldn't find any bookings linked to this mobile
//                   number.
//                 </p>

//                 <button onClick={() => navigate("/bookservice")}>
//                   Explore Our Services →
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <div className="booking-count">
//                   {bookings.length} appointment
//                   {bookings.length > 1 ? "s" : ""} found
//                 </div>

//                 <div className="appointments-list">
//                   {bookings.map((booking, index) => {
//                     const services = getServices(booking);
//                     const total = getTotal(booking);
//                     const advance =
//                       booking.advance != null
//                         ? getPrice(booking.advance)
//                         : Math.round(total * 0.25);

//                     const remaining =
//                       booking.remaining != null
//                         ? getPrice(booking.remaining)
//                         : total - advance;

//                     const otp =
//                       booking.otp || booking.bookingOtp || "Not assigned";

//                     return (
//                       <article
//                         className="appointment-card"
//                         key={getBookingId(booking) + index}
//                       >
//                         <div className="appointment-card-top">
//                           <div>
//                             <span className="booking-label">
//                               BOOKING ID
//                             </span>

//                             <h3>{getBookingId(booking)}</h3>
//                           </div>

//                           <span className="booking-status">
//                             {booking.status || "Booked"}
//                           </span>
//                         </div>

//                         <div className="appointment-date-time">
//                           <div>
//                             <span>APPOINTMENT DATE</span>
//                             <strong>
//                               {getDate(booking)
//                                 ? new Date(
//                                     `${getDate(booking)}T00:00:00`
//                                   ).toLocaleDateString("en-IN", {
//                                     day: "2-digit",
//                                     month: "long",
//                                     year: "numeric"
//                                   })
//                                 : "Not available"}
//                             </strong>
//                           </div>

//                           <div>
//                             <span>APPOINTMENT TIME</span>
//                             <strong>{getTime(booking) || "Not available"}</strong>
//                           </div>
//                         </div>

//                         <div className="appointment-services">
//                           <h4>Services Booked</h4>

//                           {services.length > 0 ? (
//                             services.map((service, serviceIndex) => (
//                               <div
//                                 className="appointment-service-row"
//                                 key={service.id || serviceIndex}
//                               >
//                                 <div>
//                                   <strong>{service.name}</strong>
//                                   <span>
//                                     {service.duration
//                                       ? `${service.duration} min`
//                                       : ""}
//                                   </span>
//                                 </div>

//                                 <strong>
//                                   {formatPrice(getPrice(service.price))}
//                                 </strong>
//                               </div>
//                             ))
//                           ) : (
//                             <p>No service details available.</p>
//                           )}
//                         </div>

//                         <div className="appointment-otp">
//                           <div>
//                             <span>YOUR SERVICE OTP</span>
//                             <p>Share this code with salon staff</p>
//                           </div>

//                           <strong>{otp}</strong>
//                         </div>

//                         <div className="appointment-payment">
//                           <div>
//                             <span>Total Amount</span>
//                             <strong>{formatPrice(total)}</strong>
//                           </div>

//                           <div>
//                             <span>Advance Payment</span>
//                             <strong>{formatPrice(advance)}</strong>
//                           </div>

//                           <div>
//                             <span>Remaining Balance</span>
//                             <strong>{formatPrice(remaining)}</strong>
//                           </div>
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </section>
//         )}
//       </main>

//       <footer className="appointments-footer">
//         <span>GOLDEN TOUCH</span>
//         <p>Where every detail makes a difference.</p>
//         <small>© {new Date().getFullYear()} Golden Touch. All rights reserved.</small>
//       </footer>
//     </div>
//   );
// }


import React, { useState } from "react";
import "./Appointments.css";
import AppointmentLogin from "./AppointmentLogin";
import AppointmentResults from "./AppointmentResults";

const BOOKINGS_KEY = "goldenTouchBookings";

const getMobile = (booking) =>
  String(
    booking.mobile ||
    booking.phone ||
    booking.customer?.mobile ||
    booking.customer?.phone ||
    booking.details?.mobile ||
    booking.customerDetails?.mobile ||
    ""
  ).replace(/\D/g, "").slice(-10);

const generateOTP = () =>
  String(Math.floor(100000 + Math.random() * 900000));

export default function Appointments() {
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const findAppointments = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setError("");

    try {
      const savedBookings = JSON.parse(
        localStorage.getItem(BOOKINGS_KEY) || "[]"
      );

      const allBookings = Array.isArray(savedBookings)
        ? savedBookings
        : [];

      const matchingBookings = allBookings
        .filter((booking) => getMobile(booking) === mobile)
        .map((booking) => {
          if (!booking.otp && !booking.bookingOtp) {
            return { ...booking, otp: generateOTP() };
          }
          return booking;
        });

      // Preserve generated OTPs in localStorage.
      const updatedBookings = allBookings.map((booking) => {
        const match = matchingBookings.find(
          (item) =>
            String(item.bookingId || item.id || "") ===
            String(booking.bookingId || booking.id || "")
        );

        return match || booking;
      });

      localStorage.setItem(
        BOOKINGS_KEY,
        JSON.stringify(updatedBookings)
      );

      setBookings(matchingBookings);
      setSearched(true);
    } catch (err) {
      console.error("Unable to load appointments:", err);
      setError("Unable to load appointments. Please try again.");
    }
  };

  const backToLogin = () => {
    setSearched(false);
    setBookings([]);
    setError("");
  };

  return (
    <div className="appointments-page">
      {!searched ? (
        <AppointmentLogin
          mobile={mobile}
          setMobile={setMobile}
          error={error}
          onSubmit={findAppointments}
        />
      ) : (
        <AppointmentResults
          mobile={mobile}
          bookings={bookings}
          onBack={backToLogin}
        />
      )}
    </div>
  );
}
