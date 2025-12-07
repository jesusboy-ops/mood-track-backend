# MoodMate Backend - Complete Setup Guide

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (Supabase recommended)
- Cloudinary account
- Google OAuth credentials (optional)
- Gmail account for email notifications

## Step-by-Step Setup

### 1. Install Dependencies

```bash
cd moodmate-backend
npm install
```

### 2. Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to Settings > Database
4. Copy the connection string (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password
6. URL encode special characters in password (e.g., `@` becomes `%40`, `#` becomes `%23`)

Example:
```
postgres://postgres:MyPass%40123@db.abcdefgh.supabase.co:5432/postgres
```

### 3. Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com) and sign up
2. Go to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add them to `.env` file

### 4. Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials > Create Credentials > OAuth 2.0 Client ID
5. Configure consent screen
6. Add authorized redirect URIs
7. Copy Client ID and Client Secret

### 5. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account > Security > 2-Step Verification
3. Scroll to "App passwords"
4. Generate a new app password for "Mail"
5. Copy the 16-character password
6. Add to `.env` as EMAIL_PASS (without spaces)

### 6. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values.

### 7. Initialize Database

Generate Prisma Client:
```bash
npx prisma generate
```

Run database migrations:
```bash
npx prisma migrate dev --name init
```

View database in Prisma Studio (optional):
```bash
npx prisma studio
```

### 8. Create Required Directories

The server will create these automatically, but you can create them manually:

```bash
mkdir uploads
mkdir logs
```

### 9. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### 10. Verify Installation

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "MoodMate API is running"
}
```

## Testing the API

### 1. Register a User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the returned `token` for subsequent requests.

### 2. Create a Mood Entry

```bash
curl -X POST http://localhost:3000/api/moods \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "mood": "happy",
    "note": "Testing the API!"
  }'
```

### 3. Get Mood Entries

```bash
curl -X GET http://localhost:3000/api/moods \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

### Database Connection Issues

**Error:** `Can't reach database server`

**Solution:**
- Check your DATABASE_URL is correct
- Ensure special characters in password are URL encoded
- Verify Supabase project is active
- Check firewall/network settings

### Prisma Migration Issues

**Error:** `Migration failed`

**Solution:**
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Then run migrations again
npx prisma migrate dev --name init
```

### Cloudinary Upload Issues

**Error:** `Cloudinary upload failed`

**Solution:**
- Verify CLOUDINARY credentials in .env
- Check API key is active
- Ensure uploads directory exists and is writable

### Email Sending Issues

**Error:** `Email send failed`

**Solution:**
- Verify Gmail app password is correct (no spaces)
- Ensure 2FA is enabled on Gmail account
- Check EMAIL_USER and EMAIL_PASS in .env
- Try generating a new app password

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solution:**
```bash
# Change PORT in .env file
PORT=3001

# Or kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:3000 | xargs kill -9
```

### JWT Token Issues

**Error:** `Invalid token`

**Solution:**
- Ensure JWT_SECRET is set in .env
- Token might be expired (7 days validity)
- Login again to get a new token

## Production Deployment

### Environment Variables

Set `NODE_ENV=production` in your production environment.

### Database

- Use connection pooling for better performance
- Enable SSL for database connections
- Regular backups recommended

### Security

- Use strong JWT_SECRET (32+ characters)
- Enable HTTPS
- Set proper CORS origins
- Use environment-specific .env files
- Never commit .env to version control

### Monitoring

- Check logs in `logs/` directory
- Monitor error.log for issues
- Set up log rotation for production

### Performance

- Enable database query caching
- Use CDN for Cloudinary images
- Implement rate limiting
- Enable compression middleware

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [Cloudinary API Reference](https://cloudinary.com/documentation)
- [Supabase Documentation](https://supabase.com/docs)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API_EXAMPLES.md for request formats
3. Check logs in `logs/` directory
4. Verify all environment variables are set correctly
