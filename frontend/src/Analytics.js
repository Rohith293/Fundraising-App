import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config';

const Analytics = ({ onBack }) => {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/stats`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/donations/history`).then(res => res.json())
    ]).then(([statsData, historyData]) => {
      setStats(statsData);
      setHistory(historyData);
      setLoading(false);
    }).catch(error => {
      console.error('Failed to fetch analytics data:', error);
      // Set default data if API fails
      setStats({
        totalUsers: 0,
        totalRaised: 0,
        averagePerUser: 0,
        topDonation: 0,
        thisWeek: 0,
        thisMonth: 0
      });
      setHistory([]);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="App">
      <div style={{ marginTop: 100, textAlign: 'center', fontSize: '1.2rem', color: 'white' }}>
        📊 Loading analytics...
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="card animated-card" style={{ maxWidth: 700, margin: '40px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 5
          }}>
            📊 Analytics Dashboard
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Platform insights and statistics</p>
        </div>

        {/* Stats Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 20,
          marginBottom: 30
        }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: 15,
            padding: 20,
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>👥 Total Users</div>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: 15,
            padding: 20,
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${stats.totalRaised}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>💰 Total Raised</div>
          </div>
          
          <div style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            borderRadius: 15,
            padding: 20,
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>${stats.averagePerUser}</div>
            <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>📈 Avg/User</div>
          </div>
        </div>

        {/* Recent Performance */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          padding: 20,
          marginBottom: 30
        }}>
          <h3 style={{ margin: 0, marginBottom: 15, color: '#333' }}>🚀 Recent Performance</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
                ${stats.thisWeek}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>This Week</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f5576c' }}>
                ${stats.thisMonth}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>This Month</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4facfe' }}>
                ${stats.topDonation}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Top Donation</div>
            </div>
          </div>
        </div>

        {/* Recent Donations */}
        <div style={{ marginBottom: 30 }}>
          <h3 style={{ color: '#333', marginBottom: 20 }}>💝 Recent Donations</h3>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {history.slice(0, 8).map((donation, i) => (
              <div key={i} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 15,
                marginBottom: 10,
                background: 'rgba(255,255,255,0.7)',
                borderRadius: 10,
                border: '1px solid rgba(102, 126, 234, 0.2)'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{donation.donor}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{donation.date}</div>
                </div>
                <div style={{ 
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  color: '#4CAF50'
                }}>
                  +${donation.amount}
                </div>
              </div>
            ))}
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

export default Analytics;
