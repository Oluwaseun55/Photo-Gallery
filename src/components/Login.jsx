import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost/Reactphoto/backend/auth/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: "include", // ✅ Required for PHP sessions
        }
      );

      const contentType = res.headers.get("content-type");

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();

        if (data.success) {
          onLogin(); // Update login state in App.jsx
          navigate("/admin/images");
        } else {
          alert(data.error || "Login failed");
        }
      } else {
        const text = await res.text();
        console.error("Unexpected response (not JSON):", text);
        alert("Server returned an unexpected response. See console.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Unable to login. See console for details.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
