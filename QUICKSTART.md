# MoodMate Backend - Quick Start

Get up and running in 5 minutes!

## Prerequisites

- Node.js v18+ installed
- PostgreSQL database (Supabase account recommended)
- Cloudinary account (free tier works)

## Quick Setup

### 1. Install Dependencies (1 min)

```bash
cd moodmate-backend
npm install
```

### 2. Configure Environment (2 min)

Copy the example environment file:
```bash
copy .env.example .env
```

**Minimum required configuration:**

Edit `.env` and update these values:

```env
# Required: Your Supabase database URL
DATABASE_URL=postgres://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres

# Required: Any random string (32+ characters recommended)
JWT_SECRET=change-this-to-a-random-secret-key-min-32-chars

# Required: Your Cloudinary credentials
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Required: Your Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Optional: Google OAuth (can skip for now)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Quick Tips:**
- Get Supabase URL: [supabase.com](https://supabase.com) → New Project → Settings → Database
- Get Cloudinary: [cloudinary.com](https://cloudinary.com) → Dashboard
- Gmail App Password: Google Account → Security → 2-Step Verification → App passwords

### 3. Initialize Database (1 min)

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Server (30 sec)

```bash
npm run dev
```

You should see:
```
Server running on port 3000
Database connected successfully
Socket.io initialized
Reminder scheduler started
```

### 5. Test It! (30 sec)

Open a new terminal and test:

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"ok","message":"MoodMate API is running"}
```

## First API Call

Register a user:

```bash
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"password\":\"password123\"}"
```

Save the returned `token` and use it for authenticated requests!

## What's Next?

- ✅ Read [API_EXAMPLES.md](./API_EXAMPLES.md) for all endpoints
- ✅ Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed configuration
- ✅ View [README.md](./README.md) for full documentation

## Common Issues

**Database connection failed?**
- Check DATABASE_URL is correct
- Ensure password is URL-encoded (`@` → `%40`, `#` → `%23`)

**Port 3000 already in use?**
- Change `PORT=3001` in `.env`

**Prisma errors?**
- Run `npx prisma generate` again
- Try `npx prisma migrate reset` (WARNING: deletes data)

## Project Structure

```
moodmate-backend/
├── src/
│   ├── config/          # Database, Cloudinary, Email, Socket
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── routes/          # API routes
│   ├── middlewares/     # Auth, validation, errors
│   ├── sockets/         # Real-time Socket.io
│   ├── utils/           # Helpers, logger, scheduler
│   └── prisma/          # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Your configuration
├── server.js            # Entry point
└── package.json
```

## Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start with auto-reload (nodemon)
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:studio     # Open Prisma Studio (DB GUI)
```

## Need Help?

1. Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) troubleshooting section
2. Review [API_EXAMPLES.md](./API_EXAMPLES.md) for request examples
3. Check `logs/error.log` for error details

Happy coding! 🚀
