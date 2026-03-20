# Deployment Guide: Render (Backend) + Vercel (Frontend)

## Part 1: Backend Deployment on Render

### Step 1: Prepare Backend for Deployment

1. **Ensure all files are committed to Git**
```bash
cd backend
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

2. **Create `.env` file in backend root** with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=production
```

3. **Verify `.gitignore` includes `.env`** (don't push secrets)

### Step 2: Create Render Account & Deploy Backend

1. **Go to [render.com](https://render.com)** and sign up
2. **Connect your GitHub account**
3. **Click "New" → "Web Service"**
4. **Select your GitHub repository**
5. **Configure the service:**

| Field | Value |
|-------|-------|
| **Name** | `rbac-task-backend` (or your choice) |
| **Root Directory** | `BidyutProject-RoleBasedAccessControl/backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Premium) |

6. **Click "Advanced" and add Environment Variables:**

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
JWT_SECRET = your-super-secret-key-change-this
NODE_ENV = production
```

7. **Click "Create Web Service"**

**Wait 3-5 minutes for deployment to complete.**

### Step 3: Verify Backend is Running

Your backend is now deployed at: `https://bidyut-role-based-access-control-rbac.onrender.com`

Test it:
```bash
curl https://bidyut-role-based-access-control-rbac.onrender.com/health
```

Expected response:
```json
{"message": "Server is running"}
```

### Step 4: Important Render Notes

- ✅ **Free tier** spins down after 15 minutes of inactivity (first request takes longer)
- ✅ **Paid tier** keeps server always running
- ✅ Logs available in Render dashboard
- ✅ Can redeploy anytime from GitHub

---

## Part 2: Frontend Deployment on Vercel

### Step 1: Prepare Frontend for Deployment

1. **Update `.env` file in frontend:**
```
VITE_API_BASE_URL=https://bidyut-role-based-access-control-rbac.onrender.com
```

2. **Build and test locally:**
```bash
cd frontend
npm run build
npm run preview
```

3. **Commit and push to GitHub:**
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Account & Deploy Frontend

1. **Go to [vercel.com](https://vercel.com)** and sign up
2. **Click "Add New..." → "Project"**
3. **Import your GitHub repository**
4. **Vercel auto-detects it's a Vite project**
5. **Configure:**

| Field | Value |
|-------|-------|
| **Project Name** | `rbac-task-frontend` |
| **Framework** | Vite |
| **Root Directory** | `BidyutProject-RoleBasedAccessControl/frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

6. **Add Environment Variables:**
   - Click on "Environment Variables"
   - Add: `VITE_API_BASE_URL` = `https://bidyut-role-based-access-control-rbac.onrender.com`

7. **Click "Deploy"**

**Wait 1-2 minutes for deployment.**

You'll get a URL like: `https://rbac-task-frontend.vercel.app`

### Step 3: Verify Frontend Works

1. Visit your Vercel URL
2. Try registering a new account
3. Login and test features
4. Check Admin panel if you created an admin account

---

## Part 3: Connect Frontend & Backend

### Verify Connection:

1. **Open your Vercel frontend URL**
2. **Open browser DevTools → Network tab**
3. **Try to login**
4. Check network requests:
   - Should see requests to `https://bidyut-role-based-access-control-rbac.onrender.com/api/auth/login`
   - Status should be `200` or `201` (success)
   - Status `401` or `403` (auth error)
   - Status `500` (backend error)

### If Connection Fails:

**Issue 1: CORS Error**
- Go back to backend code: `src/app.js`
- Update CORS origin:
```javascript
app.use(cors({
  origin: 'https://your-vercel-url.vercel.app',
  credentials: true,
}));
```
- Commit, push, and Render will auto-redeploy

**Issue 2: Wrong API URL**
- Check frontend `.env`: `VITE_API_BASE_URL`
- Must match Render backend URL exactly
- Redeploy frontend on Vercel

**Issue 3: Database Connection**
- Verify MongoDB URI is correct in Render environment variables
- Check MongoDB Atlas IP whitelist (allow all IPs: 0.0.0.0/0)

---

## Part 4: MongoDB Atlas Setup (If Not Done)

1. **Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)**
2. **Create account or login**
3. **Create a new project**
4. **Create a cluster** (Free tier available)
5. **Get connection string:**
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<username>` and `<password>`
   - Replace `myFirstDatabase` with your database name

Example format:
```
mongodb+srv://username:password@cluster0.mongodb.net/rbac_db?retryWrites=true&w=majority
```

6. **Add to Render environment:** `MONGO_URI`

---

## Part 5: Create Admin Account on Production

Once everything is deployed:

1. **Register a normal user account** via Vercel frontend
2. **Go to MongoDB Atlas** → Your database
3. **Find the user document you just created**
4. **Change `role` field from `"user"` to `"admin"`
5. **Login with that account** → You'll see admin dashboard

OR use backend API directly:

```bash
curl -X POST https://bidyut-role-based-access-control-rbac.onrender.com/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123"
  }'
```

---

## Part 6: Post-Deployment Checklist

✅ Backend running on Render (check health endpoint)
✅ Frontend running on Vercel
✅ Can register new user
✅ Can login with credentials
✅ Dashboard loads with user info
✅ Can create, update, delete tasks (users)
✅ Admin can see all users and tasks
✅ Theme toggle works
✅ Logout clears auth

---

## Part 7: Deployment Troubleshooting

### Backend Issues:

| Problem | Solution |
|---------|----------|
| **500 Server Error** | Check Render logs → might be MongoDB connection issue |
| **Build fails** | Verify `package.json` exists, run `npm install` locally |
| **Environment vars not set** | Go to Render dashboard → Environment tab → verify all vars |
| **Cold startup slow** | Expected on free tier, upgrade to paid for instant response |

### Frontend Issues:

| Problem | Solution |
|---------|----------|
| **CORS errors** | Update `src/app.js` CORS origin to match Vercel URL |
| **API not responding** | Check `VITE_API_BASE_URL` in Vercel environment vars |
| **Blank page** | Check browser console for errors, verify build succeeded |
| **Auth not working** | Verify JWT_SECRET is same on backend and frontend using it |

### Database Issues:

| Problem | Solution |
|---------|----------|
| **MongoDB connection timeout** | Check IP whitelist in MongoDB Atlas (set to 0.0.0.0/0) |
| **Authentication failed** | Verify MONGO_URI string is correct in Render env vars |

---

## Part 8: Update Your Code After Deployment

**For Backend Changes:**
1. Make changes locally in `backend/` folder
2. Test with `npm run dev`
3. Commit: `git commit -m "message"`
4. Push: `git push origin main`
5. Render auto-deploys within 1-2 minutes
6. Check Render logs to verify deployment

**For Frontend Changes:**
1. Make changes locally in `frontend/` folder
2. Test with `npm run dev`
3. Commit: `git commit -m "message"`
4. Push: `git push origin main`
5. Vercel auto-deploys within 30-60 seconds
6. Check Vercel dashboard for deployment status

---

## Part 9: Custom Domain Setup (Optional)

### For Render Backend:
1. Go to Render dashboard → Your service
2. Click "Settings" → "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

### For Vercel Frontend:
1. Go to Vercel dashboard → Project settings
2. Go to "Domains"
3. Add your domain
4. Update DNS records as instructed

---

## Part 10: Useful Commands & Links

**Render:**
- Dashboard: https://dashboard.render.com
- View logs: Click service → Logs tab
- Manual deploy: Click service → Manual Deploy

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- View logs: Click deployment → Runtime logs
- Production/Preview: Check settings for auto-deployments

**MongoDB Atlas:**
- Dashboard: https://cloud.mongodb.com
- Monitor: Chart.mongodb.com
- Backup: Atlas backup section

---

## Final Production URLs

Once deployed, you'll have:

```
Backend API:   https://bidyut-role-based-access-control-rbac.onrender.com
Frontend App:  https://rbac-task-frontend.vercel.app

API Health:    https://bidyut-role-based-access-control-rbac.onrender.com/health
```

Update this README with your actual URLs!

---

**Questions?** Check Render docs (render.com/docs) or Vercel docs (vercel.com/docs)
