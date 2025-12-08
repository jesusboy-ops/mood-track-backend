# Render Deployment Troubleshooting Guide

## 🚨 Backend Not Live - Common Issues & Solutions

### Step 1: Check Render Service Configuration

**Build Settings:**
```
Build Command: npm install && npx prisma generate
Start Command: npm start
```

**Environment:**
```
Runtime: Node
Node Version: 18 (or latest)
```

---

### Step 2: Verify Environment Variables

Go to Render Dashboard → Your Service → Environment

**Required Variables:**
```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@db.wrsjqvexqpehpsmeafyg.supabase.co:5432/postgres
JWT_SECRET=your-jwt-secret-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
FRONTEND_URL=http://localhost:3001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NODE_ENV=production
PORT=3000
```

**⚠️ CRITICAL:** Make sure DATABASE_URL has the correct password and is URL-encoded!

---

### Step 3: Check Build Logs

1. Go to Render Dashboard
2. Click on your service
3. Go to **"Logs"** tab
4. Look for build errors

**Common Build Errors:**

#### Error: "Prisma generate failed"
**Solution:**
```bash
# Make sure prisma is in dependencies, not devDependencies
npm install prisma --save
```

#### Error: "Database connection failed"
**Solution:**
- Check DATABASE_URL format
- Ensure Supabase allows connections from Render
- Test connection locally first

#### Error: "Module not found"
**Solution:**
- Check all imports use correct paths
- Ensure all dependencies are in package.json

---

### Step 4: Test Database Connection

Create a simple test to verify database works:

```javascript
// test-db.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test a simple query
    const userCount = await prisma.user.count();
    console.log(`✅ Users in database: ${userCount}`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
```

Run locally: `node test-db.js`

---

### Step 5: Check Service Status

**In Render Dashboard:**
1. Service should show **"Live"** status
2. Check **"Events"** tab for deployment history
3. Look for any failed deployments

**Common Status Issues:**

#### Status: "Build Failed"
- Check build logs for errors
- Verify package.json scripts
- Ensure all dependencies are correct

#### Status: "Deploy Failed"
- Check start command
- Verify environment variables
- Look for runtime errors in logs

#### Status: "Live" but not responding
- Check if service is listening on correct PORT
- Verify health endpoint works
- Check for application crashes

---

### Step 6: Manual Deployment Steps

If automatic deployment fails, try manual steps:

1. **Delete and recreate service**
2. **Use these exact settings:**

```
Name: moodmate-backend
Runtime: Node
Build Command: npm install && npx prisma generate
Start Command: npm start
Auto-Deploy: Yes
```

3. **Add environment variables one by one**
4. **Trigger manual deploy**

---

### Step 7: Debug Server Startup

Add debug logging to server.js:

```javascript
// Add at the top of server.js
console.log('🚀 Starting MoodMate Backend...');
console.log('📊 Environment:', process.env.NODE_ENV);
console.log('🔌 Port:', process.env.PORT || 3000);
console.log('💾 Database URL exists:', !!process.env.DATABASE_URL);

// Add after server starts
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});
```

---

### Step 8: Test Endpoints Locally First

Before deploying, test everything works locally:

```bash
# Start local server
npm start

# Test health endpoint
curl http://localhost:3000/api/health

# Test database connection
curl http://localhost:3000/api/auth/register -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","name":"Test"}'
```

---

### Step 9: Common Render-Specific Issues

#### Issue: "Service keeps restarting"
**Cause:** Application crashes on startup
**Solution:** 
- Check logs for error messages
- Verify all environment variables are set
- Test database connection

#### Issue: "Build succeeds but deploy fails"
**Cause:** Runtime errors
**Solution:**
- Check start command is correct
- Verify server.js exists and is executable
- Check for missing environment variables

#### Issue: "502 Bad Gateway"
**Cause:** Service not responding on correct port
**Solution:**
- Ensure server listens on `process.env.PORT`
- Bind to `0.0.0.0` not `localhost`

---

### Step 10: Alternative Deployment Method

If Render continues to fail, try these alternatives:

1. **Railway.app** - Similar to Render, often more reliable
2. **Heroku** - Classic choice, has free tier
3. **DigitalOcean App Platform** - Good performance
4. **Vercel** - For serverless (but no WebSocket support)

---

## 🔧 Quick Fix Checklist

- [ ] Build command: `npm install && npx prisma generate`
- [ ] Start command: `npm start`
- [ ] All environment variables added
- [ ] DATABASE_URL is correct and URL-encoded
- [ ] Service shows "Live" status
- [ ] No errors in build logs
- [ ] No errors in runtime logs
- [ ] Health endpoint responds locally
- [ ] Database connection works locally

---

## 🆘 If Still Not Working

1. **Check Render Status Page** - render.com/status
2. **Contact Render Support** - They're usually helpful
3. **Try different region** - Some regions have issues
4. **Use different service name** - Sometimes names conflict

---

## 📞 Need Help?

If you're still stuck, provide these details:
1. Render service URL
2. Build logs (copy/paste errors)
3. Runtime logs (copy/paste errors)
4. Environment variables list (without values)
5. Service configuration screenshot

---

*Troubleshooting guide created: December 7, 2025*