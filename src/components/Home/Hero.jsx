import React from "react";

export default function Hero() {
  return (
    <section className="gt-hero">
      <div className="gt-hero-image" />
      <div className="gt-hero-shade" />
      <div className="gt-hero-inner">
        <span className="gt-kicker"><i /> A SALON EXPERIENCE, REDEFINED</span>
        <h1>The art of<br /><em>looking your best.</em></h1>
        <p>Thoughtful hair, beauty and grooming experiences.<br className="desktop-break" /> Made personal. Remembered always.</p>
        <div className="gt-hero-actions">
          <a href="/bookservice" className="gt-gold-btn">Discover your service <span>↗</span></a>
          {/* <a href="/appointments" className="gt-text-link">Booked Appointments <span>↓</span></a> */}
            <a href="/appointments" className="gt-gold-btn">My Appointments  <span>↗</span></a>
        </div>
        <div className="gt-hero-bottomline">
          <span><b>01</b> PERSONALIZED CARE</span>
          <span><b>02</b> EXPERT STYLISTS</span>
          <span><b>03</b> TIME FOR YOU</span>
        </div>
      </div>
      <div className="gt-hero-side-label">GOLDEN TOUCH&nbsp; / &nbsp;VISAKHAPATNAM</div>
      <div className="gt-hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>
  );
}
