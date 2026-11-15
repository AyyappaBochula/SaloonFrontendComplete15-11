import React from "react";

const photos = [
  ["https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85", "Our salon"],
  ["https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=85", "Barbering"],
  ["https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=85", "Hair styling"],
  ["https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=85", "Salon experience"]
];

export default function Gallery() {
  return (
    <section className="gt-gallery gt-section" id="gallery">
      <div className="gt-section-heading gt-heading-left">
        <span className="gt-kicker">INSIDE GOLDEN TOUCH</span>
        <h2>A glimpse of <em>our world.</em></h2>
        <p>Beautiful spaces. Beautiful transformations.</p>
      </div>
      <div className="gt-gallery-grid">
        {photos.map(([src, alt], index) => (
          <figure className={`gt-gallery-item gt-gallery-item-${index + 1}`} key={alt}>
            <img src={src} alt={alt} loading="lazy" />
            <figcaption>{alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
