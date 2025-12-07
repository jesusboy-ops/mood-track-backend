# MoodMate Backend - Deployment Guide

## Deployment Options

### Option 1: Railway (Recommended - Easiest)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Push your code to GitHub
   - Click "New Project" in Railway
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. **Set Environment Variables**
   - Go to your service → Variables
   - Add all variables from `.env`:
     ```
     JWT_SECRET=your-secret
     CLOUDINARY_CLOUD_NAME=your-cloud
     CLOUDINARY_API_KEY=your-key
     CLOUDINARY_API_SECRET=your-secret
     GOOGLE_CLIENT_ID=your-id
     GOOGLE_CLIENT_SECRET=your-secret
     EMAIL_USER=your-email
     EMAIL_PASS=your-password
     FRONTEND_URL=https://your-frontend.com
     NODE_ENV=production
     ```

5. **Deploy**
   - Railway auto-deploys on git push
   - Get your public URL from Railway dashboard

### Option 2: Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create PostgreSQL Database**
   - New → PostgreSQL
   - Copy the Internal Database URL

3. **Create Web Service**
   - New → Web Service
   - Connect your GitHub repository
   - Configure:
     - Name: moodmate-backend
     - Environment: Node
     - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
     - Start Command: `npm start`

4. **Add Environment Variables**
   - Add all variables from `.env`
   - Use the Internal Database URL for DATABASE_URL

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Option 3: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create moodmate-backend
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set CLOUDINARY_CLOUD_NAME=your-cloud
   heroku config:set CLOUDINARY_API_KEY=your-key
   heroku config:set CLOUDINARY_API_SECRET=your-secret
   heroku config:set EMAIL_USER=your-email
   heroku config:set EMAIL_PASS=your-password
   heroku config:set FRONTEND_URL=https://your-frontend.com
   heroku config:set NODE_ENV=production
   ```

5. **Add Procfile**
   Create `Procfile` in root:
   ```
   web: npm start
   release: npx prisma migrate deploy
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account**
   - Go to [digitalocean.com](https://digitalocean.com)

2. **Create App**
   - Apps → Create App
   - Connect GitHub repository

3. **Add Database**
   - Add Component → Database → PostgreSQL
   - Copy connection string

4. **Configure App**
   - Environment Variables: Add all from `.env`
   - Build Command: `npm install && npx prisma generate`
   - Run Command: `npm start`

5. **Deploy**
   - Click "Create Resources"

### Option 5: VPS (AWS EC2, DigitalOcean Droplet, etc.)

1. **Setup Server**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs
   
   # Install PostgreSQL
   sudo apt install postgresql postgresql-contrib
   ```

2. **Clone Repository**
   ```bash
   git clone https://github.com/yourusername/moodmate-backend.git
   cd moodmate-backend
   npm install
   ```

3. **Setup Environment**
   ```bash
   nano .env
   # Add all environment variables
   ```

4. **Setup Database**
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. **Install PM2**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name moodmate-backend
   pm2 startup
   pm2 save
   ```

6. **Setup Nginx (Optional)**
   ```bash
   sudo apt install nginx
   sudo nano /etc/nginx/sites-available/moodmate
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
   
   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/moodmate /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] DATABASE_URL points to production database
- [ ] JWT_SECRET is strong and unique
- [ ] NODE_ENV set to "production"
- [ ] FRONTEND_URL updated to production URL
- [ ] Cloudinary credentials verified
- [ ] Email credentials tested
- [ ] Database migrations run successfully
- [ ] All dependencies installed
- [ ] Logs directory created (or configured)
- [ ] CORS origins configured correctly

## Post-Deployment Steps

1. **Test Health Endpoint**
   ```bash
   curl https://your-api.com/api/health
   ```

2. **Test Authentication**
   ```bash
   curl -X POST https://your-api.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","password":"test123"}'
   ```

3. **Monitor Logs**
   - Check application logs for errors
   - Monitor database connections
   - Watch for failed requests

4. **Setup Monitoring**
   - Use service's built-in monitoring
   - Consider tools like Sentry for error tracking
   - Setup uptime monitoring (UptimeRobot, Pingdom)

## Environment-Specific Configuration

### Production

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://production-url
JWT_SECRET=super-secure-secret-min-32-chars
FRONTEND_URL=https://your-production-frontend.com
```

### Staging

```env
NODE_ENV=staging
PORT=3000
DATABASE_URL=postgresql://staging-url
JWT_SECRET=staging-secret
FRONTEND_URL=https://staging-frontend.com
```

## Database Migration Strategy

### For Zero-Downtime Deployments

1. **Create Migration**
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

2. **Test Locally**
   ```bash
   npx prisma migrate reset
   npx prisma migrate dev
   ```

3. **Deploy Migration**
   ```bash
   npx prisma migrate deploy
   ```

4. **Rollback if Needed**
   ```bash
   npx prisma migrate resolve --rolled-back migration_name
   ```

## Performance Optimization

### 1. Enable Compression
Add to server.js:
```javascript
import compression from 'compression';
app.use(compression());
```

### 2. Database Connection Pooling
Update DATABASE_URL:
```
postgresql://user:pass@host:5432/db?connection_limit=10
```

### 3. Enable Caching
Consider Redis for session storage and caching.

### 4. CDN for Static Assets
Use Cloudinary's CDN for images.

## Security Checklist

- [ ] HTTPS enabled (SSL certificate)
- [ ] Environment variables secured
- [ ] Database credentials rotated
- [ ] CORS properly configured
- [ ] Rate limiting implemented (optional)
- [ ] Helmet.js enabled
- [ ] SQL injection protection (Prisma handles this)
- [ ] XSS protection enabled
- [ ] Regular dependency updates

## Monitoring & Logging

### Recommended Tools

1. **Error Tracking**: Sentry
2. **Uptime Monitoring**: UptimeRobot
3. **Performance**: New Relic / DataDog
4. **Logs**: Papertrail / Loggly

### Setup Sentry (Optional)

```bash
npm install @sentry/node
```

Add to server.js:
```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

## Backup Strategy

### Database Backups

**Automated (Recommended)**
- Most hosting providers offer automated backups
- Enable daily backups with 7-day retention

**Manual**
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

### File Backups
- Cloudinary handles image backups
- No local file storage needed

## Scaling Considerations

### Horizontal Scaling
- Use load balancer (Nginx, AWS ALB)
- Ensure stateless application
- Use Redis for session storage

### Vertical Scaling
- Increase server resources
- Optimize database queries
- Add database indexes

### Database Scaling
- Enable connection pooling
- Add read replicas
- Consider database sharding for large scale

## Troubleshooting Deployment Issues

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check firewall rules
- Ensure database is accessible from deployment server

### Migration Fails
```bash
# Reset and retry
npx prisma migrate reset
npx prisma migrate deploy
```

### Port Issues
- Ensure PORT environment variable is set
- Check if port is already in use
- Use process.env.PORT in server.js

## Cost Optimization

### Free Tier Options
- **Railway**: $5 credit/month (enough for small apps)
- **Render**: Free tier available
- **Supabase**: Free PostgreSQL database
- **Cloudinary**: Free tier (25 credits/month)

### Paid Recommendations
- **Railway**: ~$10-20/month
- **Render**: ~$7/month
- **DigitalOcean**: ~$12/month (Droplet + Database)

## Support & Maintenance

### Regular Tasks
- [ ] Update dependencies monthly
- [ ] Review logs weekly
- [ ] Monitor error rates
- [ ] Check database performance
- [ ] Rotate secrets quarterly
- [ ] Review and optimize queries

### Update Dependencies
```bash
npm outdated
npm update
npm audit fix
```

## Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Heroku Docs](https://devcenter.heroku.com)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
