// src/pages/Dashboard/Dashboard.jsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Dashboard.css';

// SVG Document Icon
const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="file-icon" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

export default function Dashboard() {
  // Hardcoded stats
  const stats = {
    total: 12,
    pending: '02',
    approved: '08',
    rejected: '02'
  };

  // Hardcoded file list
  const recentFiles = [
    "Sensorcode.py",
    "Sysrover.py",
    "Rovercode.py",
    "Sensoaff.py",
    "gossa.py",
    "ssateam.py",
    "Sedsdde.py"
  ];

  // Data for the Pie Chart matching your colors
  const chartData = [
    { name: 'Pending', value: 2, color: '#FF9E5E' },   // Medium Peach/Orange
    { name: 'Approved', value: 8, color: '#FFDDBB' },  // Lightest Peach
    { name: 'Rejected', value: 2, color: '#F47920' },  // Dark ISRO Orange
  ];

  return (
    <div className="dashboard-content">
      
      {/* Top Row: Summary Cards */}
      <div className="summary-row">
        <div className="summary-card">
          <div className="card-title"><span>Total</span><span>Projects</span></div>
          <div className="card-number">{stats.total}</div>
        </div>
        <div className="summary-card">
          <div className="card-title"><span>Pending</span><span>Projects</span></div>
          <div className="card-number">{stats.pending}</div>
        </div>
        <div className="summary-card">
          <div className="card-title"><span>Approved</span><span>Projects</span></div>
          <div className="card-number">{stats.approved}</div>
        </div>
        <div className="summary-card">
          <div className="card-title"><span>Rejected</span><span>Projects</span></div>
          <div className="card-number">{stats.rejected}</div>
        </div>
      </div>

      {/* Bottom Row: Recent Files & Status Chart */}
      <div className="dashboard-bottom-row">
          
          {/* LEFT SIDE: Recent Files */}
          <div className="content-card">
            <h2 className="card-heading recent-files-heading">Recent Files</h2>
            <div className="files-list">
              {recentFiles.map((fileName, index) => (
                <div key={index} className="file-item">
                  <span>{fileName}</span>
                  <DocumentIcon />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Pie Chart */}
          <div className="content-card">
            <h2 className="card-heading">Overall Projects Status</h2>
            
            {/* Custom Legend to match Figma */}
            <div className="chart-legend">
              {chartData.map((entry, index) => (
                <div key={`legend-${index}`} className="legend-item">
                  <div className="legend-box" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>

            {/* Flex layout to scale dynamically */}
            <div style={{ width: '100%', flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={140} /* 🚀 Slightly larger to fill space */
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={4} /* 🚀 Increased to match Figma's thick slice lines */
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

      </div>

    </div>
  );
}