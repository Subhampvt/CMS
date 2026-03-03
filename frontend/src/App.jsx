import React, { useState } from 'react';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  // This state controls which authentication page is currently visible
  const [currentView, setCurrentView] = useState('login');

  return (
    <div>
      {currentView === 'login' ? (
        <Login onNavigate={setCurrentView} />
      ) : (
        <Register onNavigate={setCurrentView} />
      )}
    </div>
  );
}

export default App;