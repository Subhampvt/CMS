import React, { useState } from 'react';
// Updated paths to match your actual folder structure
import Login from './pages/Auth/Login'; 
import Register from './pages/Auth/Register';
// 🚀 ADDED: Import the Navbar component
import Navbar from './components/Navbar'; 

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
      
      // 🚀 ADDED: Group all authenticated routes here
      case 'dashboard':
      case 'repository':
      case 'trackFiles':
      case 'logFiles':
      case 'chefCmbPanel':
      case 'cmbPanel':
        return (
          <div className="main-layout" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', width: '100vw' }}>
            {/* The Navbar stays at the top of the screen */}
            <Navbar currentView={currentPage} onNavigate={navigateTo} />
            
            {/* Main Page Content goes here */}
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2 style={{ color: '#F47920', marginTop: '40px' }}>Configuration Management System</h2>
              <h1 style={{ color: '#1C6BB0', textTransform: 'capitalize' }}>
                Secure {currentPage.replace(/([A-Z])/g, ' $1').trim()}
              </h1>
              <p>You have successfully authenticated.</p>
            </div>
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