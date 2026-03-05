import React, { useState } from 'react';
import isroLogo from '../../assets/logos/isro-logo.png';
import isroBg from '../../assets/logos/isro-bglogo.png'; // 🚀 ADDED: Import the background logo
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

// Custom Select Component
const CustomSelect = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div 
      className="custom-select-wrapper" 
      tabIndex={0} 
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <div 
        className={`custom-select-trigger ${value ? 'has-value' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? options.find(o => o.value === value)?.label : placeholder}</span>
        <svg style={{ flexShrink: 0 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      
      {isOpen && (
        <ul className="custom-select-options">
          <li className="custom-select-option placeholder-option" onClick={() => handleSelect("")}>
            {placeholder}
          </li>
          {options.map((opt) => (
            <li 
              key={opt.value} 
              className="custom-select-option"
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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

  const handleRegister = async (e) => {
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

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        alert("Registration Successful!");
        onNavigate('login'); 
      } else {
        setError(data.detail || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      
      {/* 🚀 ADDED: Watermark Logo and Decorative Squares */}
      <img src={isroBg} alt="" className="auth-bg-watermark" />


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

            {/* Department and Role Row using Custom Dropdowns */}
            <div className="form-row">
                <div className="input-group half-width">
                  <label>Department</label>
                  <CustomSelect 
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Select Dept"
                    options={[
                      { value: 'dept1', label: 'Department 1' },
                      { value: 'dept2', label: 'Department 2' },
                      { value: 'dept3', label: 'Department 3' },
                      { value: 'dept4', label: 'Department 4' },
                      { value: 'dept5', label: 'Department 5' },
                      { value: 'dept6', label: 'Department 6' },
                      { value: 'dept7', label: 'Department 7' },
                      { value: 'dept8', label: 'Department 8' },
                      { value: 'dept9', label: 'Department 9' },
                      { value: 'dept10', label: 'Department 10' },
                    ]}
                  />
                </div>

                <div className="input-group half-width">
                  <label>Role</label>
                  <CustomSelect 
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Select Role"
                    options={[
                      { value: 'user', label: 'User' },
                      { value: 'cmb', label: 'CMB Member' },
                      { value: 'chefcmb', label: 'Chief CMB' }
                    ]}
                  />
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