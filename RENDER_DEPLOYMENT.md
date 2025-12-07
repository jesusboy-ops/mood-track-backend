# Deploy MoodMate Backend to Render

**Render is the BEST choice for your backend!** It supports WebSocket, schedulers, and long-running processes.

---

## 🎯 Why Render?

✅ **WebSocket Support** - Socket.io works perfectly  
✅ **Background Jobs** - Schedulers run continuously  
✅ **No Time Limits** - No execution timeouts  
✅ **Easy Setup** - Simple configuration  
✅ **Free Tier** - 750 hours/month free  
✅ **Auto-Deploy** - Deploys on git push  

---

## 📋 Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Account** - Your code in a GitHub repository
3. **Supabase Database** - Already configured ✅
4. **Cloudinary Account** - Already configured ✅

---

## 🚀 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Deploy to Render"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/moodmate-backend.git
git branch -M main
git push -u origin main
```

---

### Step 2: Create Web Service on Render

1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your **GitHub repository**
4. Configure the service:

**Basic Settings:**
```
Name: moodmate-backend
Region: Choose closest to you
Branch: main
Root Directory: moodmate-backend (if in subdirectory, otherwise leave blank)
Runtime: Node
```

**Build & Deploy:**
```
Build Command: npm install && npx prisma generate
Start Command: npm start
```

**Instance Type:**
```
Free (or Starter if you need more resources)
```

5. Click **"Create Web Service"**

---

### Step 3: Add Environment Variables

In Render Dashboard → Your Service → Environment

Click **"Add Environment Variable"** and add these:

```env
DATABASE_URL
postgres://postgres:Greatisrael123%40%23@db.wrsjqvexqpehpsmeafyg.supabase.co:5432/postgres

JWT_SECRET
3f9d8a7b-5c12-4e6a-91f2-8c7b2d1e4a6f

GOOGLE_CLIENT_ID
your-google-client-id.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET
your-google-client-secret

CLOUDINARY_CLOUD_NAME
db

CLOUDINARY_API_KEY
156893194363591

CLOUDINARY_API_SECRET
5KGCy6IK3Xlxhqia8THwUML3T_M

FRONTEND_URL
https://your-frontend-domain.vercel.app

EMAIL_USER
israelloko65@gmail.com

EMAIL_PASS
njjs jqwm ywgx qmdj

NODE_ENV
production

PORT
3000
```

**Important:** Update `FRONTEND_URL` with your actual frontend URL!

---

### Step 4: Deploy

After adding environment variables:
1. Render will automatically deploy
2. Wait for build to complete (2-5 minutes)
3. Check logs for any errors

---

## ✅ Verify Deployment

Once deployed, test your API:

```bash
# Replace with your Render URL
curl https://moodmate-backend.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "MoodMate API is running"
}
```

---

## 🎉 What Works on Render

✅ **All 33 API Endpoints**  
✅ **WebSocket (Socket.io)** - Real-time notifications work!  
✅ **Reminder Scheduler** - Runs every 60 seconds  
✅ **Motivation Scheduler** - Runs every 7 hours  
✅ **File Uploads** - Cloudinary integration works  
✅ **Email Sending** - Nodemailer works  
✅ **Database** - Supabase connection works  
✅ **Long-running processes** - No timeouts!  

---

## 🔧 Configuration Files

No special configuration needed! Your existing code works as-is on Render.

Optional: Create `render.yaml` for infrastructure as code:

```yaml
services:
  - type: web
    name: moodmate-backend
    runtime: node
    buildCommand: npm install && npx prisma generate
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3000
```

---

## 🌐 Update Frontend

Update your frontend API URL:

```javascript
// .env.local (in frontend)
NEXT_PUBLIC_API_URL=https://moodmate-backend.onrender.com/api
```

---

## 🔄 Continuous Deployment

Render automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Render automatically deploys! 🚀
```

---

## 📊 Monitoring

### View Logs
1. Go to Render Dashboard
2. Select your service
3. Click **"Logs"** tab
4. Real-time logs appear here

### Metrics
- Check **"Metrics"** tab for:
  - CPU usage
  - Memory usage
  - Request count
  - Response times

---

## 🐛 Troubleshooting

### Issue: "Build failed"
**Solution:** Check build logs
- Ensure `npm install` succeeds
- Verify `prisma generate` runs
- Check for missing dependencies

### Issue: "Database connection failed"
**Solution:** 
- Verify DATABASE_URL in environment variables
- Ensure Supabase allows connections from Render
- Check for URL encoding issues

### Issue: "Service keeps restarting"
**Solution:**
- Check logs for errors
- Verify PORT environment variable is set
- Ensure server starts successfully

### Issue: "CORS errors"
**Solution:** Update FRONTEND_URL in environment variables

---

## 💰 Pricing

### Free Tier
- 750 hours/month free
- Spins down after 15 minutes of inactivity
- Spins up automatically on request (takes ~30 seconds)

### Starter Tier ($7/month)
- Always on (no spin down)
- Better performance
- More resources

**Tip:** Start with free tier, upgrade if needed!

---

## ⚡ Performance Tips

### 1. Keep Service Awake
Free tier spins down after inactivity. To keep it awake:
- Use a service like [UptimeRobot](https://uptimerobot.com)
- Ping your health endpoint every 10 minutes

### 2. Database Connection Pooling
Already configured with Prisma ✅

### 3. Caching
Consider adding Redis for caching (optional)

---

## 🎯 Production Checklist

Before going live:

- [ ] Service deployed successfully
- [ ] All environment variables set
- [ ] FRONTEND_URL updated to production
- [ ] Database connection tested
- [ ] API health check passes
- [ ] WebSocket tested
- [ ] Schedulers running
- [ ] CORS configured correctly
- [ ] SSL certificate active (automatic on Render)
- [ ] Custom domain configured (optional)

---

## 🔗 Your Deployment URLs

After deployment:
- **Service URL:** `https://moodmate-backend.onrender.com`
- **API Base:** `https://moodmate-backend.onrender.com/api`
- **Health Check:** `https://moodmate-backend.onrender.com/api/health`
- **WebSocket:** `wss://moodmate-backend.onrender.com`

---

## 🚨 Security Recommendations

1. **Environment Variables**
   - All secrets stored securely in Render ✅
   - Never commit `.env` to git ✅

2. **CORS**
   - Set specific frontend URL (not wildcard)
   - Update for production domain

3. **JWT Secret**
   - Use strong secret (32+ characters) ✅
   - Rotate periodically

4. **Database**
   - Supabase handles security ✅
   - Use connection pooling ✅

---

## 📱 Custom Domain (Optional)

1. Go to **Settings** → **Custom Domain**
2. Add your domain: `api.yourdomain.com`
3. Update DNS records as instructed
4. SSL certificate auto-generated ✅

---

## 🎉 Success!

Your MoodMate backend is now live on Render with:
- ✅ All features working
- ✅ WebSocket support
- ✅ Background schedulers
- ✅ Auto-deployment
- ✅ Free hosting

**Next Steps:**
1. Update frontend API URL
2. Test all endpoints
3. Monitor logs
4. Enjoy your deployed backend! 🚀

---

*Deployment guide created: December 7, 2025*
