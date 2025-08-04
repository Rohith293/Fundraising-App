const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const { User, Donation, Stats } = require('./models');
const { 
  updatePlatformStats, 
  getLeaderboard, 
  getUserWithStats, 
  addDonation, 
  seedDatabase 
} = require('./dbUtils');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection with fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fundraising-hub';
let mongoConnected = false;

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    mongoConnected = true;
    console.log(`📊 Using MongoDB database: ${MONGODB_URI}`);
    // Seed database with sample data if empty
    await seedDatabase();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    console.log('💡 Running in demo mode with in-memory data');
    mongoConnected = false;
    // Initialize demo data
    initializeDemoData();
  });

// Default user ID for demo (in real app, this would come from authentication)
let defaultUserId = null;

// Demo data for when MongoDB is not available
let demoUser = null;
let demoDonations = [];
let demoStats = null;

// Initialize demo data
function initializeDemoData() {
  demoUser = {
    _id: 'demo-user-123',
    name: 'Alex Johnson',
    referralCode: 'ALEX2024',
    totalRaised: 2850,
    currentGoal: 5000,
    level: 'Rising Star',
    streak: 12,
    donationsCount: 15,
    achievements: [
      { name: 'First 100', type: 'bronze', dateEarned: new Date() },
      { name: 'Rising Star', type: 'silver', dateEarned: new Date() },
      { name: 'Week Warrior', type: 'bronze', dateEarned: new Date() }
    ]
  };

  demoDonations = [
    { amount: 50, date: new Date('2024-01-15'), campaign: 'Education Fund' },
    { amount: 100, date: new Date('2024-01-20'), campaign: 'Healthcare Initiative' },
    { amount: 75, date: new Date('2024-01-25'), campaign: 'Environmental Project' }
  ];

  demoStats = {
    totalRaised: 15420,
    totalDonors: 245,
    activeCampaigns: 8,
    avgDonation: 62.9
  };

  defaultUserId = demoUser._id;
  console.log('✅ Demo data initialized');
}

// Initialize default user
async function initializeDefaultUser() {
  if (!mongoConnected) {
    return demoUser;
  }

  try {
    let user = await User.findOne({ name: 'Alex Johnson' });
    
    if (!user) {
      const referralCode = await User.generateReferralCode();
      user = new User({
        name: 'Alex Johnson',
        referralCode,
        totalRaised: 2850,
        currentGoal: 5000,
        level: 'Rising Star',
        streak: 12,
        donationsCount: 15
      });
      
      // Add achievements after user is created
      user.achievements.push(
        { name: 'First 100', type: 'bronze' },
        { name: 'Rising Star', type: 'silver' },
        { name: 'Week Warrior', type: 'bronze' }
      );
      
      await user.save();
    }
    
    defaultUserId = user._id;
    return user;
  } catch (error) {
    console.error('Error initializing default user:', error);
  }
}

// Routes

