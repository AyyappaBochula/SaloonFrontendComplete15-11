
import React, { useMemo } from "react";
import { getDuration } from "./Booking";

const OPENING_MINUTES = 10 * 60;
const CLOSING_MINUTES = 19 * 60;
const SLOT_INTERVAL = 30;

// Demo unavailable slots. Replace with real backend availability later.
const unavailableSlots = ["11:00", "14:30", "17:00"];

const dateValue = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatTime = (value) => {
  const [hour, minute] = value.split(":").map(Number);
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${
    hour >= 12 ? "PM" : "AM"
  }`;
};

export default function DateTimeSelection({
  services,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  onContinue,
  onBack,
}) {
  const totalDuration = services.reduce(
    (sum, service) =>
      sum + getDuration(service.time || service.duration),
    0
  );

  const dates = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, []);

  const slots = useMemo(() => {
    const result = [];

    for (
      let minutes = OPENING_MINUTES;
      minutes + totalDuration <= CLOSING_MINUTES;
      minutes += SLOT_INTERVAL
    ) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;

      const value =
        `${String(hour).padStart(2, "0")}:` +
        `${String(minute).padStart(2, "0")}`;

      result.push({
        value,
        label: formatTime(value),
        unavailable: unavailableSlots.includes(value),
      });
    }

    return result;
  }, [totalDuration]);

  const handleDateSelect = (date) => {
    setSelectedDate(dateValue(date));
    setSelectedTime("");
  };

  return (
    <div className="gt-booking-panel">

      <div className="gt-booking-panel-heading">
        <span className="gt-booking-kicker">
          STEP 02 / YOUR APPOINTMENT
        </span>

        <h2>
          Choose your <em>moment.</em>
        </h2>

        <p>
          Select a date and a time that works best for you.
        </p>
      </div>

      <div className="gt-selection-section">

        <div className="gt-selection-title">
          <div>
            <span className="gt-section-number">01</span>
            <h3>Select a date</h3>
          </div>

          <span className="gt-selection-hint">Next 14 days</span>
        </div>

        <div className="gt-date-list">
          {dates.map((date) => {
            const value = dateValue(date);

            return (
              <button
                type="button"
                key={value}
                className={`gt-date-option ${
                  selectedDate === value ? "active" : ""
                }`}
                onClick={() => handleDateSelect(date)}
              >
                <span>
                  {date.toLocaleDateString("en-IN", {
                    weekday: "short",
                  })}
                </span>

                <strong>{date.getDate()}</strong>

                <small>
                  {date.toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </small>
              </button>
            );
          })}
        </div>

      </div>

      <div className="gt-selection-section">

        <div className="gt-selection-title">
          <div>
            <span className="gt-section-number">02</span>
            <h3>Available time slots</h3>
          </div>

          <span className="gt-selection-hint">
            30-minute intervals
          </span>
        </div>

        {!selectedDate ? (
          <p className="gt-slot-message">
            Please select a date first.
          </p>
        ) : (
          <>
            <div className="gt-time-grid">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot.value}
                  disabled={slot.unavailable}
                  className={`gt-time-option ${
                    selectedTime === slot.value ? "active" : ""
                  }`}
                  onClick={() => setSelectedTime(slot.value)}
                >
                  {slot.label}
                </button>
              ))}
            </div>

            <div className="gt-slot-legend">
              <span><i className="available-dot" /> Available</span>
              <span><i className="selected-dot" /> Selected</span>
              <span><i className="unavailable-dot" /> Unavailable</span>
            </div>
          </>
        )}

      </div>

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
          disabled={!selectedDate || !selectedTime}
          onClick={onContinue}
        >
          Continue to payment <span>↗</span>
        </button>

      </div>

    </div>
  );
}
