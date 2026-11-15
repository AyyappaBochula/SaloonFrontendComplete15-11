
import React from "react";

export default function CustomerDetails({
  details,
  setDetails,
  onContinue,
}) {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setDetails((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!details.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(details.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (
      details.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    onContinue();
  };

  return (
    <form className="gt-booking-panel" onSubmit={handleSubmit}>

      <div className="gt-booking-panel-heading">
        <span className="gt-booking-kicker">
          STEP 01 / YOUR INFORMATION
        </span>

        <h2>
          Let's get to know <em>you.</em>
        </h2>

        <p>
          Enter your details so we can prepare for your visit.
        </p>
      </div>

      <div className="gt-form-grid">

        <label className="gt-form-field gt-field-full">
          <span>Full name <b>*</b></span>

          <input
            type="text"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </label>

        <label className="gt-form-field">
          <span>Mobile number <b>*</b></span>

          <input
            type="tel"
            name="mobile"
            value={details.mobile}
            onChange={handleChange}
            placeholder="10-digit mobile number"
            maxLength={10}
            inputMode="numeric"
            autoComplete="tel"
            required
          />
        </label>

        <label className="gt-form-field">
          <span>
            Email address <small>(Optional)</small>
          </span>

          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
          />
        </label>

      </div>

      <div className="gt-booking-action">
        <button className="gt-booking-primary" type="submit">
          Continue to date & time <span>↗</span>
        </button>
      </div>

    </form>
  );
}
