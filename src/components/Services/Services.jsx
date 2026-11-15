
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ServicesNavbar from "./ServicesNavbar";
import ServicesHero from "./ServicesHero";
import ServiceCategory from "./ServiceCategory";
import SelectedServices from "./SelectedServices";
import MobileBookingBar from "./MobileBookingBar";
import ServicesFooter from "./ServicesFooter";
import "./Services.css";

const categories = [
  {
    id: "haircut",
    title: "Haircut",
    subtitle: "Find your signature style",
    icon: "✂",
    services: [
      { id: 1, name: "Classic Haircut", price: 200, duration: 30, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=85" },
      { id: 2, name: "Fade Haircut", price: 250, duration: 40, image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=85" },
      { id: 3, name: "Stylish Haircut", price: 300, duration: 45, image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&q=85" },
      { id: 4, name: "Kids Haircut", price: 150, duration: 30, image: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=500&q=85" }
    ]
  },
  {
    id: "shaving",
    title: "Shaving & Beard Styling",
    subtitle: "Look sharper, feel confident",
    icon: "♛",
    services: [
      { id: 5, name: "Clean Shave", price: 150, duration: 20, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=500&q=85" },
      { id: 6, name: "Beard Styling", price: 100, duration: 20, image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&q=85" },
      { id: 7, name: "Beard Trimming", price: 120, duration: 25, image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=500&q=85" },
      { id: 8, name: "Premium Shave", price: 200, duration: 30, image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&q=85" }
    ]
  },
  {
    id: "facial",
    title: "Facial & Skin Care",
    subtitle: "Give your skin the care it deserves",
    icon: "✿",
    services: [
      { id: 9, name: "Classic Facial", price: 300, duration: 40, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=85" },
      { id: 10, name: "Gold Facial", price: 350, duration: 45, image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=85" },
      { id: 11, name: "Anti-Acne Facial", price: 350, duration: 45, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&q=85" },
      { id: 12, name: "Hydra Facial", price: 400, duration: 50, image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=85" }
    ]
  },
  {
    id: "haircare",
    title: "Hair Spa & Treatments",
    subtitle: "Restore, refresh and revive",
    icon: "✧",
    services: [
      { id: 13, name: "Classic Hair Spa", price: 400, duration: 45, image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=500&q=85" },
      { id: 14, name: "Deep Conditioning", price: 500, duration: 50, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&q=85" },
      { id: 15, name: "Hair Colouring", price: 700, duration: 60, image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=500&q=85" },
      { id: 16, name: "Hair Treatment", price: 800, duration: 60, image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&q=85" }
    ]
  }
];

export default function Services() {
  const navigate = useNavigate();

  const [selectedServices, setSelectedServices] = useState([]);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const totalServices = selectedServices.length;

  const subtotal = selectedServices.reduce(
    (total, service) => total + service.price, 0
  );

  const totalDuration = selectedServices.reduce(
    (total, service) => total + service.duration, 0
  );

  const advance = Math.round(subtotal * 0.25);
  const remaining = subtotal - advance;

  const addService = (service) => {
    setSelectedServices((previous) => {
      if (previous.some((item) => item.id === service.id)) return previous;
      return [...previous, service];
    });
  };

  const removeService = (id) => {
    setSelectedServices((previous) =>
      previous.filter((service) => service.id !== id)
    );
  };

  const isSelected = (id) =>
    selectedServices.some((service) => service.id === id);

  const continueBooking = () => {
    if (!selectedServices.length) return;

    localStorage.setItem(
      "goldenTouchSelectedServices",
      JSON.stringify(selectedServices)
    );

    navigate("/booking");
  };

  return (
    <>
      <ServicesNavbar
        count={totalServices}
        onOpenSelected={() => setMobileDrawerOpen(true)}
      />

      <div className="services-page">
        <ServicesHero />

        <div className="services-layout">
          <div className="services-main">
            {categories.map((category) => (
              <ServiceCategory
                key={category.id}
                category={category}
                selectedServices={selectedServices}
                onAdd={addService}
                onRemove={removeService}
                isSelected={isSelected}
              />
            ))}
          </div>

          <aside className="services-sidebar">
            <SelectedServices
              selectedServices={selectedServices}
              subtotal={subtotal}
              totalDuration={totalDuration}
              advance={advance}
              remaining={remaining}
              onRemove={removeService}
              onContinue={continueBooking}
            />
          </aside>
        </div>

        <MobileBookingBar
          count={totalServices}
          subtotal={subtotal}
          openDrawer={() => setMobileDrawerOpen(true)}
        />

        {mobileDrawerOpen && (
          <div className="mobile-drawer-overlay">
            <div
              className="mobile-drawer-backdrop"
              onClick={() => setMobileDrawerOpen(false)}
            />

            <div className="mobile-drawer">
              <div className="mobile-drawer-handle" />

              <div className="mobile-drawer-heading">
                <div>
                  <span className="service-eyebrow">YOUR APPOINTMENT</span>
                  <h2>Selected Services</h2>
                </div>

                <button
                  className="drawer-close"
                  onClick={() => setMobileDrawerOpen(false)}
                  aria-label="Close selected services"
                >
                  ×
                </button>
              </div>

              <SelectedServices
                selectedServices={selectedServices}
                subtotal={subtotal}
                totalDuration={totalDuration}
                advance={advance}
                remaining={remaining}
                onRemove={removeService}
                onContinue={continueBooking}
              />
            </div>
          </div>
        )}

        <ServicesFooter />
      </div>
    </>
  );
}
