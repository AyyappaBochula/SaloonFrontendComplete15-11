import React from "react";

const services = [
  { name: "The Signature Cut", category: "HAIR & STYLING", time: "30 min", price: "₹200", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=90", desc: "A considered cut, finished just for you." },
  { name: "The Classic Shave", category: "MEN'S GROOMING", time: "20 min", price: "₹150", image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=90", desc: "A close, comfortable and timeless finish." },
  { name: "Beard Sculpting", category: "MEN'S GROOMING", time: "30 min", price: "₹200", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=900&q=90", desc: "Defined lines and a shape that suits you." },
  { name: "The Hair Ritual", category: "CARE & RESTORE", time: "45 min", price: "₹400", image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=900&q=90", desc: "A restorative pause for hair and mind." },
  { name: "Radiance Facial", category: "SKIN & BEAUTY", time: "45 min", price: "₹500", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=90", desc: "A fresh, healthy-looking glow." },
  { name: "Colour Atelier", category: "HAIR & STYLING", time: "60 min", price: "₹700", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=90", desc: "Beautiful dimension and a personal tone." },
  { name: "Smooth Finish", category: "HAIR & STYLING", time: "90 min", price: "₹1,000", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=90", desc: "Sleek, polished hair with lasting finish." },
  { name: "Scalp & Hair Therapy", category: "CARE & RESTORE", time: "60 min", price: "₹800", image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=90", desc: "Care that starts at the roots." }
];

export default function Services() {
  return (
    <section className="gt-services gt-section" id="services">
      <div className="gt-section-topline"><span>02 / THE MENU</span><span>CARE, CURATED FOR YOU</span></div>
      <div className="gt-section-heading gt-heading-split">
        <div><span className="gt-kicker">A MOMENT THAT'S YOURS</span><h2>Consider this<br /><em>your time.</em></h2></div>
        <p>From the everyday essentials to a little well-deserved indulgence. Find the service that feels like you.</p>
      </div>
      <div className="gt-service-grid">
        {services.map((service, index) => (
          <article className="gt-service-card" key={service.name}>
            <a href="/bookservice" className="gt-service-image">
              <img src={service.image} alt={service.name} loading="lazy" />
              <span className="gt-service-number">0{index + 1}</span>
              <span className="gt-service-image-arrow">↗</span>
            </a>
            <div className="gt-service-content">
              <span className="gt-service-category">{service.category}</span>
              <h3>{service.name}</h3>
              <p>{service.desc}</p>
              <div className="gt-service-meta"><span>◷ &nbsp;{service.time}</span><strong>{service.price}</strong></div>
              <a className="gt-service-book" href="/bookservice">Book this service <span>↗</span></a>
            </div>
          </article>
        ))}
      </div>
      <div className="gt-services-bottom">
        <p>Not sure what you need? Let our specialists help you choose.</p>
        <a className="gt-outline-btn" href="/bookservice">View the full service menu <span>↗</span></a>
      </div>
    </section>
  
  );
}
