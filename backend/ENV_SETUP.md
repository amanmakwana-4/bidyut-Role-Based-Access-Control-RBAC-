# Backend Environment Variables Setup

## For Local Development

Create `.env` file in `backend/` folder:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/rbac_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

## For Render Deployment

Add these in **Render Dashboard** → Your Service → **Environment**:

```
MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/rbac_db?retryWrites=true&w=majority
JWT_SECRET = your_super_secret_jwt_key_change_this_in_production
PORT = 5000
NODE_ENV = production
```

## Get MongoDB Connection String

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Login to your account
3. Click "Clusters" → "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace:
   - `<username>` with your MongoDB user
   - `<password>` with your MongoDB password
   - `myFirstDatabase` with your database name

Example:
```
mongodb+srv://sheriyans:my_password_123@cluster0.mongodb.net/rbac_db?retryWrites=true&w=majority
```

## JWT_SECRET

Generate a strong random string:

**Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Using Python:**
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Or just use any long random string (30+ characters).

## Notes

⚠️ **Never commit `.env` file to Git!**
- `.env` is in `.gitignore` already
- Only add environment variables in Render/Vercel dashboard
- Keep `JWT_SECRET` secret!

✅ For MongoDB Atlas:
- Create free cluster (M0)
- Enable network access (0.0.0.0/0 for all IPs)
- Create database user with username/password
