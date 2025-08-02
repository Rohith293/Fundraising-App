import React, { useState, useEffect } from 'react';

const DonationSimulator = ({ onBack, onDonationAdded }) => {
  const [amount, setAmount] = useState('');
  const [donor, setDonor] = useState('');
  const [adding, setAdding] = useState(false);
  const [recentDonations, setRecentDonations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/donations/history')
      .then(res => res.json())
      .then(data => setRecentDonations(data.slice(0, 5)));
  }, []);

  const addDonation = async (donationAmount, donationDonor) => {
    setAdding(true);
    try {
      const response = await fetch('http://localhost:5000/api/donations/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: donationAmount, 
          donor: donationDonor || 'Anonymous Supporter' 
        })
      });
      
      const result = await response.json();
      if (result.success) {
        onDonationAdded(result.newTotal);
        setAmount('');
        setDonor('');
        
        // Refresh recent donations
        fetch('http://localhost:5000/api/donations/history')
          .then(res => res.json())
          .then(data => setRecentDonations(data.slice(0, 5)));
          
        alert(`🎉 Donation of $${result.donation.amount} added successfully!`);
      }
    } catch (error) {
      alert('Failed to add donation. Please try again.');
    }
    setAdding(false);
  };

  const quickAmounts = [25, 50, 100, 250, 500];

  return (
    <div className="App">
      <div className="card animated-card" style={{ maxWidth: 500, margin: '40px auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <h1 style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '2.5rem',
            marginBottom: 5
          }}>
            💰 Donation Simulator
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Add donations to test your progress</p>
        </div>

        {/* Manual Donation Form */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          padding: 25,
          marginBottom: 25
        }}>
          <h3 style={{ margin: 0, marginBottom: 20, color: '#333' }}>✋ Manual Donation</h3>
          
          <div style={{ marginBottom: 15 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold', color: '#333' }}>
              💵 Donation Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="Enter amount..."
              min="1"
              max="10000"
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold', color: '#333' }}>
              👤 Donor Name (Optional)
            </label>
            <input
              type="text"
              value={donor}
              onChange={(e) => setDonor(e.target.value)}
              className="input-field"
              placeholder="Anonymous Supporter"
              maxLength="50"
            />
          </div>

          <button 
            onClick={() => addDonation(parseInt(amount), donor)}
            disabled={adding || !amount || amount <= 0}
            className="btn-primary"
            style={{ 
              width: '100%',
              opacity: adding || !amount || amount <= 0 ? 0.6 : 1
            }}
          >
            {adding ? '💫 Adding Donation...' : '🎁 Add Donation'}
          </button>
        </div>

        {/* Quick Donations */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: 15,
          padding: 25,
          color: 'white',
          marginBottom: 25
        }}>
          <h3 style={{ margin: 0, marginBottom: 20 }}>⚡ Quick Donations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: 10 }}>
            {quickAmounts.map(amt => (
              <button
                key={amt}
                onClick={() => addDonation(amt, 'Quick Donor')}
                disabled={adding}
                style={{
                  padding: '12px 8px',
                  borderRadius: 12,
                  border: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: adding ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  opacity: adding ? 0.6 : 1
                }}
                onMouseOver={(e) => !adding && (e.target.style.background = 'rgba(255,255,255,0.3)')}
                onMouseOut={(e) => !adding && (e.target.style.background = 'rgba(255,255,255,0.2)')}
              >
                ${amt}
              </button>
            ))}
          </div>
        </div>

        {/* Random Donation Generator */}
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          borderRadius: 15,
          padding: 25,
          color: 'white',
          marginBottom: 25,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, marginBottom: 15 }}>🎲 Random Donation</h3>
          <button
            onClick={() => addDonation(null, null)} // Backend will generate random amount
            disabled={adding}
            style={{
              padding: '15px 30px',
              borderRadius: 25,
              border: 'none',
              background: 'rgba(255,255,255,0.2)',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: adding ? 'not-allowed' : 'pointer',
              opacity: adding ? 0.6 : 1
            }}
          >
            🎰 Generate Random Donation
          </button>
          <div style={{ fontSize: '0.9rem', marginTop: 10, opacity: 0.9 }}>
            Adds a random amount between $25-$225
          </div>
        </div>

        {/* Recent Donations Preview */}
        <div style={{ marginBottom: 25 }}>
          <h3 style={{ color: '#333', marginBottom: 15 }}>📋 Recent Donations</h3>
          <div style={{ maxHeight: 200, overflowY: 'auto' }}>
            {recentDonations.map((donation, i) => (
              <div key={i} style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 12,
                marginBottom: 8,
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 8,
                fontSize: '0.9rem'
              }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{donation.donor}</div>
                  <div style={{ color: '#666', fontSize: '0.8rem' }}>{donation.date}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>
                  +${donation.amount}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={onBack} className="btn-secondary">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationSimulator;
