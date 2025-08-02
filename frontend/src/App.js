
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import GoalSetting from './GoalSetting';
import DonationSimulator from './DonationSimulator';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  // Make page navigation available globally
  useEffect(() => {
    window.openPage = (pageName) => setPage(pageName);
    window.updateUserData = (newTotal) => {
      setUser(prev => prev ? { ...prev, totalDonations: newTotal } : null);
    };
    window.updateGoal = (newGoal) => {
      setUser(prev => prev ? { ...prev, goal: newGoal } : null);
    };
  }, []);

  // Fetch user data when needed
  useEffect(() => {
    if (page === 'dashboard' || page === 'goals' || page === 'simulator') {
      fetch('http://localhost:5000/api/user')
        .then(res => res.json())
        .then(data => setUser({ ...data, name: name || data.name }));
    }
  }, [page, name]);

  if (page === 'login') {
    return <Login onLogin={n => { setName(n); setPage('dashboard'); }} />;
  }
  
  if (page === 'dashboard') {
    return (
      <>
        <Dashboard 
          name={name} 
          onLogout={() => { setName(''); setPage('login'); }}
        />
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn-secondary" onClick={() => setPage('leaderboard')}>
            🏆 View Leaderboard
          </button>
        </div>
      </>
    );
  }
  
  if (page === 'leaderboard') {
    return <Leaderboard onBack={() => setPage('dashboard')} />;
  }
  
  if (page === 'analytics') {
    return <Analytics onBack={() => setPage('dashboard')} />;
  }
  
  if (page === 'goals') {
    return (
      <GoalSetting 
        user={user}
        onBack={() => setPage('dashboard')}
        onUpdateGoal={(newGoal) => {
          window.updateGoal(newGoal);
          setUser(prev => ({ ...prev, goal: newGoal }));
        }}
      />
    );
  }
  
  if (page === 'simulator') {
    return (
      <DonationSimulator 
        onBack={() => setPage('dashboard')}
        onDonationAdded={(newTotal) => {
          window.updateUserData(newTotal);
          setUser(prev => ({ ...prev, totalDonations: newTotal }));
        }}
      />
    );
  }
  
  return null;
}

export default App;
