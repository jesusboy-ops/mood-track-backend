# 🔧 Supabase Connection Fix for Render

## The Problem
Your Render deployment is failing because it can't connect to Supabase. The error:
```
Can't reach database server at `db.wrsjqvexqpehpsmeafyg.supabase.co:5432`
```

## The Solution
Supabase requires **connection pooling** for external connections like Render.

---

## Step 1: Get the Correct DATABASE_URL

1. Go to your **Supabase Dashboard**
2. Click on your project
3. Go to **Settings** → **Database**
4. Look for **Connection Pooling** section
5. Copy the **Connection pooling** URL (not the direct connection)

The URL should look like:
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Key differences:**
- Uses `pooler.supabase.com` (not `db.supabase.com`)
- Port `6543` (not `5432`)
- Has `?pgbouncer=true` parameter

---

## Step 2: Update Environment Variables in Render

1. Go to **Render Dashboard**
2. Select your service
3. Go to **Environment** tab
4. Update `DATABASE_URL` with the **pooler URL**

**Example:**
```env
DATABASE_URL=postgresql://postgres.wrsjqvexqpehpsmeafyg:Greatisrael123%40%23@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Important:** Make sure to URL-encode your password:
- `@` becomes `%40`
- `#` becomes `%23`

---

## Step 3: Alternative - Use Transaction Mode

If pooler doesn't work, try **Transaction mode**:

```env
DATABASE_URL=postgresql://postgres.wrsjqvexqpehpsmeafyg:Greatisrael123%40%23@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

---

## Step 4: Test Connection Locally First

Before deploying, test the new URL locally:

1. Update your local `.env` file with the pooler URL
2. Run: `npm start`
3. Test: `curl http://localhost:3000/api/health`

If it works locally, it should work on Render.

---

## Step 5: Redeploy on Render

After updating the DATABASE_URL:
1. Go to **Deployments** tab
2. Click **"Redeploy"**
3. Monitor the logs

You should see:
```
✅ Database connected successfully
```

---

## Alternative Solutions

### Option 1: Use Direct Connection with SSL
```env
DATABASE_URL=postgres://postgres:Greatisrael123%40%23@db.wrsjqvexqpehpsmeafyg.supabase.co:5432/postgres?sslmode=require
```

### Option 2: Use Supabase REST API
Instead of direct database connection, use Supabase's REST API for some operations.

### Option 3: Different Database
If Supabase continues to have issues, consider:
- **Neon.tech** - Postgres with better connection handling
- **PlanetScale** - MySQL with edge connections
- **Railway PostgreSQL** - Simple setup

---

## Debugging Steps

1. **Check Supabase Status**: supabase.com/status
2. **Verify Project is Active**: Check Supabase dashboard
3. **Test with psql**: 
   ```bash
   psql "postgresql://postgres.wrsjqvexqpehpsmeafyg:PASSWORD@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   ```

---

## Expected Render Logs After Fix

```
🚀 Starting MoodMate Backend...
📊 Environment: production
🔌 Port: 3000
💾 Database URL exists: true
🔑 JWT Secret exists: true
📡 Connecting to database...
✅ Database connected successfully
🔌 Setting up Socket.io...
✅ Socket.io configured
⏰ Starting reminder scheduler...
✅ Reminder scheduler started
💪 Starting motivation scheduler...
✅ Motivation scheduler started
🚀 Server running on port 3000
```

---

*Fix guide created: December 7, 2025*