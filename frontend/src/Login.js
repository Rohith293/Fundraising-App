import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  return (
    <div className="App">
      <div className="card animated-card" style={{ 
        maxWidth: 400, 
        margin: '100px auto',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: 30 }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 10
          }}>
            🎯 Fundraising Hub
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Welcome back! Enter your name to continue</p>
        </div>
        
        <div style={{ marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="input-field"
            style={{ marginBottom: 20 }}
          />
          <button 
            onClick={() => onLogin(name)} 
            className="btn-primary"
            disabled={!name}
            style={{ 
              width: '100%',
              opacity: !name ? 0.6 : 1,
              cursor: !name ? 'not-allowed' : 'pointer'
            }}
          >
            🚀 Let's Go!
          </button>
        </div>
        
        <div style={{ 
          marginTop: 20, 
          padding: 15, 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          fontSize: '0.9rem',
          color: '#666'
        }}>
          💡 No account needed - just enter any name to explore the demo!
        </div>
      </div>
    </div>
  );
};

export default Login;
