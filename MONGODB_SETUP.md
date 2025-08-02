# 🍃 MongoDB Setup Guide

Your fundraising platform now uses MongoDB for persistent data storage! Here's how to set it up and use it.

## 🚀 Quick Start Options

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition**
   - Windows: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - Or use Chocolatey: `choco install mongodb`
   - Or use Scoop: `scoop install mongodb`

2. **Start MongoDB Service**
   ```powershell
   # Method 1: Start as Windows Service (if installed as service)
   net start MongoDB
   
   # Method 2: Start manually
   mongod --dbpath "C:\data\db"
   ```

3. **Verify MongoDB is Running**
   ```powershell
   # Connect to MongoDB shell
   mongosh
   # Or older versions:
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose free tier (M0)
3. **Get Connection String**: 
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

4. **Update Environment Variables**:
   ```bash
   # Create .env file in backend folder
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fundraising-hub
   ```

## 🛠️ Database Features

### 📊 **Data Models**

1. **Users Collection**
   ```javascript
   {
     name: "Alex Johnson",
     email: "alex@example.com",
     referralCode: "AJ2024",
     totalRaised: 2850,
     donationsCount: 15,
     currentGoal: 5000,
     level: "Rising Star",
     streak: 12,
     achievements: [
       { name: "First 500", type: "bronze", earned: "2024-01-15" }
     ],
     joinDate: "2024-01-01"
   }
   ```

2. **Donations Collection**
   ```javascript
   {
     userId: ObjectId("..."),
     amount: 150,
     donor: "John Doe",
     donorEmail: "john@example.com",
     message: "Great cause!",
     date: "2024-01-20",
     type: "manual" // manual, simulated, real
   }
   ```

3. **Stats Collection** (Cached aggregated data)
   ```javascript
   {
     totalUsers: 1247,
     totalRaised: 45780,
     averagePerUser: 367,
     topDonation: 500,
     thisWeek: 2340,
     thisMonth: 8950,
     lastUpdated: "2024-01-20"
   }
   ```

### 🎯 **Smart Features**

- **Auto-Level Calculation**: Users automatically level up based on total raised
- **Achievement System**: Badges earned for milestones and streaks
- **Streak Tracking**: Daily donation streaks with automatic updates
- **Real-time Stats**: Platform statistics update with each donation
- **Leaderboard**: Dynamic rankings based on total raised
- **Data Validation**: Mongoose schemas ensure data integrity

## 🚀 Running the Application

1. **Start MongoDB** (if using local installation)
   ```powershell
   mongod
   ```

2. **Start Backend Server**
   ```powershell
   cd backend
   npm start
   ```
   
   You should see:
   ```
   ✅ Connected to MongoDB
   Database seeded successfully!
   🚀 Backend running on http://localhost:5000
   📊 Using MongoDB database: mongodb://localhost:27017/fundraising-hub
   ```

3. **Start Frontend**
   ```powershell
   cd frontend
   npm start
   ```

## 🔧 Environment Configuration

Create a `.env` file in the `backend` folder:

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/fundraising-hub

# Or MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fundraising-hub

# Server Port
PORT=5000
```

## 📡 API Endpoints (MongoDB-Powered)

All endpoints now use real database operations:

- `GET /api/user` - Get user profile with real-time stats
- `GET /api/leaderboard` - Dynamic leaderboard from aggregated data
- `GET /api/stats` - Platform statistics with caching
- `GET /api/donations/history` - User's donation history
- `POST /api/donations/add` - Add donation with auto-level updates
- `POST /api/user/goal` - Update fundraising goal

## 🛠️ Database Operations

### Manual Database Management

```javascript
// Connect to MongoDB shell
mongosh

// Switch to your database
use fundraising-hub

// View collections
show collections

// Find all users
db.users.find().pretty()

// Find donations for a specific user
db.donations.find({userId: ObjectId("...")}).pretty()

// Get platform stats
db.stats.find().pretty()

// Clear all data (reset)
db.users.deleteMany({})
db.donations.deleteMany({})
db.stats.deleteMany({})
```

### Sample Data

The application automatically seeds sample data on first run:
- 5 sample users with different levels
- Random donations for each user
- Calculated platform statistics
- Achievement badges and streaks

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```
   ❌ MongoDB connection error: MongoNetworkError
   ```
   **Solution**: Make sure MongoDB is running locally or check your Atlas connection string

2. **Database Permission Error**
   ```
   MongoServerError: Authentication failed
   ```
   **Solution**: Check your username/password in the connection string

3. **Port Already in Use**
   ```
   Error: listen EADDRINUSE :::27017
   ```
   **Solution**: MongoDB is already running, or change the port

### Useful Commands

```powershell
# Check if MongoDB process is running
tasklist | findstr mongod

# Kill MongoDB process if needed
taskkill /f /im mongod.exe

# Start MongoDB with specific data directory
mongod --dbpath "C:\your\data\path"

# Check MongoDB logs
mongod --logpath "C:\mongodb\logs\mongod.log"
```

## 🎉 Benefits of MongoDB Integration

✅ **Persistent Data** - Data survives server restarts
✅ **Scalable** - Handle thousands of users and donations
✅ **Real-time Updates** - Achievements and levels update automatically
✅ **Analytics Ready** - Built-in aggregation for statistics
✅ **Production Ready** - Can easily deploy to cloud databases
✅ **Data Integrity** - Mongoose validation ensures clean data
✅ **Performance** - Indexed queries for fast leaderboards

Your fundraising platform is now powered by a professional database! 🚀
