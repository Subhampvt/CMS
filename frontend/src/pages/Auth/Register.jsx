import React, { useState } from 'react';
import isroLogo from '../../assets/logos/isro-logo.png';
import './Auth.css';

// SVG Icons for password toggle
const EyeOffIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export default function Register({ onNavigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    trid: '',
    department: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.trid || !formData.department || !formData.role || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log("Registering new user:", formData);
      // Future connection to Primary API Check
    }, 1500);
  };

  return (
    <div className="auth-wrapper">

      <div className="auth-card-wide">

        {/* Left Side: Logo and Branding */}
        <div className="auth-brand-side">
            <div className="auth-brand-content">
                <img src={isroLogo} alt="ISRO Logo" className="auth-logo-large" />
                <h2 className="system-title">Configuration Management System</h2>
                <h1 className="secure-title">Secure Register</h1>
                <p className="register-link-below">
                  Already have an account?{" "}
                  <span onClick={() => onNavigate('login')}>Log in</span>
                </p>
            </div>

             {/* Diagonal divider element */}
            <div className="divider-element"></div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <form onSubmit={handleRegister} className="auth-form" noValidate>

            <div className="input-group">
              <label>Enter Your Full Name</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter the full name here"
                onChange={handleChange}
                className="auth-input-small"
              />
            </div>

            <div className="input-group">
              <label>Enter Your Email Id</label>
              <input
                name="email"
                type="email"
                placeholder="Enter the email here"
                onChange={handleChange}
                className="auth-input-small"
              />
            </div>

            <div className="input-group">
              <label>Enter Your TR Id or Employee Id</label>
              <input
                name="trid"
                type="text"
                placeholder="Enter the TR Id here"
                onChange={handleChange}
                className="auth-input-small"
              />
            </div>

            {/* Department and Role Row */}
            <div className="form-row">
                <div className="input-group half-width">
                  <label>Department</label>
                  <select name="department" onChange={handleChange} className="auth-input-small select-input">
                    <option value="">Select Dept</option>
                    <option value="dept1">Department 1</option>
                    <option value="dept2">Department 2</option>
                  </select>
                </div>

                <div className="input-group half-width">
                  <label>Role</label>
                  <select name="role" onChange={handleChange} className="auth-input-small select-input">
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="cmb">CMB Member</option>
                  </select>
                </div>
            </div>

            <div className="input-group">
              <label>Create Password</label>
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter the New Password here"
                  onChange={handleChange}
                  className="auth-input-small pw-input"
                  autoComplete="new-password"
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

            <div className="input-group" style={{marginTop: '-6px'}}>
              <div className="password-wrapper">
                <input
                  name="confirmPassword"
                  type={showConfirmPwd ? "text" : "password"}
                  placeholder="Enter the Confirm Password here"
                  onChange={handleChange}
                  className="auth-input-small pw-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((v) => !v)}
                  className="eye-icon-btn"
                  aria-label={showConfirmPwd ? "Hide password" : "Show password"}
                >
                  {showConfirmPwd ? <EyeIcon /> : <EyeOffIcon />}
                </button>
              </div>
            </div>

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="login-btn mt-auto"
              disabled={loading}
              style={{ opacity: loading ? 0.8 : 1 }}
            >
              {loading ? "Registering…" : "Register"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}