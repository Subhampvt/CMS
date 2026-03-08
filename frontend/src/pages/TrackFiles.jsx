// src/pages/TrackFiles/TrackFiles.jsx
import React from 'react';
import './TrackFiles.css';

// Reusing your Document Icon
const DocumentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="row-icon" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

// New Info Icon matching your Figma design
const InfoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="info-icon" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

export default function TrackFiles() {
  // MOCK DATA: This simulates what the backend database will eventually send us!
  const mockFiles = [
    { id: 1, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1231', version: 'v4.2.1', status: 'Pending' },
    { id: 2, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS5431', version: 'v4.2.6', status: 'Approved' },
    { id: 3, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1541', version: 'v3.2.1', status: 'Rejected' },
    { id: 4, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1611', version: 'v4.3.2', status: 'Pending' },
    { id: 5, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1431', version: 'v1.2.2', status: 'Approved' },
    { id: 6, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS7731', version: 'v3.2.3', status: 'Rejected' },
    { id: 7, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1661', version: 'v4.2.1', status: 'Approved' },
    { id: 8, name: 'Filename.txt', repo: 'Folder name', ciId: 'IS1235', version: 'v1.2.2', status: 'Rejected' },
  ];

  // Helper function to color code the status text dynamically
  const getStatusClass = (status) => {
    if (status === 'Pending') return 'status-pending';
    if (status === 'Approved') return 'status-approved';
    if (status === 'Rejected') return 'status-rejected';
    return '';
  };

  return (
    <div className="track-files-page">
      <h1 className="page-title">Pushed Status For All Files</h1>

      <div className="table-container">
        {/* Table Header Row */}
        <div className="table-grid table-header">
          <div>File Name</div>
          <div>Repo</div>
          <div></div> {/* Empty column for the info icon space */}
          <div>CI Id</div>
          <div>Version</div>
          <div>Status</div>
        </div>

        {/* Scrollable Table Body */}
        <div className="table-body">
          {mockFiles.map((file) => (
            <div key={file.id} className="table-grid table-row">
              
              <div className="file-name-cell">
                <DocumentIcon />
                <span>{file.name}</span>
              </div>
              
              <div className="repo-cell">{file.repo}</div>
              
              <div><InfoIcon /></div>
              
              <div className="ci-cell">{file.ciId}</div>
              
              <div className="version-cell">{file.version}</div>
              
              <div className={`status-cell ${getStatusClass(file.status)}`}>
                {file.status}
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}