const { User, Donation, Stats } = require('./models');

// Calculate and update platform statistics
async function updatePlatformStats() {
  try {
    const totalUsers = await User.countDocuments();
    
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalRaised: { $sum: '$amount' },
          totalDonations: { $sum: 1 },
          maxDonation: { $max: '$amount' }
        }
      }
    ]);
    
    const stats = donationStats[0] || { totalRaised: 0, totalDonations: 0, maxDonation: 0 };
    
    // Calculate weekly donations (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyStats = await Donation.aggregate([
      {
        $match: { date: { $gte: weekAgo } }
      },
      {
        $group: {
          _id: null,
          thisWeek: { $sum: '$amount' }
        }
      }
    ]);
    
    // Calculate monthly donations (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    const monthlyStats = await Donation.aggregate([
      {
        $match: { date: { $gte: monthAgo } }
      },
      {
        $group: {
          _id: null,
          thisMonth: { $sum: '$amount' }
        }
      }
    ]);
    
    const averagePerUser = totalUsers > 0 ? Math.round(stats.totalRaised / totalUsers) : 0;
    
    const platformStats = {
      totalUsers,
      totalRaised: stats.totalRaised,
      totalDonations: stats.totalDonations,
      averagePerUser,
      topDonation: stats.maxDonation,
      thisWeek: weeklyStats[0]?.thisWeek || 0,
      thisMonth: monthlyStats[0]?.thisMonth || 0,
      lastUpdated: new Date()
    };
    
    // Update or create stats document
    await Stats.findOneAndUpdate(
      {},
      platformStats,
      { upsert: true, new: true }
    );
    
    return platformStats;
  } catch (error) {
    console.error('Error updating platform stats:', error);
    throw error;
  }
}

// Get leaderboard with aggregated donation data
async function getLeaderboard(limit = 10) {
  try {
    const leaderboard = await User.aggregate([
      {
        $lookup: {
          from: 'donations',
          localField: '_id',
          foreignField: 'userId',
          as: 'donations'
        }
      },
      {
        $addFields: {
          totalRaised: { $sum: '$donations.amount' },
          donationsCount: { $size: '$donations' }
        }
      },
      {
        $sort: { totalRaised: -1 }
      },
      {
        $limit: limit
      },
      {
        $project: {
          name: 1,
          totalRaised: 1,
          donationsCount: 1,
          level: 1,
          achievements: 1,
          joinDate: 1
        }
      }
    ]);
    
    return leaderboard;
  } catch (error) {
    console.error('Error getting leaderboard:', error);
    throw error;
  }
}

// Get user with calculated stats
async function getUserWithStats(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return null;
    
    // Get user's donations
    const donations = await Donation.find({ userId }).sort({ date: -1 });
    
    // Calculate current stats
    const totalRaised = donations.reduce((sum, d) => sum + d.amount, 0);
    const donationsCount = donations.length;
    
    // Update user stats
    user.totalRaised = totalRaised;
    user.donationsCount = donationsCount;
    user.level = user.calculateLevel();
    
    await user.save();
    
    return {
      user,
      donations: donations.slice(0, 10) // Return last 10 donations
    };
  } catch (error) {
    console.error('Error getting user with stats:', error);
    throw error;
  }
}

// Add donation and update user stats
async function addDonation(userId, donationData) {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    
    // Create donation
    const donation = new Donation({
      userId,
      ...donationData
    });
    
    await donation.save();
    
    // Update user stats
    user.totalRaised += donationData.amount;
    user.donationsCount += 1;
    user.updateStreak();
    user.level = user.calculateLevel();
    
    // Check for new achievements
    const newAchievements = user.checkAchievements();
    user.achievements.push(...newAchievements);
    
    await user.save();
    
    // Update platform stats
    await updatePlatformStats();
    
    return {
      donation,
      newAchievements,
      user
    };
  } catch (error) {
    console.error('Error adding donation:', error);
    throw error;
  }
}

// Seed database with sample data (for demo purposes)
async function seedDatabase() {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already has data, skipping seed');
      return;
    }
    
    console.log('Seeding database with sample data...');
    
    // Create sample users
    const sampleUsers = [
      { name: 'Alex Johnson', totalRaised: 2500, donationsCount: 15 },
      { name: 'Sarah Chen', totalRaised: 1800, donationsCount: 12 },
      { name: 'Mike Rodriguez', totalRaised: 3200, donationsCount: 18 },
      { name: 'Emma Davis', totalRaised: 950, donationsCount: 8 },
      { name: 'John Smith', totalRaised: 1200, donationsCount: 10 }
    ];
    
    for (const userData of sampleUsers) {
      const referralCode = await User.generateReferralCode();
      const user = new User({
        ...userData,
        referralCode,
        level: userData.totalRaised >= 1000 ? 'Contributor' : 'Beginner'
      });
      
      await user.save();
      
      // Add sample donations for each user
      const donationCount = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < donationCount; i++) {
        const donation = new Donation({
          userId: user._id,
          amount: Math.floor(Math.random() * 200) + 50,
          donor: `Donor ${i + 1}`,
          type: 'simulated',
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Random date in last 30 days
        });
        
        await donation.save();
      }
    }
    
    await updatePlatformStats();
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

module.exports = {
  updatePlatformStats,
  getLeaderboard,
  getUserWithStats,
  addDonation,
  seedDatabase
};
