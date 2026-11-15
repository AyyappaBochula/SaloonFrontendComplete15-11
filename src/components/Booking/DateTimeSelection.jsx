
import React, { useMemo } from "react";
import { getDuration } from "./Booking";

const OPENING_MINUTES = 10 * 60;
const CLOSING_MINUTES = 19 * 60;
const SLOT_INTERVAL = 60; // 1-hour difference

// Demo unavailable slots
const unavailableSlots = ["11:00", "14:00", "17:00"];

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

  const durationLabel =
    totalDuration >= 60
      ? `${Math.floor(totalDuration / 60)} hr${
          totalDuration % 60
            ? ` ${totalDuration % 60} min`
            : ""
        }`
      : `${totalDuration} min`;

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

    const now = new Date();
    const today = dateValue(now);
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

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

      const isPast =
        selectedDate === today && minutes <= currentMinutes;

      result.push({
        value,
        label: formatTime(value),
        unavailable:
          unavailableSlots.includes(value) || isPast,
      });
    }

    return result;
  }, [totalDuration, selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(dateValue(date));
    setSelectedTime("");
  };

  return (
    <div className="gt-booking-panel gt-date-clean">

      {/* Heading */}
      <div className="gt-booking-panel-heading">
        <span className="gt-booking-kicker">
          STEP 02 / YOUR APPOINTMENT
        </span>

        <h2>
          Choose your <em>moment.</em>
        </h2>

        <p>
          Pick a convenient date and appointment time.
        </p>
      </div>

      {/* Date selection */}
      <section className="gt-date-section">

        <div className="gt-date-section-heading">
          <div>
            <span className="gt-date-step">01</span>
            <div>
              <h3>Choose a date</h3>
              <p>Select your preferred day</p>
            </div>
          </div>

          <span className="gt-date-range">NEXT 14 DAYS</span>
        </div>

        <div className="gt-date-list">
          {dates.map((date) => {
            const value = dateValue(date);
            const active = selectedDate === value;

            return (
              <button
                type="button"
                key={value}
                className={`gt-date-option-clean ${
                  active ? "active" : ""
                }`}
                onClick={() => handleDateSelect(date)}
                aria-pressed={active}
              >
                <span className="gt-date-weekday">
                  {date.toLocaleDateString("en-IN", {
                    weekday: "short",
                  })}
                </span>

                <strong>{date.getDate()}</strong>

                <span className="gt-date-month">
                  {date.toLocaleDateString("en-IN", {
                    month: "short",
                  })}
                </span>

                {active && (
                  <span className="gt-date-selected-mark">✓</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Time selection */}
      <section className="gt-date-section">

        <div className="gt-date-section-heading">
          <div>
            <span className="gt-date-step">02</span>
            <div>
              <h3>Choose a time</h3>
              <p>Appointments available every hour</p>
            </div>
          </div>

          <span className="gt-date-range">10 AM – 7 PM</span>
        </div>

        {/* Duration */}
        <div className="gt-duration-card">
          <div className="gt-duration-icon">◷</div>

          <div>
            <span>YOUR APPOINTMENT DURATION</span>
            <strong>{durationLabel}</strong>
          </div>
        </div>

        {!selectedDate ? (
          <div className="gt-date-empty">
            <span>▦</span>
            <strong>Select a date first</strong>
            <p>Available appointment times will appear here.</p>
          </div>
        ) : slots.length === 0 ? (
          <div className="gt-date-empty">
            <span>◷</span>
            <strong>No available times</strong>
            <p>Please choose another date.</p>
          </div>
        ) : (
          <>
            <div className="gt-time-grid-clean">
              {slots.map((slot) => {
                const active = selectedTime === slot.value;

                return (
                  <button
                    type="button"
                    key={slot.value}
                    disabled={slot.unavailable}
                    aria-pressed={active}
                    className={`gt-time-option-clean ${
                      active ? "active" : ""
                    } ${
                      slot.unavailable ? "unavailable" : ""
                    }`}
                    onClick={() => setSelectedTime(slot.value)}
                  >
                    <span>{slot.label}</span>

                    {active && (
                      <small>SELECTED</small>
                    )}

                    {slot.unavailable && (
                      <small>UNAVAILABLE</small>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="gt-time-legend-clean">
              <span>
                <i className="gt-legend-available" />
                Available
              </span>

              <span>
                <i className="gt-legend-selected" />
                Selected
              </span>

              <span>
                <i className="gt-legend-unavailable" />
                Unavailable
              </span>
            </div>
          </>
        )}
      </section>

      {/* Selected appointment summary */}
      {selectedDate && selectedTime && (
        <div className="gt-selected-appointment">
          <span>YOUR SELECTION</span>

          <strong>
            {new Date(
              `${selectedDate}T00:00:00`
            ).toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "long",
            })}
            {" · "}
            {formatTime(selectedTime)}
          </strong>
        </div>
      )}

      {/* Actions */}
      <div className="gt-booking-action gt-booking-action-split gt-date-actions">
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
