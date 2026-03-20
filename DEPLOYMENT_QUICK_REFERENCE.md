# Quick Deployment Reference

## Commands for Local Testing Before Deployment

```bash
# Test Backend
cd backend
npm install
npm run dev
# Should see: "Server running on port 5000"
# Test: http://localhost:5000/health

# Test Frontend (new terminal)
cd frontend
npm install
npm run dev
# Should see: "Local: http://localhost:5173"
# Open in browser
```

## Git Commands for Deployment

```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Deployment ready"

# Push to GitHub
git push origin main

# Verify on GitHub (https://github.com/your-username/your-repo)
```

## Generate Strong JWT_SECRET

```bash
# Option 1: Node.js (recommended)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 2: Python
python -c "import secrets; print(secrets.token_hex(32))"

# Option 3: OpenSSL (if installed)
openssl rand -hex 32
```

## Test Backend is Live

```bash
# Replace with your actual URL
curl https://rbac-task-backend.onrender.com/health

# Should return:
# {"message": "Server is running"}
```

## Test Frontend Connection to Backend

In browser console (F12):

```javascript
// Test if backend is accessible
fetch('https://rbac-task-backend.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log('Backend is alive:', d))
  .catch(e => console.log('Backend error:', e))

// Test login API
fetch('https://rbac-task-backend.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
})
  .then(r => r.json())
  .then(d => console.log('Login test:', d))
  .catch(e => console.log('Login error:', e))
```

## Troubleshoot CORS Errors

If you see `CORS error` in browser console:

1. **Update backend CORS:**
   - Edit `backend/src/app.js`
   - Change `origin: 'http://localhost:3000'` to your Vercel URL

2. **Example:**
   ```javascript
   app.use(cors({
     origin: 'https://your-project.vercel.app',
     credentials: true,
   }));
   ```

3. **Commit and push:**
   ```bash
   git add backend/src/app.js
   git commit -m "Update CORS for production"
   git push origin main
   ```

4. **Wait for Render to auto-deploy (1-2 minutes)**

## Useful URLs

```
Render Dashboard:     https://dashboard.render.com
Vercel Dashboard:     https://vercel.com/dashboard
MongoDB Atlas:        https://cloud.mongodb.com
Your Backend:         https://rbac-task-backend.onrender.com
Your Frontend:        https://rbac-task-frontend.vercel.app
```

## Common Deploy Commands

**Rebuild on Render:**
- Go to https://dashboard.render.com
- Click your service
- Scroll down → "Manual Deploy" → Select branch → "Deploy"

**Redeploy on Vercel:**
- Go to https://vercel.com/dashboard
- Click your project
- Go to "Deployments" tab
- Click "..." on latest deployment → "Redeploy"

**Or push code to auto-deploy:**
```bash
git push origin main
# Wait 1-2 minutes for auto-deployment
```

## Database Connection Issues

**MongoDB connection timeout?**

1. Go to MongoDB Atlas: https://cloud.mongodb.com
2. Click Clusters → Network Access
3. Check if your Render IP is whitelisted
4. Add `0.0.0.0/0` to allow all IPs (for university project)

**Test MongoDB URI locally:**
```bash
# Install mongodb shell (mongosh)
npm install -g mongosh

# Test connection
mongosh "your-mongo-uri-here"
# Should connect successfully
```

## Reset to Defaults (If Broken)

```bash
# Frontend .env
VITE_API_BASE_URL=http://localhost:5000

# Backend .env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=generate_strong_random_string
PORT=5000
NODE_ENV=development
```

## Check Logs

**Render Backend Logs:**
```
Dashboard → Your Service → "Logs" tab
```

**Vercel Frontend Logs:**
```
Dashboard → Your Project → "Deployments" → Click deployment → "Runtime logs"
```

## Rollback to Previous Version

**On Render:**
- Click service
- Go to "Deployments" tab
- Click previous deployment → "Redeploy"

**On Vercel:**
- Go to "Deployments" tab
- Click previous build → "Redeploy"

## Environment Variables Summary

| Variable | Backend | Frontend | Value |
|----------|---------|----------|-------|
| MONGO_URI | ✅ | ❌ | MongoDB connection string |
| JWT_SECRET | ✅ | ❌ | Random 32-char string |
| NODE_ENV | ✅ | ❌ | `production` |
| PORT | ✅ | ❌ | `5000` |
| VITE_API_BASE_URL | ❌ | ✅ | Backend Render URL |

## Complete Deployment Flowchart

```
1. Local Testing
   ↓
2. Commit & Push to GitHub
   ↓
3. Deploy Backend on Render (auto-deploy on push)
   ↓
4. Copy Render URL
   ↓
5. Add Render URL to Frontend .env (VITE_API_BASE_URL)
   ↓
6. Deploy Frontend on Vercel
   ↓
7. Test Everything
   ↓
8. Create Admin Account
   ↓
9. Live! 🚀
```

---

**Need Help?**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
