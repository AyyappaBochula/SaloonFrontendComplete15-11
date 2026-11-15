
import React from "react";
import ServiceCard from "./ServiceCard";

export default function ServiceCategory({
  category,
  selectedServices,
  onAdd,
  onRemove,
  isSelected
}) {
  return (
    <section className="service-category" id={category.id}>
      <div className="category-heading">
        <div className="category-title">
          <span className="category-icon">{category.icon}</span>
          <h2>{category.title}</h2>
        </div>

        <div className="category-line" />

        <p>{category.subtitle}</p>
      </div>

      <div className="category-service-grid">
        {category.services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            selected={isSelected(service.id)}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
