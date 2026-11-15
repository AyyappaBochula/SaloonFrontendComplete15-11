
import React, { useEffect, useState } from "react";

const defaultStyles = [
  { id: 1, name: "Classic Haircut", category: "Haircut", price: 200, duration: 30 },
  { id: 2, name: "Fade Haircut", category: "Haircut", price: 250, duration: 40 },
  { id: 3, name: "Clean Shave", category: "Beard", price: 150, duration: 20 },
  { id: 4, name: "Beard Styling", category: "Beard", price: 100, duration: 20 },
  { id: 5, name: "Classic Facial", category: "Skin Care", price: 300, duration: 40 },
  { id: 6, name: "Gold Facial", category: "Skin Care", price: 350, duration: 45 },
  { id: 7, name: "Classic Hair Spa", category: "Hair Treatment", price: 400, duration: 45 },
  { id: 8, name: "Hair Colouring", category: "Hair Treatment", price: 700, duration: 60 }
];

export default function AdminStyles() {
  const [styles, setStyles] = useState(() => {
    try {
      const saved = localStorage.getItem("goldenTouchAdminServices");
      return saved ? JSON.parse(saved) : defaultStyles;
    } catch {
      return defaultStyles;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Haircut",
    price: "",
    duration: ""
  });

  useEffect(() => {
    localStorage.setItem("goldenTouchAdminServices", JSON.stringify(styles));
  }, [styles]);

  const saveStyle = (e) => {
    e.preventDefault();

    const item = {
      ...form,
      price: Number(form.price),
      duration: Number(form.duration),
      id: editingId || Date.now()
    };

    if (editingId) {
      setStyles((previous) =>
        previous.map((style) => style.id === editingId ? item : style)
      );
    } else {
      setStyles((previous) => [...previous, item]);
    }

    closeForm();
  };

  const editStyle = (style) => {
    setEditingId(style.id);
    setForm({
      name: style.name,
      category: style.category,
      price: String(style.price),
      duration: String(style.duration)
    });
    setShowForm(true);
  };

  const deleteStyle = (id) => {
    if (window.confirm("Delete this service?")) {
      setStyles((previous) => previous.filter((style) => style.id !== id));
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", category: "Haircut", price: "", duration: "" });
  };

  return (
    <div className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">SALON MENU</span>
          <h2>Styles & Services</h2>
          <p>Manage your salon services, prices and durations.</p>
        </div>

        <button className="admin-gold-btn" onClick={() => setShowForm(true)}>
          + Add Service
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-backdrop">
          <form className="admin-modal" onSubmit={saveStyle}>
            <div className="admin-modal-heading">
              <h3>{editingId ? "Edit Service" : "Add New Service"}</h3>
              <button type="button" onClick={closeForm}>×</button>
            </div>

            <label>Service Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Premium Haircut"
            />

            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>Haircut</option>
              <option>Beard</option>
              <option>Skin Care</option>
              <option>Hair Treatment</option>
              <option>Other</option>
            </select>

            <div className="admin-form-row">
              <div>
                <label>Price (₹)</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>

              <div>
                <label>Duration (minutes)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="admin-gold-btn admin-full-btn">
              {editingId ? "Save Changes" : "Add Service"}
            </button>
          </form>
        </div>
      )}

      <div className="admin-styles-grid">
        {styles.map((style) => (
          <div className="admin-style-card" key={style.id}>
            <div className="admin-style-card-top">
              <span className="admin-style-icon">✂</span>
              <span className="admin-style-category">{style.category}</span>
            </div>

            <h3>{style.name}</h3>

            <div className="admin-style-meta">
              <strong>₹{style.price.toLocaleString("en-IN")}</strong>
              <span>◷ {style.duration} min</span>
            </div>

            <div className="admin-style-actions">
              <button onClick={() => editStyle(style)}>Edit</button>
              <button onClick={() => deleteStyle(style.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
