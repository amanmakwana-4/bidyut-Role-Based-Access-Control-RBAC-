# Deployment Checklist

Use this checklist to ensure smooth deployment!

## Pre-Deployment (Local Testing)

- [ ] Test backend locally: `npm run dev` (from backend folder)
- [ ] Test frontend locally: `npm run dev` (from frontend folder)
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can create/edit/delete tasks
- [ ] Theme toggle works
- [ ] All pages load without errors
- [ ] No console errors (F12 → Console)

## GitHub Setup

- [ ] All code committed to GitHub
- [ ] `.env` file is in `.gitignore` (not pushed)
- [ ] `.gitignore` content looks correct
- [ ] Can access repo from GitHub account
- [ ] Have GitHub credentials ready

## MongoDB Setup

- [ ] MongoDB Atlas account created
- [ ] Cluster created (free M0 tier works)
- [ ] Database user created (with username/password)
- [ ] Network access enabled (0.0.0.0/0)
- [ ] Connection string copied correctly
- [ ] Connection string format verified

## Backend Deployment (Render)

- [ ] Render account created
- [ ] GitHub connected to Render
- [ ] New Web Service created
- [ ] Repository selected
- [ ] Root Directory: `BidyutProject-RoleBasedAccessControl/backend`
- [ ] Environment: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Environment variables added:
  - [ ] `MONGO_URI` = MongoDB connection string
  - [ ] `JWT_SECRET` = Strong random string
  - [ ] `NODE_ENV` = `production`
- [ ] Service created and deploying
- [ ] Wait 3-5 minutes for deployment
- [ ] Copy service URL (e.g., `https://rbac-task-backend.onrender.com`)
- [ ] Test health endpoint: `https://your-service.onrender.com/health`
- [ ] Logs show: "Server running on port 5000" (or similar)

## Frontend Deployment (Vercel)

- [ ] Vercel account created
- [ ] GitHub connected to Vercel
- [ ] New project imported
- [ ] Repository selected
- [ ] Framework: Vite
- [ ] Root Directory: `BidyutProject-RoleBasedAccessControl/frontend`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Environment variable added:
  - [ ] Name: `VITE_API_BASE_URL`
  - [ ] Value: Your Render backend URL
  - [ ] Scope: Production, Preview, Development
- [ ] Project deployed
- [ ] Wait 1-2 minutes for deployment
- [ ] Copy project URL (e.g., `https://project.vercel.app`)

## Post-Deployment Testing

**Frontend Connection:**
- [ ] Open frontend URL in browser
- [ ] No `CORS` error
- [ ] No `API not responding` error
- [ ] Network requests go to Render backend

**User Registration:**
- [ ] Go to `/register` page
- [ ] Register new account (name, email, password)
- [ ] See success message
- [ ] Redirected to dashboard

**User Login:**
- [ ] Go to `/login` page
- [ ] Login with registered credentials
- [ ] See "Login successful"
- [ ] Redirected to dashboard with user info

**User Features:**
- [ ] Dashboard shows user role and email
- [ ] Navigate to "My Tasks"
- [ ] Create new task
- [ ] Edit existing task
- [ ] Mark task as completed
- [ ] Delete task
- [ ] Works without errors

**Theme Toggle:**
- [ ] Click sun/moon icon in navbar
- [ ] Page changes to dark/light mode
- [ ] Theme persists on page refresh

**Admin Features (if admin account):**
- [ ] Login as admin
- [ ] See "Users" link in navbar
- [ ] See "All Tasks" link in navbar
- [ ] Click "Users" → can see all users
- [ ] Click "All Tasks" → can see all tasks
- [ ] Can delete users/tasks (admin only)

**Logout:**
- [ ] Click Logout button
- [ ] Redirected to login page
- [ ] Cannot access dashboard (redirected to login)

## Create Admin Account on Production

Choose ONE method:

**Method 1: MongoDB Atlas UI**
- [ ] Go to MongoDB Atlas
- [ ] Find your database
- [ ] Find user collection
- [ ] Click on a user document
- [ ] Change `role` field from `"user"` to `"admin"`
- [ ] Save changes
- [ ] Logout and login again

**Method 2: API Call**
- [ ] Get token from login response
- [ ] Call POST `/api/auth/create-admin` with admin token
- [ ] Verify response

## Troubleshooting Checklist

### Backend Not Working
- [ ] Check Render logs (click service → Logs)
- [ ] Verify MONGO_URI in Render env vars
- [ ] Verify MongoDB connection string is correct
- [ ] Check MongoDB Atlas network access (should be 0.0.0.0/0)
- [ ] Verify PORT is set to 5000
- [ ] Try restarting service in Render dashboard

### Frontend Not Working
- [ ] Check Vercel deployment logs
- [ ] Verify build succeeded (should say "Build successful")
- [ ] Check VITE_API_BASE_URL env var in Vercel
- [ ] Verify it matches Render backend URL exactly
- [ ] Redeploy from Vercel dashboard

### Connection Issues
- [ ] Verify backend URL in frontend env var
- [ ] Test backend URL directly in browser
- [ ] Check CORS in backend `src/app.js`
- [ ] Update CORS origin to match Vercel URL:
  ```
  origin: 'https://your-vercel-url.vercel.app'
  ```
- [ ] Redeploy backend (auto-deploys on push)

### Login Not Working
- [ ] Verify account exists in MongoDB
- [ ] Check email/password are correct
- [ ] Check backend logs for errors
- [ ] Verify JWT_SECRET is set in Render

## Final Verification

- [ ] Backend URL works (health endpoint responds)
- [ ] Frontend URL works (app loads)
- [ ] Can register and login
- [ ] Can use all features
- [ ] No console errors
- [ ] No network errors (200, 201 status codes)
- [ ] Dark mode works
- [ ] Logout works
- [ ] Admin can access admin pages

## Keep Deployed & Updated

- [ ] Both services connected to GitHub
- [ ] Auto-deploys enabled
- [ ] Can push code and see updates on Render/Vercel within 1-2 minutes
- [ ] Logs available for debugging
- [ ] Can rollback if needed

---

**Deployment Complete!** 🎉

Your app is now live and accessible from anywhere! 🌍
