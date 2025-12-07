# Deploy MoodMate Backend to Vercel

Complete guide to deploy your MoodMate backend to Vercel.

---

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account** - Your code should be in a GitHub repository
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
git commit -m "Prepare for Vercel deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/moodmate-backend.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your **GitHub repository**
4. Configure project:
   - **Framework Preset:** Other
   - **Root Directory:** `moodmate-backend` (if in subdirectory)
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. Click **"Deploy"**

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd moodmate-backend
vercel
```

---

### Step 3: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:

```env
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@db.wrsjqvexqpehpsmeafyg.supabase.co:5432/postgres

JWT_SECRET=3f9d8a7b-5c12-4e6a-91f2-8c7b2d1e4a6f

GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET=your-google-client-secret

CLOUDINARY_CLOUD_NAME=db

CLOUDINARY_API_KEY=156893194363591

CLOUDINARY_API_SECRET=5KGCy6IK3Xlxhqia8THwUML3T_M

FRONTEND_URL=https://your-frontend-domain.vercel.app

EMAIL_USER=israelloko65@gmail.com

EMAIL_PASS=njjs jqwm ywgx qmdj

NODE_ENV=production
```

**Important:** Update `FRONTEND_URL` with your actual frontend URL!

---

### Step 4: Redeploy

After adding environment variables:
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. Check **"Use existing Build Cache"** ✅
4. Click **"Redeploy"**

---

## ✅ Verify Deployment

Once deployed, test your API:

```bash
# Replace with your Vercel URL
curl https://your-project.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "MoodMate API is running"
}
```

---

## 🔧 Important Notes

### 1. Serverless Limitations

Vercel uses serverless functions with these limits:
- **Execution Time:** 10 seconds (Hobby), 60 seconds (Pro)
- **Memory:** 1024 MB (Hobby), 3008 MB (Pro)
- **No WebSocket Support** on Vercel (Socket.io won't work)

### 2. WebSocket Alternative

Since Vercel doesn't support WebSockets, you have two options:

**Option A:** Deploy WebSocket separately
- Use [Railway.app](https://railway.app) or [Render.com](https://render.com) for WebSocket
- Keep REST API on Vercel

**Option B:** Use Vercel's alternatives
- Use polling instead of WebSocket
- Use Vercel's Edge Functions with Server-Sent Events (SSE)

### 3. File Uploads

File uploads work but files are stored temporarily. Cloudinary handles permanent storage ✅

### 4. Scheduled Tasks

Vercel Cron Jobs (for reminders and motivation scheduler):

Create `vercel.json` with cron:
```json
{
  "crons": [
    {
      "path": "/api/cron/reminders",
      "schedule": "*/1 * * * *"
    },
    {
      "path": "/api/cron/motivation",
      "schedule": "0 */7 * * *"
    }
  ]
}
```

---

## 🌐 Update Frontend

Update your frontend API URL:

```javascript
// .env.local (in frontend)
NEXT_PUBLIC_API_URL=https://your-project.vercel.app/api
```

---

## 🐛 Troubleshooting

### Issue: "Module not found"
**Solution:** Ensure all imports use `.js` extensions
```javascript
// ✅ Correct
import something from './file.js';

// ❌ Wrong
import something from './file';
```

### Issue: "Database connection failed"
**Solution:** 
- Check DATABASE_URL in Vercel environment variables
- Ensure Supabase allows connections from Vercel IPs
- Test connection: `npx prisma db push`

### Issue: "CORS errors"
**Solution:** Update FRONTEND_URL in Vercel environment variables

### Issue: "Build fails"
**Solution:** Check build logs in Vercel dashboard
- Ensure `prisma generate` runs successfully
- Check for missing dependencies

---

## 📊 Monitoring

### View Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click **"Logs"** tab
4. Filter by function or time

### Performance
- Check **"Analytics"** tab for performance metrics
- Monitor function execution time
- Track error rates

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push

# Vercel automatically deploys! 🚀
```

---

## 🎯 Production Checklist

Before going live:

- [ ] All environment variables set in Vercel
- [ ] FRONTEND_URL updated to production URL
- [ ] Database connection tested
- [ ] API health check passes
- [ ] CORS configured correctly
- [ ] JWT_SECRET is strong (32+ characters)
- [ ] Google OAuth credentials updated for production
- [ ] Cloudinary configured
- [ ] Email service tested
- [ ] Error logging configured
- [ ] Rate limiting implemented (optional)

---

## 🚨 Security Recommendations

1. **Rotate Secrets**
   - Generate new JWT_SECRET for production
   - Use different database for production

2. **Environment Variables**
   - Never commit `.env` to git ✅ (already in .gitignore)
   - Use Vercel's encrypted environment variables

3. **CORS**
   - Set specific frontend URL (not wildcard)
   - Update for production domain

4. **Rate Limiting**
   - Consider adding rate limiting middleware
   - Protect against abuse

---

## 📚 Useful Commands

```bash
# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm deployment-url

# Check environment variables
vercel env ls
```

---

## 🔗 Your Deployment URLs

After deployment, you'll get:
- **Production:** `https://your-project.vercel.app`
- **Preview:** `https://your-project-git-branch.vercel.app`
- **API Base:** `https://your-project.vercel.app/api`

---

## 🎉 Success!

Your MoodMate backend is now deployed on Vercel!

**Next Steps:**
1. Update frontend API URL
2. Test all endpoints
3. Monitor logs for errors
4. Set up custom domain (optional)

---

*Deployment guide created: December 7, 2025*
