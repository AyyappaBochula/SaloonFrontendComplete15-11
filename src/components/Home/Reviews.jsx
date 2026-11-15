import React, { useState } from "react";

const reviews = [
  { name: "Rahul Kumar", location: "Regular client", text: "Amazing service! The team is professional, the space is beautiful and I always leave feeling refreshed." },
  { name: "Priya Sharma", location: "Beauty client", text: "A lovely experience from start to finish. The staff listened carefully and the results were exactly what I wanted." },
  { name: "Arjun Reddy", location: "Regular client", text: "Great haircut, friendly people and a very clean salon. Definitely one of my favourite places." }
];

export default function Reviews() {
  const [active, setActive] = useState(0);
  const review = reviews[active];
  const change = (step) => setActive((active + step + reviews.length) % reviews.length);

  return (
    <section className="gt-reviews gt-section" id="reviews">
      <div className="gt-review-intro">
        <span className="gt-kicker">KIND WORDS, REAL EXPERIENCES</span>
        <h2>Don't just take<br /><em>our word for it.</em></h2>
        <p>Every visit is an opportunity to make someone feel their best.</p>
        <div className="gt-review-rating"><strong>4.9</strong><span>★★★★★<small>Client satisfaction</small></span></div>
      </div>
      <div className="gt-review-panel">
        <div className="gt-quote-mark">“</div>
        <div className="gt-review-stars">★★★★★</div>
        <blockquote>{review.text}</blockquote>
        <div className="gt-review-person"><div className="gt-review-avatar">{review.name.charAt(0)}</div><div><strong>{review.name}</strong><span>{review.location}</span></div></div>
        <div className="gt-review-controls">
          <span>0{active + 1} <i>/</i> 0{reviews.length}</span>
          <div><button onClick={() => change(-1)} aria-label="Previous review">←</button><button onClick={() => change(1)} aria-label="Next review">→</button></div>
        </div>
      </div>
    </section>
  );
}
