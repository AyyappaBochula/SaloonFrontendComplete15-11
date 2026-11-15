
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Booking.css";

// import BookingProgress from "./BookingProgress";
// import CustomerDetails from "./CustomerDetails";
// import DateTimeSelection from "./DateTimeSelection";
// import PaymentStep from "./PaymentStep";
// import BookingSummary from "./BookingSummary";
// import BookingConfirmation from "./BookingConfirmation";

// export const getPrice = (price) =>
//   Number(String(price ?? 0).replace(/[₹,\s]/g, "")) || 0;

// export const getDuration = (value) => {
//   if (typeof value === "number") return value;

//   const text = String(value || "0");
//   const hours = text.match(/(\d+)\s*hr/i);
//   const minutes = text.match(/(\d+)\s*min/i);

//   return (hours ? Number(hours[1]) * 60 : 0) +
//     (minutes ? Number(minutes[1]) : 0);
// };

// export const formatPrice = (amount) =>
//   `₹${Number(amount || 0).toLocaleString("en-IN")}`;

// export const getBookingTotals = (services = []) => {
//   const total = services.reduce(
//     (sum, service) => sum + getPrice(service.price), 0
//   );

//   const duration = services.reduce(
//     (sum, service) => sum + getDuration(service.time || service.duration), 0
//   );

//   const advance = Math.round(total * 0.25);

//   return {
//     total,
//     duration,
//     advance,
//     remaining: total - advance,
//   };
// };

// export default function Booking() {
//   const navigate = useNavigate();

//   const [services] = useState(() => {
//     try {
//       return JSON.parse(
//         localStorage.getItem("goldenTouchSelectedServices") || "[]"
//       );
//     } catch {
//       return [];
//     }
//   });

//   const [step, setStep] = useState(1);

//   const [details, setDetails] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//   });

//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const [booking, setBooking] = useState(null);

//   const totals = getBookingTotals(services);

//   const handleDemoPayment = () => {
//     const newBooking = {
//       id: `GT${Date.now().toString().slice(-8)}`,
//       details,
//       services,
//       date: selectedDate,
//       time: selectedTime,
//       ...totals,
//       status: "Booked",
//     };

//     try {
//       const previousBookings = JSON.parse(
//         localStorage.getItem("goldenTouchBookings") || "[]"
//       );

//       localStorage.setItem(
//         "goldenTouchBookings",
//         JSON.stringify([newBooking, ...previousBookings])
//       );

//       localStorage.removeItem("goldenTouchSelectedServices");
//     } catch (error) {
//       console.error("Unable to save booking:", error);
//     }

//     setBooking(newBooking);
//   };

//   if (booking) {
//     return (
//       <main className="gt-booking-page">
//         <header className="gt-booking-header">
//           <a href="/" className="gt-booking-logo">
//             <span>✳</span>
//             <div>
//               <strong>Golden Touch</strong>
//               <small>THE ART OF SELF-CARE</small>
//             </div>
//           </a>
//           <a href="/appointments" className="gt-booking-exit">
//             My appointments <span>↗</span>
//           </a>
//         </header>
//         <BookingConfirmation booking={booking} />
//       </main>
//     );
//   }

//   if (!services.length) {
//     return (
//       <main className="gt-booking-empty">
//         <span className="gt-booking-kicker">GOLDEN TOUCH</span>
//         <h1>Your experience <em>starts here.</em></h1>
//         <p>You haven't selected any services yet.</p>
//         <button
//           className="gt-booking-primary"
//           onClick={() => navigate("/bookservice")}
//         >
//           Explore services <span>↗</span>
//         </button>
//       </main>
//     );
//   }

//   return (
//     <main className="gt-booking-page">

//       <header className="gt-booking-header">
//         <a href="/" className="gt-booking-logo">
//           <span>✳</span>
//           <div>
//             <strong>Golden Touch</strong>
//             <small>THE ART OF SELF-CARE</small>
//           </div>
//         </a>

//         <button
//           className="gt-booking-exit"
//           onClick={() => navigate("/bookservice")}
//         >
//           ← Back to services
//         </button>
//       </header>

//       <section className="gt-booking-intro">
//         <span className="gt-booking-kicker">
//           YOUR GOLDEN TOUCH EXPERIENCE
//         </span>
//         <h1>Make time for <em>yourself.</em></h1>
//         <p>Just three simple steps to reserve your appointment.</p>
//       </section>

//       <BookingProgress currentStep={step} />

//       <div className="gt-booking-layout">

//         <div className="gt-booking-main">

//           {step === 1 && (
//             <CustomerDetails
//               details={details}
//               setDetails={setDetails}
//               onContinue={() => setStep(2)}
//             />
//           )}

//           {step === 2 && (
//             <DateTimeSelection
//               services={services}
//               selectedDate={selectedDate}
//               setSelectedDate={setSelectedDate}
//               selectedTime={selectedTime}
//               setSelectedTime={setSelectedTime}
//               onContinue={() => setStep(3)}
//               onBack={() => setStep(1)}
//             />
//           )}

//           {step === 3 && (
//             <PaymentStep
//               totals={totals}
//               selectedDate={selectedDate}
//               selectedTime={selectedTime}
//               onBack={() => setStep(2)}
//               onPay={handleDemoPayment}
//             />
//           )}

//         </div>

//         <BookingSummary services={services} />

//       </div>

