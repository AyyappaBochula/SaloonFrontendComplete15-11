import React from "react";

const stats = [
  ["5K+", "Happy clients"], ["4.9/5", "Client rating"],
  ["8+", "Years of care"], ["10+", "Expert stylists"]
];

export default function About() {
  return (
    <section className="gt-about gt-section" id="about">
      <div className="gt-about-copy">
        <span className="gt-kicker">A LITTLE ABOUT US</span>
        <h2>Beauty is personal.<br /><em>Your experience should be too.</em></h2>
        <p>Golden Touch is a premium unisex salon created for people who believe self-care is more than a routine. From precision haircuts to rejuvenating beauty treatments, our team brings skill, care and attention to every appointment.</p>
        <p className="gt-about-small">Relax, refresh and leave feeling like the best version of yourself.</p>
        <a href="/bookservice" className="gt-arrow-link">Discover the Golden Touch <span>↗</span></a>
        <div className="gt-stats">
          {stats.map(([number, label]) => <div className="gt-stat" key={label}><strong>{number}</strong><span>{label}</span></div>)}
        </div>
      </div>
      <div className="gt-about-visual">
        <img className="gt-about-main" src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1100&q=85" alt="Elegant salon interior" />
        <img className="gt-about-detail gt-about-detail-one" src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=550&q=85" alt="Barber at work" />
        <img className="gt-about-detail gt-about-detail-two" src="https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=550&q=85" alt="Hair and beauty treatment" />
        <div className="gt-image-caption"><span>THE GOLDEN EXPERIENCE</span><strong>Where confidence begins.</strong></div>
      </div>
    </section>
  );
}
