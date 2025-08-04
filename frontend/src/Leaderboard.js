import React, { useEffect, useState } from 'react';

const Leaderboard = ({ onBack }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setData(data.sort((a, b) => b.totalDonations - a.totalDonations));
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="App">
      <div style={{ 
        marginTop: 100, 
        textAlign: 'center',
        fontSize: '1.2rem',
        color: 'white'
      }}>
        📊 Loading leaderboard...
      </div>
    </div>
  );

  const getRankEmoji = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '👤';
    }
  };

  const getRankStyle = (index) => {
    switch(index) {
      case 0: return { background: 'linear-gradient(135deg, #FFD700, #FFA500)', color: 'white' };
      case 1: return { background: 'linear-gradient(135deg, #C0C0C0, #A9A9A9)', color: 'white' };
      case 2: return { background: 'linear-gradient(135deg, #CD7F32, #B8860B)', color: 'white' };
      default: return { background: 'rgba(255,255,255,0.9)', color: '#333' };
    }
  };

  return (
    <div className="App">
      <div className="card animated-card" style={{ 
        maxWidth: 600, 
        margin: '40px auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 5
          }}>
            🏆 Leaderboard
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Top fundraising champions</p>
        </div>
        
        <div style={{ marginBottom: 30 }}>
          {data.map((user, index) => (
            <div key={index} style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '20px',
              marginBottom: 15,
              borderRadius: 15,
              ...getRankStyle(index),
              boxShadow: index < 3 ? '0 8px 25px rgba(0,0,0,0.15)' : '0 4px 15px rgba(0,0,0,0.1)',
              transform: index === 0 ? 'scale(1.02)' : 'scale(1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ 
                fontSize: '2rem', 
                marginRight: 20,
                minWidth: 50,
                textAlign: 'center'
              }}>
                {getRankEmoji(index)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: index === 0 ? '1.3rem' : '1.1rem',
                  fontWeight: 'bold',
                  marginBottom: 5
                }}>
                  {user.name}
                  {index === 0 && <span style={{ marginLeft: 10 }}>👑</span>}
                </div>
                <div style={{ 
                  fontSize: '0.9rem',
                  opacity: 0.8,
                  fontFamily: 'monospace'
                }}>
                  {user.referralCode}
                </div>
              </div>
              
              <div style={{ 
                textAlign: 'right',
                minWidth: 100
              }}>
                <div style={{ 
                  fontSize: index === 0 ? '1.4rem' : '1.2rem',
                  fontWeight: 'bold'
                }}>
                  ${user.totalDonations}
                </div>
                <div style={{ 
                  fontSize: '0.8rem',
                  opacity: 0.8
                }}>
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          padding: 20,
          marginBottom: 20,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '1.1rem', marginBottom: 10 }}>🎯 Keep fundraising to climb the ranks!</div>
          <div style={{ color: '#666', fontSize: '0.9rem' }}>
            Updated in real-time • Share your referral code to boost donations
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} className="btn-primary">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
