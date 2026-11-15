
import React, { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = onLogin(username, password);

    if (!success) {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-crown">♛</div>
          <h1>GOLDEN TOUCH</h1>
          <span>ADMINISTRATION PORTAL</span>
        </div>

        <div className="admin-login-heading">
          <span>ADMINISTRATION PORTAL</span>
          <h2>Welcome Back</h2>
          <p>Sign in to manage your salon.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="admin-username">USERNAME</label>
          <input
            id="admin-username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />

          <label htmlFor="admin-password">PASSWORD</label>
          <div className="admin-password-field">
            <input id="admin-password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-pressed={showPassword}>{showPassword ? "Hide" : "Show"}</button>
          </div>

          {error && <p className="admin-login-error">{error}</p>}

          <button type="submit" className="admin-login-submit">
            LOGIN TO DASHBOARD →
          </button>
        </form>

        <div className="admin-demo-details">
          <span>DEMO LOGIN DETAILS</span>
          <p>Username: <strong>admin</strong></p>
          <p>Password: <strong>admin123</strong></p>
        </div>

        <p className="admin-login-footer">
          GOLDEN TOUCH · ADMIN PANEL
        </p>
      </div>
    </div>
  );
}
