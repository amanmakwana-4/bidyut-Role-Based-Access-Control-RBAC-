# Frontend Environment Variables Setup

## For Local Development

Create `.env` file in `frontend/` folder:

```
VITE_API_BASE_URL=http://localhost:5000
```

## For Vercel Deployment

Add this in **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**:

```
Name:  VITE_API_BASE_URL
Value: https://rbac-task-backend.onrender.com
```

(Replace with your actual Render backend URL)

## Important Notes

### Local Development (Node Running)
```
VITE_API_BASE_URL=http://localhost:5000
```

### Deployed to Vercel
```
VITE_API_BASE_URL=https://rbac-task-backend.onrender.com
```

### Don't Include
- Don't add JWT_SECRET here (only backend needs it)
- Don't add sensitive keys in frontend

### How Vite Loads Variables

In code, access like this:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

Only variables starting with `VITE_` are exposed to frontend!

## Steps to Add in Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** tab
4. Click **Environment Variables** on the left
5. Click **Add New**
6. Enter:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://rbac-task-backend.onrender.com`
7. Select scope: **Production, Preview, Development**
8. Click **Add**
9. **Redeploy** your project for changes to take effect

## Verify It's Working

1. After deployment, open DevTools (F12)
2. Go to Network tab
3. Try to login
4. Check if requests go to your Render backend URL
5. Should see status `200` or `401` (not CORS error)

## If It's Not Working

Check:
- ✅ API URL is correct (no trailing slash)
- ✅ Backend is running on Render
- ✅ CORS is configured in backend (`src/app.js`)
- ✅ You redeployed after changing env variable
- ✅ Backend URL accessible (test in browser console)

```javascript
// In browser console, test:
fetch('https://rbac-task-backend.onrender.com/health')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.log('Error:', e))
```

Should see: `{message: "Server is running"}`
