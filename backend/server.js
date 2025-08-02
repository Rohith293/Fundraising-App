const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dummy user data
const user = {
  name: 'Jane Doe',
  referralCode: 'janedoe2025',
  totalDonations: 1234,
  goal: 2500,
  level: 2,
  streak: 7,
  joinDate: '2025-01-15',
  achievements: ['first_donation', 'bronze_badge', 'week_streak']
};

// Dummy leaderboard data
const leaderboard = [
  { name: 'Jane Doe', referralCode: 'janedoe2025', totalDonations: 1234, level: 2 },
  { name: 'John Smith', referralCode: 'johnsmith2025', totalDonations: 1100, level: 2 },
  { name: 'Alice Lee', referralCode: 'alicelee2025', totalDonations: 950, level: 1 },
  { name: 'Bob Wilson', referralCode: 'bobwilson2025', totalDonations: 850, level: 1 },
  { name: 'Emma Davis', referralCode: 'emmadavis2025', totalDonations: 720, level: 1 }
];

// Dummy donation history
const donationHistory = [
  { date: '2025-08-01', amount: 150, donor: 'Anonymous' },
  { date: '2025-07-30', amount: 200, donor: 'Mark T.' },
  { date: '2025-07-28', amount: 75, donor: 'Sarah K.' },
  { date: '2025-07-25', amount: 300, donor: 'Corporate Sponsor' },
  { date: '2025-07-20', amount: 100, donor: 'Family Friend' },
  { date: '2025-07-18', amount: 50, donor: 'Anonymous' },
  { date: '2025-07-15', amount: 125, donor: 'College Alumni' }
];

// Statistics data
const stats = {
  totalUsers: 1247,
  totalRaised: 45780,
  averagePerUser: 367,
  topDonation: 500,
  thisWeek: 2340,
  thisMonth: 8950
};

app.get('/api/user', (req, res) => {
  res.json(user);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

app.get('/api/stats', (req, res) => {
  res.json(stats);
});

app.get('/api/donations/history', (req, res) => {
  res.json(donationHistory);
});

// Simulate adding a donation
app.post('/api/donations/add', (req, res) => {
  const { amount, donor } = req.body;
  const newDonation = {
    date: new Date().toISOString().split('T')[0],
    amount: amount || Math.floor(Math.random() * 200) + 25,
    donor: donor || 'Anonymous Supporter'
  };
  
  donationHistory.unshift(newDonation);
  user.totalDonations += newDonation.amount;
  stats.totalRaised += newDonation.amount;
  
  res.json({ success: true, donation: newDonation, newTotal: user.totalDonations });
});

// Update user goal
app.post('/api/user/goal', (req, res) => {
  const { goal } = req.body;
  user.goal = goal;
  res.json({ success: true, newGoal: goal });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
