
import React from "react";

const steps = [
  { number: 1, label: "Your details" },
  { number: 2, label: "Date & time" },
  { number: 3, label: "Payment" },
];

export default function BookingProgress({ currentStep }) {
  return (
    <div className="gt-booking-progress">

      {steps.map((step, index) => (
        <React.Fragment key={step.number}>

          <div
            className={`gt-progress-step ${
              currentStep === step.number
                ? "active"
                : currentStep > step.number
                ? "completed"
                : ""
            }`}
          >
            <span className="gt-progress-number">
              {currentStep > step.number ? "✓" : `0${step.number}`}
            </span>

            <span className="gt-progress-label">
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <span
              className={`gt-progress-line ${
                currentStep > step.number ? "completed" : ""
              }`}
            />
          )}

        </React.Fragment>
      ))}

    </div>
  );
}
