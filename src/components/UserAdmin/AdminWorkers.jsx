
import React, { useEffect, useState } from "react";

const initialWorkers = [
  { id: 1, name: "Rahul Sharma", role: "Senior Hairstylist", phone: "9876543210", status: "Active" },
  { id: 2, name: "Arjun Kumar", role: "Beard Specialist", phone: "9876543211", status: "Active" },
  { id: 3, name: "Priya Reddy", role: "Skin Care Expert", phone: "9876543212", status: "Active" }
];

export default function AdminWorkers() {
  const [workers, setWorkers] = useState(() => {
    try {
      const saved = localStorage.getItem("goldenTouchWorkers");
      return saved ? JSON.parse(saved) : initialWorkers;
    } catch {
      return initialWorkers;
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", phone: "" });

  useEffect(() => {
    localStorage.setItem("goldenTouchWorkers", JSON.stringify(workers));
  }, [workers]);

  const addWorker = (e) => {
    e.preventDefault();

    setWorkers((previous) => [
      ...previous,
      { ...form, id: Date.now(), status: "Active" }
    ]);

    setForm({ name: "", role: "", phone: "" });
    setShowForm(false);
  };

  const toggleStatus = (id) => {
    setWorkers((previous) =>
      previous.map((worker) =>
        worker.id === id
          ? { ...worker, status: worker.status === "Active" ? "Inactive" : "Active" }
          : worker
      )
    );
  };

  const deleteWorker = (id) => {
    if (window.confirm("Remove this worker?")) {
      setWorkers((previous) => previous.filter((worker) => worker.id !== id));
    }
  };

  return (
    <div className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-eyebrow">TEAM MANAGEMENT</span>
          <h2>Our Workers</h2>
          <p>Manage salon staff and their availability.</p>
        </div>

        <button className="admin-gold-btn" onClick={() => setShowForm(true)}>
          + Add Worker
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-backdrop">
          <form className="admin-modal" onSubmit={addWorker}>
            <div className="admin-modal-heading">
              <h3>Add New Worker</h3>
              <button type="button" onClick={() => setShowForm(false)}>×</button>
            </div>

            <label>Full Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Worker name"
            />

            <label>Role</label>
            <input
              required
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Hair Stylist"
            />

            <label>Mobile Number</label>
            <input
              required
              type="tel"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
              }
              placeholder="10-digit mobile number"
            />

            <button className="admin-gold-btn admin-full-btn" type="submit">
              Save Worker
            </button>
          </form>
        </div>
      )}

      <div className="admin-workers-grid">
        {workers.map((worker) => (
          <div className="admin-worker-card" key={worker.id}>
            <div className="admin-worker-avatar">
              {worker.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
            </div>

            <h3>{worker.name}</h3>
            <p>{worker.role}</p>
            <span>{worker.phone}</span>

            <div className="admin-worker-actions">
              <button onClick={() => toggleStatus(worker.id)}>
                {worker.status}
              </button>
              <button onClick={() => deleteWorker(worker.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
