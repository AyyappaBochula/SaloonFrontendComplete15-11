
import React from "react";

export default function ServiceCard({
  service,
  selected,
  onAdd,
  onRemove
}) {
  return (
    <article className={`service-card ${selected ? "service-selected" : ""}`}>
      <div className="service-card-image">
        <img src={service.image} alt={service.name} loading="lazy" />

        {selected && (
          <span className="service-selected-tag">✓ ADDED</span>
        )}
      </div>

      <div className="service-card-info">
        <h3>{service.name}</h3>

        <span className="service-duration">
          <span>◷</span> {service.duration} min
        </span>

        <strong className="service-price">
          ₹{service.price.toLocaleString("en-IN")}
        </strong>

        <button
          className={`service-add-btn ${selected ? "added" : ""}`}
          onClick={() =>
            selected ? onRemove(service.id) : onAdd(service)
          }
        >
          {selected ? "✓ Added" : "+ Add"}
        </button>
      </div>
    </article>
  );
}
