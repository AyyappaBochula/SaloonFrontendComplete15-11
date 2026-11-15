import React from "react";

const team = [
  { name: "Ramesh Kumar", role: "Senior Barber", years: "8+ YEARS", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=85" },
  { name: "Srinivas Rao", role: "Hair Stylist", years: "7+ YEARS", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85" },
  { name: "Lakshmi Priya", role: "Beauty Specialist", years: "6+ YEARS", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85" },
  { name: "Harsha Vardhan", role: "Style Consultant", years: "5+ YEARS", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85" }
];

export default function Staff() {
  return (
    <section className="gt-team gt-section" id="team">
      <div className="gt-section-heading">
        <span className="gt-kicker">THE PEOPLE BEHIND THE EXPERIENCE</span>
        <h2>Meet our <em>experts.</em></h2>
        <p>Good people. Skilled hands. A passion for making you feel great.</p>
      </div>
      <div className="gt-team-grid">
        {team.map((person) => (
          <article className="gt-team-card" key={person.name}>
            <div className="gt-team-photo"><img src={person.image} alt={person.name} loading="lazy" /><span>{person.years}</span></div>
            <div className="gt-team-info"><h3>{person.name}</h3><p>{person.role}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
