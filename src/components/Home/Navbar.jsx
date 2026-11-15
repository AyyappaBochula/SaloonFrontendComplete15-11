import React, { useState } from "react";

const links = [
  ["Home", "#top"], ["Our Story", "#about"], ["Services", "#services"],
  ["The Space", "#gallery"], ["Reviews", "#reviews"], ["Our Team", "#team"]
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  return (
    <header className="gt-header" id="top">
      <a className="gt-logo" href="#top" onClick={() => { setOpen(false); setActive("Home"); }}>
        <span className="gt-logo-mark">✳</span>
        <span className="gt-logo-copy"><strong>Golden Touch</strong><small>THE ART OF SELF-CARE</small></span>
      </a>

      <nav id="primary-navigation" className={`gt-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
        {links.map(([label, href]) => (
          <a className={active === label ? "active" : ""} key={label} href={href}
            onClick={() => { setActive(label); setOpen(false); }}>{label}</a>
        ))}
        <a className="gt-mobile-book" href="/bookservice" onClick={() => setOpen(false)}>Reserve your visit <span>↗</span></a>
      </nav>

      <div className="gt-header-actions">
        <a className="gt-booked-link" href="/appointments">My appointments <span>↗</span></a>
        <a className="gt-gold-btn gt-header-book" href="/bookservice">Book an experience <span>↗</span></a>
      </div>

      <button type="button" className={`gt-menu-btn ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"} aria-controls="primary-navigation" aria-expanded={open}>
        <span></span><span></span>
      </button>
    </header>
  );
}
