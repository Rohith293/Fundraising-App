import React, { useState } from 'react';

const GoalSetting = ({ user, onBack, onUpdateGoal }) => {
  const [newGoal, setNewGoal] = useState(user.goal || 2500);
  const [saving, setSaving] = useState(false);

  const handleSaveGoal = async () => {
    setSaving(true);
    try {
      const response = await fetch('http://localhost:5000/api/user/goal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: newGoal })
      });
      
      if (response.ok) {
        onUpdateGoal(newGoal);
        alert('🎯 Goal updated successfully!');
      }
    } catch (error) {
      alert('Failed to update goal. Please try again.');
    }
    setSaving(false);
  };

  const progressPercentage = Math.min((user.totalDonations / newGoal) * 100, 100);
  const remainingAmount = Math.max(newGoal - user.totalDonations, 0);

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
            🎯 Goal Setting
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Set and track your fundraising targets</p>
        </div>

        {/* Current Progress */}
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: 15,
          padding: 25,
          color: 'white',
          marginBottom: 25,
          textAlign: 'center'
        }}>
          <h3 style={{ margin: 0, marginBottom: 15 }}>📊 Current Progress</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: 10 }}>
            ${user.totalDonations} / ${newGoal}
          </div>
          
          {/* Progress Bar */}
          <div style={{ 
            background: 'rgba(255,255,255,0.3)',
            borderRadius: 25,
            height: 20,
            marginBottom: 15,
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
          
          <div style={{ fontSize: '1.2rem' }}>
            {progressPercentage.toFixed(1)}% Complete
          </div>
          {remainingAmount > 0 && (
            <div style={{ fontSize: '1rem', opacity: 0.9 }}>
              ${remainingAmount} remaining to reach goal
            </div>
          )}
        </div>

        {/* Goal Setting Form */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
          borderRadius: 15,
          padding: 25,
          marginBottom: 25
        }}>
          <h3 style={{ margin: 0, marginBottom: 20, color: '#333' }}>🎪 Update Your Goal</h3>
          
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 10, fontWeight: 'bold', color: '#333' }}>
              New Fundraising Goal ($)
            </label>
            <input
              type="number"
              value={newGoal}
              onChange={(e) => setNewGoal(parseInt(e.target.value) || 0)}
              className="input-field"
              min="100"
              max="50000"
              step="100"
              style={{ fontSize: '1.2rem', textAlign: 'center' }}
            />
          </div>

          {/* Quick Goal Buttons */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ marginBottom: 10, color: '#666', fontSize: '0.9rem' }}>Quick Goals:</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {[1000, 2500, 5000, 10000].map(amount => (
                <button
                  key={amount}
                  onClick={() => setNewGoal(amount)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 20,
                    border: newGoal === amount ? '2px solid #667eea' : '2px solid #ddd',
                    background: newGoal === amount ? 'rgba(102, 126, 234, 0.1)' : 'white',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    color: newGoal === amount ? '#667eea' : '#666'
                  }}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSaveGoal}
            disabled={saving || newGoal < 100}
            className="btn-primary"
            style={{ 
              width: '100%',
              opacity: saving || newGoal < 100 ? 0.6 : 1
            }}
          >
            {saving ? '💾 Saving...' : '🚀 Update Goal'}
          </button>
        </div>

        {/* Motivational Section */}
        <div style={{ 
          textAlign: 'center',
          padding: 20,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          borderRadius: 15,
          color: 'white',
          marginBottom: 25
        }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: 10 }}>
            💪 You've Got This!
          </div>
          <div style={{ fontSize: '1rem', opacity: 0.9 }}>
            {progressPercentage >= 100 
              ? "🎉 Congratulations! You've reached your goal!"
              : progressPercentage >= 75
              ? "🔥 Almost there! You're in the home stretch!"
              : progressPercentage >= 50
              ? "⚡ Great progress! Keep up the momentum!"
              : "🌟 Every journey starts with a single step!"
            }
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

export default GoalSetting;
