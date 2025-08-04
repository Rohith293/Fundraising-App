# 🚀 Netlify + Heroku Deployment Guide

## **Step-by-Step Deployment Process**

### 🔹 **Part 1: Deploy Backend to Heroku**

#### 1. **Install Heroku CLI**
- Download from: https://devcenter.heroku.com/articles/heroku-cli
- Or use: `npm install -g heroku`

#### 2. **Login to Heroku**
```bash
heroku login
```

#### 3. **Create Heroku App for Backend**
```bash
cd backend
heroku create your-fundraising-api
```

#### 4. **Set Environment Variables**
```bash
# For MongoDB Atlas (recommended for production)
heroku config:set MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/fundraising-hub"

# Or for testing with local MongoDB (not recommended for production)
heroku config:set MONGODB_URI="mongodb://localhost:27017/fundraising-hub"

heroku config:set PORT=5000
heroku config:set NODE_ENV=production
```

#### 5. **Deploy Backend**
```bash
git add .
git commit -m "Prepare backend for Heroku deployment"
git push heroku main
```

#### 6. **Get Your Backend URL**
After deployment, your backend will be available at:
`https://your-fundraising-api.herokuapp.com`

---

### 🔸 **Part 2: Deploy Frontend to Netlify**

#### 1. **Update Frontend Configuration**
Update `netlify.toml` with your actual backend URL:
```toml
[build.environment]
  REACT_APP_API_URL = "https://your-fundraising-api.herokuapp.com"
```

#### 2. **Deploy via Netlify Dashboard**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub account
3. Click "New site from Git"
4. Choose "GitHub" and authorize
5. Select your repository: `Fundraising-App`
6. **Build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
7. Click "Deploy site"

#### 3. **Add Environment Variables in Netlify**
1. Go to Site settings → Environment variables
2. Add: `REACT_APP_API_URL` = `https://your-fundraising-api.herokuapp.com`
3. Redeploy the site

---

### 🔹 **Part 3: Database Setup (MongoDB Atlas)**

#### 1. **Create MongoDB Atlas Account**
- Go to: https://www.mongodb.com/atlas
- Create free account and cluster

#### 2. **Configure Database**
1. Create database user
2. Whitelist all IP addresses (0.0.0.0/0)
3. Get connection string
4. Update Heroku environment variable

---

## 🚀 **Alternative: Deploy Both on Netlify**

### **Option: Netlify Functions for Backend**

If you want everything on Netlify, you can convert your backend to Netlify Functions:

#### 1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

#### 2. **Convert Backend to Functions**
Create `netlify/functions/` directory and convert each API endpoint to a function.

#### 3. **Deploy**
```bash
netlify deploy --prod
```

---

## 📋 **Deployment Checklist**

### ✅ **Before Deployment**
- [ ] MongoDB Atlas database created
- [ ] Environment variables configured
- [ ] API URLs updated in frontend
- [ ] CORS settings updated for production domains
- [ ] Build process tested locally

### ✅ **Backend (Heroku)**
- [ ] Heroku app created
- [ ] Environment variables set
- [ ] Procfile exists
- [ ] Backend deployed and accessible

### ✅ **Frontend (Netlify)**
- [ ] netlify.toml configured
- [ ] API_URL environment variable set
- [ ] Site deployed and accessible
- [ ] Routes working (redirects configured)

### ✅ **Testing**
- [ ] Frontend loads correctly
- [ ] API calls work
- [ ] Database operations function
- [ ] All features working in production

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **CORS Errors**
   - Update backend CORS to allow your Netlify domain
   ```javascript
   app.use(cors({
     origin: ['https://your-app.netlify.app', 'http://localhost:3000']
   }));
   ```

2. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

3. **API Not Found**
   - Verify backend URL is correct
   - Check environment variables
   - Test API endpoints directly

4. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has correct permissions

---

## 🌐 **Your URLs After Deployment**

- **Frontend**: `https://your-app.netlify.app`
- **Backend**: `https://your-fundraising-api.herokuapp.com`
- **Database**: MongoDB Atlas cluster

Your fundraising platform will be live and accessible worldwide! 🌍
