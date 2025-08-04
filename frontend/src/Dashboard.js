import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config';

const Dashboard = ({ name, onLogout }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = () => {
    fetch(`${API_BASE_URL}/api/user`)
      .then(res => res.json())
      .then(data => {
        setUser({ ...data, name: name || data.name });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [name]);

  const updateUserData = (newTotal) => {
    setUser(prev => ({ ...prev, totalDonations: newTotal }));
  };

  const updateGoal = (newGoal) => {
    setUser(prev => ({ ...prev, goal: newGoal }));
  };

  if (loading) return (
    <div className="App">
      <div style={{ 
        marginTop: 100, 
        textAlign: 'center',
        fontSize: '1.2rem',
        color: 'white'
      }}>
        ⏳ Loading your dashboard...
      </div>
    </div>
  );

  const getLevel = (amount) => {
    if (amount >= 2000) return { level: 3, name: 'Fundraising Master', color: '#FFD700' };
    if (amount >= 1000) return { level: 2, name: 'Rising Star', color: '#C0C0C0' };
    if (amount >= 500) return { level: 1, name: 'Contributor', color: '#CD7F32' };
    return { level: 0, name: 'Beginner', color: '#999' };
  };

  const progressPercentage = user.goal ? Math.min((user.totalDonations / user.goal) * 100, 100) : 0;
  const levelInfo = getLevel(user.totalDonations);

  return (
    <div className="App">
      <div className="card animated-card" style={{ 
        maxWidth: 600, 
        margin: '40px auto',
        textAlign: 'left'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.2rem',
            marginBottom: 5
          }}>
            🏠 Dashboard
          </h1>
          <p style={{ color: '#666' }}>Welcome back, {user.name}!</p>
        </div>
        
        {/* Profile & Level Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 15,
          padding: 20,
          color: 'white',
          marginBottom: 25
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
            <h3 style={{ margin: 0, fontSize: '1.3rem' }}>👤 Profile</h3>
            <div style={{ 
              background: 'rgba(255,255,255,0.2)',
              padding: '5px 15px',
              borderRadius: 20,
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Level {levelInfo.level} • {levelInfo.name}
            </div>
          </div>
          <div style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            <div><strong>Name:</strong> {user.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <strong>Referral Code:</strong> 
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '2px 8px', 
                borderRadius: 8,
                fontFamily: 'monospace'
              }}>{user.referralCode}</span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  navigator.clipboard.writeText(user.referralCode);
                  alert('📋 Referral code copied to clipboard!');
                }}
                style={{ 
                background: 'none', 
                border: '1px solid rgba(255,255,255,0.5)',
                color: 'white',
                borderRadius: 5,
                padding: '2px 8px',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}>
                📋 Copy
              </button>
            </div>
            {user.streak && (
              <div><strong>Streak:</strong> 🔥 {user.streak} days</div>
            )}
          </div>
        </div>

        {/* Donations & Goals */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: 15,
          padding: 20,
          color: 'white',
          marginBottom: 25,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, marginBottom: 10 }}>💰 Fundraising Progress</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: 10 }}>
            ${user.totalDonations}
          </div>
          
          {user.goal && (
            <>
              <div style={{ fontSize: '1.2rem', marginBottom: 15 }}>
                Goal: ${user.goal} ({progressPercentage.toFixed(1)}% complete)
              </div>
              
              {/* Progress Bar */}
              <div style={{ 
                background: 'rgba(255,255,255,0.3)',
                borderRadius: 25,
                height: 15,
                marginBottom: 10,
                overflow: 'hidden'
              }}>
                <div style={{ 
                  background: 'linear-gradient(90deg, #4CAF50, #45a049)',
                  height: '100%',
                  width: `${progressPercentage}%`,
                  borderRadius: 25,
                  transition: 'width 0.3s ease'
                }} />
              </div>
              
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>
                ${Math.max(user.goal - user.totalDonations, 0)} remaining
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          padding: 20,
          marginBottom: 25
        }}>
          <h3 style={{ margin: 0, marginBottom: 20, color: '#333', textAlign: 'center' }}>
            ⚡ Quick Actions
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: 15
          }}>
            <button 
              onClick={() => window.openPage && window.openPage('analytics')}
              className="btn-primary"
              style={{ padding: '15px 10px', fontSize: '0.9rem' }}
            >
              📊 Analytics
            </button>
            <button 
              onClick={() => window.openPage && window.openPage('goals')}
              className="btn-primary"
              style={{ padding: '15px 10px', fontSize: '0.9rem' }}
            >
              🎯 Set Goals
            </button>
            <button 
              onClick={() => window.openPage && window.openPage('simulator')}
              className="btn-primary"
              style={{ padding: '15px 10px', fontSize: '0.9rem' }}
            >
              💰 Add Donation
            </button>
          </div>
        </div>

        {/* Achievements Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(76, 172, 254, 0.1), rgba(0, 242, 254, 0.1))',
          borderRadius: 15,
          padding: 20,
          marginBottom: 25
        }}>
          <h3 style={{ 
            margin: 0, 
            marginBottom: 20, 
            color: '#333',
            textAlign: 'center'
          }}>🏆 Achievements</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            {[
              { amount: 500, name: 'Bronze Badge', reward: 'Starter Achievement' },
              { amount: 1000, name: 'Silver Badge', reward: 'Excellent Progress' },
              { amount: 2000, name: 'Gold Badge', reward: 'Fundraising Master' }
            ].map((item, i) => {
              const isUnlocked = user.totalDonations >= item.amount;
              return (
                <div key={i} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: 15,
                  background: isUnlocked ? 'rgba(102, 126, 234, 0.1)' : 'rgba(0,0,0,0.05)',
                  borderRadius: 10,
                  border: isUnlocked ? '2px solid #667eea' : '2px solid #ddd'
                }}>
                  <div style={{ fontSize: '2rem', marginRight: 15 }}>
                    {isUnlocked ? (i === 0 ? '🎉' : i === 1 ? '🏅' : '🥇') : '🔒'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', color: isUnlocked ? '#333' : '#999' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>
                      {item.reward} (Raise ${item.amount})
                    </div>
                  </div>
                  <div style={{ 
                    padding: '4px 12px',
                    borderRadius: 20,
                    background: isUnlocked ? '#4CAF50' : '#ddd',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 'bold'
                  }}>
                    {isUnlocked ? '✅ UNLOCKED' : '🔒 LOCKED'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', gap: 15, justifyContent: 'center' }}>
          <button onClick={onLogout} className="btn-secondary">
            👋 Logout
          </button>
          <button 
            onClick={() => window.openPage && window.openPage('leaderboard')}
            className="btn-secondary"
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
