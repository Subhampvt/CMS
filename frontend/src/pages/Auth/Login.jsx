import React, { useState } from 'react';
import isroLogo from '../../assets/logos/isro-logo.png';
import isroBg from '../../assets/logos/isro-bglogo.png';
import './Auth.css';

// SVG Icons for password toggle
const EyeOffIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
    stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export default function Login({ onNavigate }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword]     = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    
    try {
      // 🚀 REAL API CALL to your Python Backend
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trid: identifier, // Backend uses 'trid' for both ID and Email check
          password: password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        // Store user info in browser so Dashboard knows who logged in
        localStorage.setItem("user", JSON.stringify(data.user)); 
        
        // Move to dashboard
        onNavigate('dashboard'); 
      } else {
        setError(data.detail || "Invalid TR ID/Email or Password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">

      {/* 🚀 FIXED: Full page background watermark logo */}
      <img src={isroBg} alt="" className="auth-bg-watermark" />

      {/* Decorative blue squares - matching Figma */}
      <div className="decor-square sq-1" />
      <div className="decor-square sq-2" />
      <div className="decor-square sq-3" />
      <div className="decor-square sq-4" />

      {/* Login Card */}
      <div className="auth-card">

        {/* ISRO Logo - large */}
        <div className="auth-header">
          <img src={isroLogo} alt="ISRO" className="auth-logo" />
        </div>

        {/* Titles */}
        <h2 className="system-title">Configuration Management System</h2>
        <h1 className="secure-title">Secure Login</h1>

        <form onSubmit={handleLogin} className="auth-form" noValidate>

          <div className="input-group">
            <label>Enter Your Email Id or Tr Id</label>
            <input
              type="text"
              placeholder="Enter email or Tr id here"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="auth-input"
              autoComplete="username"
            />
          </div>

          <div className="input-group">
             <label style={{ marginTop: 22 }}>Enter Your Password</label>
             <div className="password-wrapper">
               <input
                 type={showPwd ? "text" : "password"}
                 placeholder="Enter the password here"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="auth-input pw-input"
                 autoComplete="current-password"
               />
               <button
                 type="button"
                 onClick={() => setShowPwd((v) => !v)}
                 className="eye-icon-btn"
                 aria-label={showPwd ? "Hide password" : "Show password"}
               >
                 {showPwd ? <EyeIcon /> : <EyeOffIcon />}
               </button>
             </div>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.8 : 1 }}
          >
            {loading ? "Logging in…" : "Login Now"}
          </button>
        </form>

        <p className="register-link">
          New user?{" "}
          <span onClick={() => onNavigate('register')}>Register here</span>
        </p>
        <p className="timeout-warning">
          Session auto-expires after 15 minutes of inactivity
        </p>
      </div>
    </div>
  );
}