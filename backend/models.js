const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: false,
    unique: true,
    sparse: true // Allows multiple null values
  },
  referralCode: {
    type: String,
    required: true,
    unique: true
  },
  totalRaised: {
    type: Number,
    default: 0
  },
  donationsCount: {
    type: Number,
    default: 0
  },
  currentGoal: {
    type: Number,
    default: 1000
  },
  level: {
    type: String,
    default: 'Beginner'
  },
  streak: {
    type: Number,
    default: 0
  },
  lastDonationDate: {
    type: Date,
    default: null
  },
  achievements: [{
    name: String,
    type: String,
    earned: {
      type: Date,
      default: Date.now
    }
  }],
  joinDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Donation Schema
const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 1
  },
  donor: {
    type: String,
    required: true,
    trim: true
  },
  donorEmail: {
    type: String,
    required: false
  },
  message: {
    type: String,
    required: false,
    maxLength: 500
  },
  date: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    enum: ['manual', 'simulated', 'real'],
    default: 'manual'
  }
}, {
  timestamps: true
});

// Platform Stats Schema (for caching aggregated data)
const statsSchema = new mongoose.Schema({
  totalUsers: {
    type: Number,
    default: 0
  },
  totalRaised: {
    type: Number,
    default: 0
  },
  totalDonations: {
    type: Number,
    default: 0
  },
  averagePerUser: {
    type: Number,
    default: 0
  },
  topDonation: {
    type: Number,
    default: 0
  },
  thisWeek: {
    type: Number,
    default: 0
  },
  thisMonth: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Helper methods for User schema
userSchema.methods.calculateLevel = function() {
  if (this.totalRaised >= 10000) return 'Master';
  if (this.totalRaised >= 5000) return 'Rising Star';
  if (this.totalRaised >= 1000) return 'Contributor';
  return 'Beginner';
};

userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastDonation = this.lastDonationDate;
  
  if (!lastDonation) {
    this.streak = 1;
  } else {
    const daysDiff = Math.floor((today - lastDonation) / (1000 * 60 * 60 * 24));
    if (daysDiff === 1) {
      this.streak += 1;
    } else if (daysDiff > 1) {
      this.streak = 1;
    }
    // If daysDiff === 0, keep current streak (same day)
  }
  
  this.lastDonationDate = today;
};

userSchema.methods.checkAchievements = function() {
  const achievements = [];
  
  // Amount-based achievements
  if (this.totalRaised >= 500 && !this.achievements.some(a => a.name === 'First 500')) {
    achievements.push({ name: 'First 500', type: 'bronze' });
  }
  if (this.totalRaised >= 1000 && !this.achievements.some(a => a.name === 'Rising Star')) {
    achievements.push({ name: 'Rising Star', type: 'silver' });
  }
  if (this.totalRaised >= 5000 && !this.achievements.some(a => a.name === 'Champion')) {
    achievements.push({ name: 'Champion', type: 'gold' });
  }
  
  // Streak-based achievements
  if (this.streak >= 7 && !this.achievements.some(a => a.name === 'Week Warrior')) {
    achievements.push({ name: 'Week Warrior', type: 'silver' });
  }
  
  // Count-based achievements
  if (this.donationsCount >= 10 && !this.achievements.some(a => a.name === 'Consistent Giver')) {
    achievements.push({ name: 'Consistent Giver', type: 'bronze' });
  }
  
  return achievements;
};

// Static method to generate unique referral code
userSchema.statics.generateReferralCode = async function() {
  let code;
  let exists = true;
  
  while (exists) {
    code = Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = await this.findOne({ referralCode: code });
    exists = !!user;
  }
  
  return code;
};

// Create models
const User = mongoose.model('User', userSchema);
const Donation = mongoose.model('Donation', donationSchema);
const Stats = mongoose.model('Stats', statsSchema);

module.exports = {
  User,
  Donation,
  Stats
};