//       <footer className="gt-booking-footer">
//         <span>✳ GOLDEN TOUCH</span>
//         <span>THE ART OF SELF-CARE</span>
//       </footer>

//     </main>
//   );
// }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

import BookingProgress from "./BookingProgress";
import CustomerDetails from "./CustomerDetails";
import DateTimeSelection from "./DateTimeSelection";
import PaymentStep from "./PaymentStep";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";

export const getPrice = (price) =>
  Number(String(price ?? 0).replace(/[₹,\s*]/g, "")) || 0;

export const getDuration = (value) => {
  if (typeof value === "number") return value;

  const text = String(value || "0");
  const hours = text.match(/(\d+)\s*hr/i);
  const minutes = text.match(/(\d+)\s*min/i);

  return (
    (hours ? Number(hours[1]) * 60 : 0) +
    (minutes ? Number(minutes[1]) : 0)
  );
};

export const formatPrice = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN")}`;

export const getBookingTotals = (services = []) => {
  const total = services.reduce(
    (sum, service) => sum + getPrice(service.price),
    0
  );

  const duration = services.reduce(
    (sum, service) =>
      sum + getDuration(service.time || service.duration),
    0
  );

  const advance = Math.ceil(total * 0.25);

  return {
    total,
    duration,
    advance,
    remaining: total - advance,
  };
};

export default function Booking() {
  const navigate = useNavigate();

  const [services] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("goldenTouchSelectedServices") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [step, setStep] = useState(1);

  const [details, setDetails] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [booking, setBooking] = useState(null);

  const totals = getBookingTotals(services);

  // Save the actual payment selected by the customer
  const handleDemoPayment = (paymentDetails) => {
    const total = Number(paymentDetails?.total ?? totals.total);
    const minimumAdvance = Math.ceil(total * 0.25);

    const advance = Math.min(
      total,
      Math.max(
        minimumAdvance,
        Number(paymentDetails?.advance ?? minimumAdvance)
      )
    );

    const remaining = Math.max(0, total - advance);

    const paymentPercentage =
      total > 0
        ? Math.round((advance / total) * 100)
        : 100;

    const newBooking = {
      id: `GT${Date.now().toString().slice(-8)}`,
      details,
      services,
      date: selectedDate,
      time: selectedTime,

      total,
      duration: totals.duration,

      advance,
      remaining,
      paymentPercentage,

      paymentStatus:
        remaining === 0 ? "Fully Paid" : "Partially Paid",

      status: "Booked",

      otp: String(
        Math.floor(100000 + Math.random() * 900000)
      ),

      createdAt: new Date().toISOString(),
    };

    try {
      const previousBookings = JSON.parse(
        localStorage.getItem("goldenTouchBookings") || "[]"
      );

      localStorage.setItem(
        "goldenTouchBookings",
        JSON.stringify([newBooking, ...previousBookings])
      );

      localStorage.removeItem("goldenTouchSelectedServices");

      setBooking(newBooking);
    } catch (error) {
      console.error("Unable to save booking:", error);
      alert("Unable to save your booking. Please try again.");
    }
  };

  // Booking confirmation screen
  if (booking) {
    return (
      <main className="gt-booking-page">
        <header className="gt-booking-header">
          <a href="/" className="gt-booking-logo">
            <span>✳</span>
            <div>
              <strong>Golden Touch</strong>
              <small>THE ART OF SELF-CARE</small>
            </div>
          </a>

          <a href="/appointments" className="gt-booking-exit">
            My appointments <span>↗</span>
          </a>
        </header>

        <BookingConfirmation booking={booking} />
      </main>
    );
  }

  // Empty services screen
  if (!services.length) {
    return (
      <main className="gt-booking-empty">
        <span className="gt-booking-kicker">GOLDEN TOUCH</span>

        <h1>
          Your experience <em>starts here.</em>
        </h1>

        <p>You haven't selected any services yet.</p>

        <button
          className="gt-booking-primary"
          onClick={() => navigate("/bookservice")}
        >
          Explore services <span>↗</span>
        </button>
      </main>
    );
  }

  return (
    <main className="gt-booking-page">
      <header className="gt-booking-header">
        <a href="/" className="gt-booking-logo">
          <span>✳</span>
          <div>
            <strong>Golden Touch</strong>
            <small>THE ART OF SELF-CARE</small>
          </div>
        </a>

        <button
          className="gt-booking-exit"
          onClick={() => navigate("/bookservice")}
        >
          ← Back to services
        </button>
      </header>

      <section className="gt-booking-intro">
        <span className="gt-booking-kicker">
          YOUR GOLDEN TOUCH EXPERIENCE
        </span>

        <h1>
          Make time for <em>yourself.</em>
        </h1>

        <p>Just three simple steps to reserve your appointment.</p>
      </section>

      <BookingProgress currentStep={step} />

      <div className="gt-booking-layout">
        <div className="gt-booking-main">
          {step === 1 && (
            <CustomerDetails
              details={details}
              setDetails={setDetails}
              onContinue={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <DateTimeSelection
              services={services}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              onContinue={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <PaymentStep
              totals={totals}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onBack={() => setStep(2)}
              onPay={handleDemoPayment}
            />
          )}
        </div>

        <BookingSummary services={services} />
      </div>

      <footer className="gt-booking-footer">
        <span>✳ GOLDEN TOUCH</span>
        <span>THE ART OF SELF-CARE</span>
      </footer>
    </main>
  );
}
