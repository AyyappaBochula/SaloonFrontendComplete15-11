
import React from "react";

export default function ServicesFooter() {
  return (
    <footer className="services-footer">
      <div className="services-footer-main">

        <div className="services-footer-brand">
          <div className="services-footer-logo">
            <span>♛</span>
            <div>
              <strong>Golden Touch</strong>
              <small>UNISEX SALON</small>
            </div>
          </div>
          <p>Look good. Feel great.</p>

          <div className="footer-socials">
            <a href="https://instagram.com" aria-label="Instagram">ig</a>
            <a href="https://facebook.com" aria-label="Facebook">f</a>
            <a href="https://wa.me/" aria-label="WhatsApp">wa</a>
          </div>
        </div>

        <div className="services-footer-column">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/#about">About</a>
          <a href="/bookservice">Services</a>
          <a href="/#gallery">Gallery</a>
          <a href="/#contact">Contact</a>
        </div>

        <div className="services-footer-column">
          <h3>Our Services</h3>
          <a href="#haircut">Haircut</a>
          <a href="#shaving">Shaving</a>
          <a href="#facial">Facial</a>
          <a href="#haircare">Hair Spa</a>
          <a href="#haircare">Hair Colouring</a>
        </div>

        <div className="services-footer-column">
          <h3>Contact Us</h3>
          <a href="tel:+919876543210">☎ +91 98765 43210</a>
          <a href="mailto:info@goldentouch.in">✉ info@goldentouch.in</a>
          <p>⌖ Vizag, Andhra Pradesh</p>
        </div>

        <div className="services-footer-column">
          <h3>Opening Hours</h3>
          <p>◷ &nbsp; Mon - Sun</p>
          <p>9:00 AM - 9:00 PM</p>
        </div>
      </div>

      <div className="services-footer-bottom">
        <span>© 2026 Golden Touch. All rights reserved.</span>
        <div>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}
