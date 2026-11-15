
// import React from "react";

// export default function SelectedServices({
//   selectedServices,
//   subtotal,
//   totalDuration,
//   advance,
//   remaining,
//   onRemove,
//   onContinue
// }) {
//   return (
//     <div className="selected-services-panel">
//       <div className="selected-panel-heading">
//         <div className="selected-panel-title">
//           <span className="selected-crown">♛</span>
//           <h2>Your Selection</h2>
//         </div>

//         <span className="selected-count">
//           {selectedServices.length} Selected
//         </span>
//       </div>

//       {selectedServices.length === 0 ? (
//         <div className="empty-selection">
//           <div className="empty-icon">✂</div>
//           <h3>Your salon experience starts here</h3>
//           <p>
//             Choose the services you love. Your selections will appear here.
//           </p>
//           <span>SELECT A SERVICE TO BEGIN</span>
//         </div>
//       ) : (
//         <div className="selected-list">
//           {selectedServices.map((service) => (
//             <div className="selected-service-item" key={service.id}>
//               <img src={service.image} alt={service.name} />

//               <div className="selected-service-details">
//                 <h3>{service.name}</h3>
//                 <span>◷ {service.duration} min</span>
//                 <strong>₹{service.price.toLocaleString("en-IN")}</strong>
//               </div>

//               <button
//                 className="remove-service-btn"
//                 onClick={() => onRemove(service.id)}
//                 aria-label={`Remove ${service.name}`}
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="selection-calculations">
//         <div className="calculation-row">
//           <span>♧ &nbsp; Total Services</span>
//           <strong>{selectedServices.length}</strong>
//         </div>

//         <div className="calculation-row">
//           <span>◷ &nbsp; Estimated Duration</span>
//           <strong>
//             {totalDuration >= 60
//               ? `${Math.floor(totalDuration / 60)} hr ${totalDuration % 60 ? `${totalDuration % 60} min` : ""}`
//               : `${totalDuration} min`}
//           </strong>
//         </div>

//         <div className="calculation-row">
//           <span>Subtotal</span>
//           <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
//         </div>
//       </div>

//       <div className="payment-summary">
//         <div className="payment-advance">
//           <span>Advance Payment (25%)</span>
//           <strong>₹{advance.toLocaleString("en-IN")}</strong>
//         </div>

//         <div className="payment-remaining">
//           <span>Remaining Amount (75%)</span>
//           <strong>₹{remaining.toLocaleString("en-IN")}</strong>
//         </div>
//       </div>

//       <button
//         className="continue-booking-btn"
//         disabled={!selectedServices.length}
//         onClick={onContinue}
//       >
//         Continue to Booking <span>→</span>
//       </button>

//       <div className="secure-payment-note">
//         <span>♢</span> Secure & Safe Booking
//       </div>
//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

export default function SelectedServices({
  selectedServices,
  subtotal,
  totalDuration,
  advance,
  remaining,
  onRemove,
  onContinue
}) {
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!selectedServices.length) return;

    localStorage.setItem(
      "goldenTouchSelectedServices",
      JSON.stringify(selectedServices)
    );

    if (onContinue) {
      onContinue();
    } else {
      navigate("/booking");
    }
  };

  return (
    <div className="selected-services-panel">
      <div className="selected-panel-heading">
        <div className="selected-panel-title">
          <span className="selected-crown">♛</span>
          <h2>Your Selection</h2>
        </div>

        <span className="selected-count">
          {selectedServices.length} Selected
        </span>
      </div>

      {selectedServices.length === 0 ? (
        <div className="empty-selection">
          <div className="empty-icon">✂</div>
          <h3>Your salon experience starts here</h3>
          <p>
            Choose the services you love. Your selections will appear here.
          </p>
          <span>SELECT A SERVICE TO BEGIN</span>
        </div>
      ) : (
        <div className="selected-list">
          {selectedServices.map((service) => (
            <div className="selected-service-item" key={service.id}>
              <img src={service.image} alt={service.name} />

              <div className="selected-service-details">
                <h3>{service.name}</h3>
                <span>◷ {service.duration} min</span>
                <strong>₹{service.price.toLocaleString("en-IN")}</strong>
              </div>

              <button
                className="remove-service-btn"
                onClick={() => onRemove(service.id)}
                aria-label={`Remove ${service.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="selection-calculations">
        <div className="calculation-row">
          <span>♧ &nbsp; Total Services</span>
          <strong>{selectedServices.length}</strong>
        </div>

        <div className="calculation-row">
          <span>◷ &nbsp; Estimated Duration</span>
          <strong>
            {totalDuration >= 60
              ? `${Math.floor(totalDuration / 60)} hr ${totalDuration % 60 ? `${totalDuration % 60} min` : ""}`
              : `${totalDuration} min`}
          </strong>
        </div>

        <div className="calculation-row">
          <span>Subtotal</span>
          <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <div className="payment-summary">
        <div className="payment-advance">
          <span>Advance Payment (25%)</span>
          <strong>₹{advance.toLocaleString("en-IN")}</strong>
        </div>

        <div className="payment-remaining">
          <span>Remaining Amount (75%)</span>
          <strong>₹{remaining.toLocaleString("en-IN")}</strong>
        </div>
      </div>

      <button
        className="continue-booking-btn"
        disabled={!selectedServices.length}
        onClick={handleContinue}
      >
        Continue to Booking <span>→</span>
      </button>

      <div className="secure-payment-note">
        <span>♢</span> Secure & Safe Booking
      </div>
    </div>
  );
}