// Get user data
app.get('/api/user', async (req, res) => {
  try {
    if (!mongoConnected) {
      // Return demo data
      const response = {
        name: demoUser.name,
        totalDonations: demoUser.totalRaised,
        goal: demoUser.currentGoal,
        level: demoUser.level,
        streak: demoUser.streak,
        achievements: demoUser.achievements,
        referralCode: demoUser.referralCode,
        donationsCount: demoUser.donationsCount
      };
      return res.json(response);
    }

    if (!defaultUserId) {
      await initializeDefaultUser();
    }
    
    const result = await getUserWithStats(defaultUserId);
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const { user } = result;
    
    // Format response to match frontend expectations
    const response = {
      name: user.name,
      referralCode: user.referralCode,
      totalDonations: user.totalRaised, // Keep old field name for compatibility
      totalRaised: user.totalRaised,
      goal: user.currentGoal,
      currentGoal: user.currentGoal,
      level: user.level,
      streak: user.streak,
      donationsCount: user.donationsCount,
      achievements: user.achievements,
      joinDate: user.joinDate
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    if (!mongoConnected) {
      // Return demo leaderboard
      const demoLeaderboard = [
        { name: 'Alex Johnson', totalRaised: 2850, totalDonations: 2850, level: 'Rising Star', achievements: 3, donationsCount: 15 },
        { name: 'Sarah Connor', totalRaised: 3420, totalDonations: 3420, level: 'Champion', achievements: 5, donationsCount: 18 },
        { name: 'Mike Rodriguez', totalRaised: 2100, totalDonations: 2100, level: 'Supporter', achievements: 2, donationsCount: 12 },
        { name: 'Emily Chen', totalRaised: 1850, totalDonations: 1850, level: 'Supporter', achievements: 2, donationsCount: 8 },
        { name: 'David Wilson', totalRaised: 4200, totalDonations: 4200, level: 'Champion', achievements: 6, donationsCount: 22 }
      ].sort((a, b) => b.totalRaised - a.totalRaised);
      
      return res.json(demoLeaderboard);
    }

    const leaderboard = await getLeaderboard(10);
    
    // Format for compatibility with frontend
    const formattedLeaderboard = leaderboard.map(user => ({
      name: user.name,
      totalRaised: user.totalRaised,
      totalDonations: user.totalRaised, // For compatibility
      level: user.level,
      achievements: user.achievements.length,
      donationsCount: user.donationsCount
    }));
    
    res.json(formattedLeaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get platform statistics
app.get('/api/stats', async (req, res) => {
  try {
    if (!mongoConnected) {
      // Return demo stats
      return res.json({
        totalUsers: 245,
        totalRaised: demoStats.totalRaised,
        averagePerUser: demoStats.avgDonation,
        topDonation: 500,
        thisWeek: 1250,
        thisMonth: 4680
      });
    }

    await updatePlatformStats();
    const stats = await Stats.findOne().sort({ lastUpdated: -1 });
    
    if (!stats) {
      // Return default stats if none exist
      return res.json({
        totalUsers: 0,
        totalRaised: 0,
        averagePerUser: 0,
        topDonation: 0,
        thisWeek: 0,
        thisMonth: 0
      });
    }
    
    res.json({
      totalUsers: stats.totalUsers,
      totalRaised: stats.totalRaised,
      averagePerUser: stats.averagePerUser,
      topDonation: stats.topDonation,
      thisWeek: stats.thisWeek,
      thisMonth: stats.thisMonth
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get donation history
app.get('/api/donations/history', async (req, res) => {
  try {
    if (!defaultUserId) {
      await initializeDefaultUser();
    }
    
    const donations = await Donation.find({ userId: defaultUserId })
      .sort({ date: -1 })
      .limit(20)
      .populate('userId', 'name');
    
    // Format for frontend compatibility
    const formattedDonations = donations.map(donation => ({
      id: donation._id,
      date: donation.date.toISOString().split('T')[0],
      amount: donation.amount,
      donor: donation.donor,
      message: donation.message,
      type: donation.type
    }));
    
    res.json(formattedDonations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new donation
app.post('/api/donations/add', async (req, res) => {
  try {
    if (!defaultUserId) {
      await initializeDefaultUser();
    }
    
    const { amount, donor, message } = req.body;
    
    const donationData = {
      amount: amount || Math.floor(Math.random() * 200) + 25,
      donor: donor || 'Anonymous Supporter',
      message: message || '',
      type: 'manual'
    };
    
    const result = await addDonation(defaultUserId, donationData);
    
    res.json({
      success: true,
      donation: {
        id: result.donation._id,
        date: result.donation.date.toISOString().split('T')[0],
        amount: result.donation.amount,
        donor: result.donation.donor,
        message: result.donation.message
      },
      newTotal: result.user.totalRaised,
      newAchievements: result.newAchievements
    });
  } catch (error) {
    console.error('Error adding donation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user goal
app.post('/api/user/goal', async (req, res) => {
  try {
    if (!defaultUserId) {
      await initializeDefaultUser();
    }
    
    const { goal } = req.body;
    
    const user = await User.findByIdAndUpdate(
      defaultUserId,
      { currentGoal: goal },
      { new: true }
    );
    
    res.json({ 
      success: true, 
      newGoal: goal,
      user: {
        name: user.name,
        currentGoal: user.currentGoal,
        totalRaised: user.totalRaised
      }
    });
  } catch (error) {
    console.error('Error updating goal:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Initialize and start server
async function startServer() {
  try {
    await initializeDefaultUser();
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on http://localhost:${PORT}`);
      console.log(`📊 Using MongoDB database: ${MONGODB_URI}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();
