# 🎯 Fundraising Hub

A modern, full-stack fundraising platform built with React and Node.js featuring real-time donation tracking, gamification elements, and comprehensive analytics.

![Fundraising Hub Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-green)
![Express](https://img.shields.io/badge/Express-4.18+-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-darkgreen)

## ✨ Features

### 🎮 **Gamification & User Experience**
- **Level System** - Progress through ranks (Beginner → Contributor → Rising Star → Master)
- **Achievement Badges** - Unlock Bronze, Silver, and Gold badges
- **Streak Tracking** - Monitor daily activity streaks
- **Progress Bars** - Visual goal tracking with real-time updates
- **Leaderboard** - Competitive rankings with special styling for top performers

### 📊 **Analytics & Insights**
- **Platform Statistics** - Total users, donations, and averages
- **Performance Metrics** - Weekly and monthly fundraising data
- **Donation History** - Complete transaction timeline
- **Real-time Updates** - Live data synchronization across all features

### 🎯 **Goal Management**
- **Dynamic Goal Setting** - Customizable fundraising targets
- **Progress Visualization** - Interactive progress bars and percentages
- **Quick Goal Templates** - Pre-set amounts for easy selection
- **Motivational Messaging** - Context-aware encouragement

### 💰 **Donation Management**
- **Donation Simulator** - Test platform with simulated donations
- **Manual Entry** - Add specific amounts with donor information
- **Quick Donations** - One-click preset amounts
- **Random Generator** - Automated test donation creation

### 🎨 **Modern UI/UX**
- **Vibrant Design** - Beautiful gradients and modern styling
- **Glassmorphism Effects** - Contemporary visual elements
- **Responsive Layout** - Works on all device sizes
- **Smooth Animations** - Engaging transitions and interactions
- **Intuitive Navigation** - Easy page transitions and user flow

### 🔧 **Robust Architecture**
- **Demo Data Fallback** - Works with or without MongoDB connection
- **Error Handling** - Graceful fallbacks for connection issues
- **Environment Configuration** - Easy setup for development and production
- **Clean Code Structure** - Well-organized components and utilities

## � Screenshots

### 🔐 Login Screen
*Simple and clean authentication interface*

![Login Screen](screenshots/login.png)

### 🏠 Dashboard
*Main user dashboard with personal statistics and quick actions*

![Dashboard](screenshots/dashboard.png)

### 📊 Analytics Page
*Comprehensive platform statistics and insights*

![Analytics](screenshots/analytics.png)

### 🎯 Goal Setting
*Interactive goal management with progress visualization*

![Goal Setting](screenshots/goal-setting.png)

### 💰 Donation Simulator
*Test donation functionality with realistic simulation*

![Donation Simulator](screenshots/donation-simulator.png)

### 🏆 Leaderboard
*Competitive rankings with user achievements*

![Leaderboard](screenshots/leaderboard.png)

### 📱 Responsive Design
*Mobile-friendly interface across all devices*

<div align="center">
  <img src="screenshots/mobile-dashboard.png" alt="Mobile Dashboard" width="300"/>
  <img src="screenshots/mobile-leaderboard.png" alt="Mobile Leaderboard" width="300"/>
</div>

## �🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- **MongoDB** (Optional - falls back to demo data if not available)
  - [MongoDB Community Edition](https://www.mongodb.com/try/download/community) for local development
  - OR [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rohith293/Fundraising-App.git
   cd Fundraising-App
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment (Optional)**
   ```bash
   cd ../backend
   # Create .env file for MongoDB connection (optional)
   # If not provided, app will use demo data
   echo "MONGODB_URI=mongodb://localhost:27017/fundraising-hub" > .env
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   Backend will run on `http://localhost:5000` and automatically:
   - Try to connect to MongoDB
   - Fall back to demo data if MongoDB is unavailable
   - Display connection status and seed sample data

6. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

7. **Open your browser**
   Navigate to `http://localhost:3000` to start using the application
- **Leaderboard** - Competitive rankings with special styling for top performers

### 📊 **Analytics & Insights**
- **Platform Statistics** - Total users, donations, and averages
- **Performance Metrics** - Weekly and monthly fundraising data
- **Donation History** - Complete transaction timeline
- **Real-time Updates** - Live data synchronization across all features

### 🎯 **Goal Management**
- **Dynamic Goal Setting** - Customizable fundraising targets
- **Progress Visualization** - Interactive progress bars and percentages
- **Quick Goal Templates** - Pre-set amounts for easy selection
- **Motivational Messaging** - Context-aware encouragement

### 💰 **Donation Management**
- **Donation Simulator** - Test platform with simulated donations
- **Manual Entry** - Add specific amounts with donor information
- **Quick Donations** - One-click preset amounts
- **Random Generator** - Automated test donation creation

### 🎨 **Modern UI/UX**
- **Vibrant Design** - Beautiful gradients and modern styling
- **Glassmorphism Effects** - Contemporary visual elements
- **Responsive Layout** - Works on all device sizes
- **Smooth Animations** - Engaging transitions and interactions
- **Intuitive Navigation** - Easy page transitions and user flow

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- **MongoDB** (Local installation or MongoDB Atlas account)
  - [MongoDB Community Edition](https://www.mongodb.com/try/download/community) for local development
  - OR [MongoDB Atlas](https://www.mongodb.com/atlas) for cloud database (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fundraising-hub.git
   cd fundraising-hub
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd ../backend
   npm start
   ```
   Backend will run on `http://localhost:5000`

5. **Start the frontend development server**
   ```bash
   cd ../frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

6. **Open your browser**
   Navigate to `http://localhost:3000` to start using the application

## 📁 Project Structure

```
fundraising-hub/
├── backend/
│   ├── server.js          # Express server with API endpoints & demo fallback
│   ├── models.js          # MongoDB/Mongoose data models
│   ├── dbUtils.js         # Database utility functions
│   ├── .env               # Environment variables (MongoDB URI)
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Backend packages
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Global styles and themes
│   │   ├── Login.js       # Authentication interface
│   │   ├── Dashboard.js   # Main user dashboard
│   │   ├── Analytics.js   # Statistics and insights
│   │   ├── GoalSetting.js # Goal management interface
│   │   ├── DonationSimulator.js # Donation testing tools
│   │   └── Leaderboard.js # Competitive rankings
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   └── build/             # Production build (after npm run build)
└── README.md              # Project documentation
```

## 🔌 API Endpoints

### GET Endpoints
- `GET /api/user` - Retrieve user profile and statistics
- `GET /api/leaderboard` - Get ranked user list (top 10)
- `GET /api/stats` - Platform-wide statistics and metrics
- `GET /api/donations/history` - Complete donation timeline

### POST Endpoints
- `POST /api/donations/add` - Add new donation entry
- `POST /api/user/goal` - Update user fundraising goal

### Demo Mode Support
All endpoints work seamlessly with or without MongoDB:
- **With MongoDB**: Full database functionality
- **Without MongoDB**: Demo data with realistic sample information

### Example API Usage
```javascript
// Get user data
const response = await fetch('http://localhost:5000/api/user');
const userData = await response.json();

// Add a donation
const donation = await fetch('http://localhost:5000/api/donations/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100, donor: 'John Doe' })
});
```

## 🔌 API Endpoints

### GET Endpoints
- `GET /api/user` - Retrieve user profile and statistics
- `GET /api/leaderboard` - Get ranked user list
- `GET /api/stats` - Platform-wide statistics
- `GET /api/donations/history` - Complete donation timeline

### POST Endpoints
- `POST /api/donations/add` - Add new donation entry
- `POST /api/user/goal` - Update user fundraising goal

### Example API Usage
```javascript
// Get user data
const response = await fetch('http://localhost:5000/api/user');
const userData = await response.json();

// Add a donation
const donation = await fetch('http://localhost:5000/api/donations/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 100, donor: 'John Doe' })
});
```

## 🎯 Usage Guide

### For New Users
1. **Login** - Enter any name to access the demo (no authentication required)
2. **Explore Dashboard** - View your profile, progress, and achievements
3. **Set Goals** - Click "Set Goals" to establish fundraising targets
4. **Add Donations** - Use "Add Donation" to simulate fundraising activity
5. **Check Analytics** - View platform statistics and insights
6. **Compare Rankings** - Check the leaderboard for competitive standings

### Database Modes
- **With MongoDB**: Full persistence, data saved between sessions
- **Demo Mode**: In-memory data with realistic examples (when MongoDB unavailable)

### For Developers
1. **Backend Customization** - Modify `backend/server.js` for new endpoints
2. **Frontend Components** - Update React components in `frontend/src/`
3. **Styling** - Customize themes in `frontend/src/App.css`
4. **Database Integration** - Configure MongoDB connection in `.env`
5. **Demo Data** - Modify demo data in server.js `initializeDemoData()` function

## 🛠️ Tech Stack

### Frontend
- **React 18+** - Modern UI library with hooks
- **CSS3** - Advanced styling with gradients and glassmorphism
- **Fetch API** - HTTP client for backend communication
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web framework for API development
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling for Node.js
- **CORS** - Cross-origin resource sharing middleware
- **dotenv** - Environment variable management

### Development Tools
- **Create React App** - Frontend development environment
- **npm** - Package management
- **Git** - Version control
- **VS Code** - Recommended IDE

## � Deployment

### Local Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`
- Demo data available without database setup

### Production Ready
- Environment variables for database configuration
- Error handling and fallback mechanisms
- Clean separation of concerns
- Scalable architecture

## �🔮 Future Enhancements

### Planned Features
- **🔐 Authentication** - Real user registration and login system
- **� Payment Integration** - Stripe or PayPal for real transactions
- **📧 Email Notifications** - Donation alerts and campaign updates
- **📱 Mobile App** - React Native mobile application
- **🌐 Social Sharing** - Share achievements and progress on social media
- **📈 Advanced Analytics** - Charts, graphs, and detailed reporting
- **🎨 Theme Customization** - Dark mode and color theme options

### Technical Improvements
- **🔄 Real-time Updates** - WebSocket integration for live updates
- **🛡️ Security** - Input validation, sanitization, and authentication
- **⚡ Performance** - Code splitting, lazy loading, and optimization
- **🧪 Testing** - Jest, React Testing Library, and E2E tests
- **📦 Deployment** - Docker containerization and CI/CD pipelines
- **🔍 SEO** - Server-side rendering with Next.js

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly in both MongoDB and demo modes
- Update documentation as needed
- Ensure responsive design compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Rohith293** - *Project Owner* - [GitHub](https://github.com/Rohith293)

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js community for the robust backend solution
- MongoDB team for the excellent database solution
- Open source community for inspiration and resources

## 📞 Support

If you have any questions or need help:

- 🐛 **Issues**: [GitHub Issues](https://github.com/Rohith293/Fundraising-App/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Rohith293/Fundraising-App/discussions)
- 📧 **Contact**: Open an issue for support

## 🎯 Demo Data

When MongoDB is not available, the app uses realistic demo data:
- **Sample User**: Alex Johnson with achievements and statistics
- **Demo Leaderboard**: 5 sample users with varying donation amounts
- **Platform Stats**: Realistic fundraising metrics
- **All Features**: Full functionality with temporary data

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ for the fundraising community

**Ready to start fundraising? Clone, install, and go! 🚀**
