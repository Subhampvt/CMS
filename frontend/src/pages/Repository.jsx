// src/pages/Repository/Repository.jsx
import React from 'react';
import './Repository.css';

// SVG Folder Icon from Figma
const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" className="folder-icon">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
  </svg>
);

export default function Repository() {
  // Mock Data for the 3 columns
  const projects = [
    "Rover Mission", "Space Orbit Mission", "Chandrayaan-1", 
    "Chandrayaan-2", "Chandrayaan-3", "Mars Orbiter Mission", 
    "Aditya-L1 Mission", "AstroSat Mission", "LVM3 Mission", 
    "PSLV Mission", "GSLV Mission"
  ];

  const multiMissions = [
    "IRNSS-1A", "IRNSS-1B", "IRNSS-1C", "Cartosat-1", 
    "Resourcesat-1", "Resourcesat-2", "Resourcesat-2A", 
    "GSAT-6", "GSAT-7", "GSAT-10", "GSAT-12"
  ];

  const missions = [
    "Gaganyaan", "RISAT-1", "RISAT-2", "Aditya-L1", 
    "IRNSS-1D", "IRNSS-1E", "IRNSS-1F", "AstroSat", 
    "GSAT-30", "GSAT-29", "GSAT-26"
  ];

  return (
    <div className="repository-page">
      <h1 className="page-title">All Projects</h1>

      <div className="columns-container">
        
        {/* Column 1: Projects */}
        <div className="repo-column">
          <h2 className="column-header">Projects</h2>
          <div className="folder-list">
            {projects.map((item, index) => (
              <div key={`proj-${index}`} className="folder-item">
                <span className="folder-name">{item}</span>
                <FolderIcon />
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Multi Mission */}
        <div className="repo-column">
          <h2 className="column-header">Multi Mission</h2>
          <div className="folder-list">
            {multiMissions.map((item, index) => (
              <div key={`multi-${index}`} className="folder-item">
                <span className="folder-name">{item}</span>
                <FolderIcon />
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Mission */}
        <div className="repo-column">
          <h2 className="column-header">Mission</h2>
          <div className="folder-list">
            {missions.map((item, index) => (
              <div key={`miss-${index}`} className="folder-item">
                <span className="folder-name">{item}</span>
                <FolderIcon />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}