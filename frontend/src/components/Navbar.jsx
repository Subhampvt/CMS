import React from 'react';
import isroLogo from './../assets/logos/isro-logo.png'; // Adjust path if needed
import './Navbar.css';

// SVG Logout Icon from your Figma design
const LogoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F47920" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
);

export default function Navbar({ currentView, onNavigate }) {
  // Grab the logged-in user from localStorage (saved during login)
  // If no user is found, provide a fallback to prevent crashes
  const user = JSON.parse(localStorage.getItem("user")) || { 
    name: "Guest", 
    role: "user", 
    trid: "N/A" 
  };

  // Dynamically determine the links based on role
  const getNavLinks = () => {
    const baseLinks = [
      { id: 'repository', label: 'Repository' },
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'trackFiles', label: 'Track Files' },
    ];

    if (user.role === 'admin') {
      baseLinks.push({ id: 'logFiles', label: 'Log Files' });
    } else if (user.role === 'chefcmb') {
      baseLinks.push({ id: 'chefCmbPanel', label: 'Chef CMB Panel' });
    } else if (user.role === 'cmb') {
      baseLinks.push({ id: 'cmbPanel', label: 'CMB Panel' });
    }
    
    return baseLinks;
  };

  const navLinks = getNavLinks();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear session
    onNavigate('login'); // Send back to login screen
  };

  // Format the role for display (e.g., 'chefcmb' -> 'Chef CMB')
  const displayRole = user.role === 'chefcmb' ? 'Chef CMB' : 
                      user.role === 'cmb' ? 'CMB' : 
                      user.role === 'admin' ? 'Admin' : 'User';

  return (
    <div className="navbar-container">
      
      {/* Left: Brand */}
      <div className="navbar-brand">
        <img src={isroLogo} alt="ISRO Logo" className="navbar-logo" />
        <div className="navbar-title">
          <span>Configuration</span>
          <span>Management System</span>
        </div>
      </div>

      {/* Center: Dynamic Links */}
      <div className="navbar-links">
        {navLinks.map((link) => (
          <span 
            key={link.id}
            className={`nav-link ${currentView === link.id ? 'active' : ''}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </span>
        ))}
      </div>

      {/* Right: User Info & Logout */}
      <div className="navbar-profile">
        {user.role === 'admin' ? (
           <div className="profile-info">
             <span>Admin</span>
             <span>Login</span>
           </div>
        ) : (
          <div className="profile-info">
            <span>{displayRole} : {user.name}</span>
            <span>Tr Id : {user.trid}</span>
          </div>
        )}
        
        <button onClick={handleLogout} className="logout-btn" title="Logout">
          <LogoutIcon />
        </button>
      </div>

    </div>
  );
}