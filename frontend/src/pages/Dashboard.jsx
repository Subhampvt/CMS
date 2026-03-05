// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  // Hardcoded stats matching your Figma design for now
  const stats = {
    total: 12,
    pending: '02',
    approved: '08',
    rejected: '02'
  };

  return (
    <div className="dashboard-content">
      
      {/* Top Row: Summary Cards */}
      <div className="summary-row">
        
        <div className="summary-card">
          <div className="card-title">
            <span>Total</span>
            <span>Projects</span>
          </div>
          <div className="card-number">{stats.total}</div>
        </div>
        
        <div className="summary-card">
          <div className="card-title">
            <span>Pending</span>
            <span>Projects</span>
          </div>
          <div className="card-number">{stats.pending}</div>
        </div>

        <div className="summary-card">
          <div className="card-title">
            <span>Approved</span>
            <span>Projects</span>
          </div>
          <div className="card-number">{stats.approved}</div>
        </div>

        <div className="summary-card">
          <div className="card-title">
            <span>Rejected</span>
            <span>Projects</span>
          </div>
          <div className="card-number">{stats.rejected}</div>
        </div>

      </div>

      {/* Placeholders for the bottom section */}
      <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1, border: '2px solid #F47920', borderRadius: '8px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              Recent Files Component goes here
          </div>
          <div style={{ flex: 1, border: '2px solid #F47920', borderRadius: '8px', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
              Overall Projects Status Chart goes here
          </div>
      </div>

    </div>
  );
}