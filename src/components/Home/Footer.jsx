import React from "react";

export default function Footer() {
  return (
    <footer className="gt-footer" id="contact">
      <div className="gt-footer-main">
        <div className="gt-footer-brand">
          <a className="gt-logo" href="#top"><span className="gt-logo-mark">♛</span><span className="gt-logo-copy"><strong>Golden Touch</strong><small>PREMIUM UNISEX SALON</small></span></a>
          <p>Your style. Our passion. A little luxury in every visit.</p>
          <div className="gt-social-links"><a href="#contact" aria-label="Instagram">ig</a><a href="#contact" aria-label="Facebook">f</a><a href="#contact" aria-label="WhatsApp">wa</a></div>
        </div>
        <div className="gt-footer-col"><h4>Explore</h4><a href="#top">Home</a><a href="#about">About us</a><a href="#gallery">Gallery</a><a href="#team">Our team</a></div>
        <div className="gt-footer-col"><h4>Our services</h4><a href="/bookservice">Haircut & styling</a><a href="/bookservice">Shaving & grooming</a><a href="/bookservice">Facial & skincare</a><a href="/bookservice">Hair spa</a></div>
        <div className="gt-footer-col"><h4>Get in touch</h4><p>Visakhapatnam, Andhra Pradesh</p><a href="tel:+919876543210">+91 98765 43210</a><a href="mailto:hello@goldentouch.in">hello@goldentouch.in</a></div>
        <div className="gt-footer-col"><h4>Opening hours</h4><p>Monday – Sunday</p><p>9:00 AM – 9:00 PM</p><a href="/bookservice" className="gt-footer-book">Book your visit ↗</a></div>
      </div>
      <div className="gt-footer-bottom"><span>© 2026 Golden Touch. All rights reserved.</span><div><a href="#contact">Privacy policy</a><a href="#contact">Terms & conditions</a></div></div>
    </footer>
  );
}
