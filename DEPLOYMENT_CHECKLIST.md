# MoodMate Backend - Vercel Deployment Checklist

## ✅ Pre-Deployment

- [ ] Code pushed to GitHub
- [ ] All tests passing locally
- [ ] Environment variables documented
- [ ] Database is accessible from internet (Supabase ✅)
- [ ] Cloudinary configured
- [ ] Google OAuth credentials ready

## ✅ Vercel Setup

- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Build command set: `npm run vercel-build`
- [ ] All environment variables added:
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET
  - [ ] GOOGLE_CLIENT_ID
  - [ ] GOOGLE_CLIENT_SECRET
  - [ ] CLOUDINARY_CLOUD_NAME
  - [ ] CLOUDINARY_API_KEY
  - [ ] CLOUDINARY_API_SECRET
  - [ ] FRONTEND_URL
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASS
  - [ ] NODE_ENV=production

## ✅ Post-Deployment

- [ ] Health check endpoint works: `/api/health`
- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens generated correctly
- [ ] Database queries working
- [ ] File uploads to Cloudinary working
- [ ] Email sending working
- [ ] CORS configured for frontend domain

## ✅ Frontend Integration

- [ ] Frontend API_URL updated to Vercel URL
- [ ] Frontend deployed
- [ ] End-to-end testing completed
- [ ] All features working in production

## ⚠️ Known Limitations

- ❌ WebSocket (Socket.io) won't work on Vercel
  - Solution: Use polling or deploy WebSocket separately
- ⚠️ Scheduled tasks need Vercel Cron Jobs
- ⚠️ 10-second execution limit (Hobby plan)

## 🎯 Your Vercel URL

After deployment, update this:
```
Production URL: https://your-project.vercel.app
API Base URL: https://your-project.vercel.app/api
```

## 📝 Notes

- Vercel automatically deploys on git push
- Check logs in Vercel dashboard for errors
- Monitor function execution times
- Set up custom domain if needed

---

**Ready to deploy? Follow VERCEL_DEPLOYMENT.md for detailed steps!**
