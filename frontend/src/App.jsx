import React, { useState } from 'react';
import Login from './pages/Auth/Login'; 
import Register from './pages/Auth/Register';
import Navbar from './components/Navbar'; 
import Dashboard from './pages/Dashboard';

// 🚀 CORRECTED: Pointing directly to the files in the pages folder
import TrackFiles from './pages/TrackFiles'; 
import Repository from './pages/Repository'; 

function App() {
  const [currentPage, setCurrentPage] = useState('login');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'login':
        return <Login onNavigate={navigateTo} />;
      case 'register':
        return <Register onNavigate={navigateTo} />;
      
      // Group all authenticated routes here
      case 'dashboard':
      case 'repository':
      case 'trackFiles':
      case 'logFiles':
      case 'chefCmbPanel':
      case 'cmbPanel':
        return (
          // RESTORED LAYOUT FIX: Swapped 100vw for 100% and added paddingTop for the fixed navbar
          <div className="main-layout" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', width: '100%', paddingTop: '75px' }}>
            {/* The Navbar stays at the top of the screen */}
            <Navbar currentView={currentPage} onNavigate={navigateTo} />
            
            {/* 🚀 CHANGED: Added the logic to render Repository and TrackFiles */}
            {currentPage === 'dashboard' ? (
               <Dashboard />
            ) : currentPage === 'trackFiles' ? (
               <TrackFiles />
            ) : currentPage === 'repository' ? (
               <Repository />
            ) : (
               <div style={{ padding: '40px', textAlign: 'center' }}>
                 <h2 style={{ color: '#F47920', marginTop: '40px' }}>Configuration Management System</h2>
                 <h1 style={{ color: '#1C6BB0', textTransform: 'capitalize' }}>
                   Secure {currentPage.replace(/([A-Z])/g, ' $1').trim()}
                 </h1>
                 <p>Component under construction. We will build this next!</p>
               </div>
            )}
          </div>
        );
      default:
        return <Login onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;