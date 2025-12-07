# MoodMate Backend API

Production-ready backend for MoodMate - A comprehensive mood tracking application.

## Features

- User authentication (Email/Password + Google OAuth)
- Mood entry tracking
- Journal entries with image uploads
- Real-time notifications via Socket.io
- Email reminders
- Analytics and mood trends
- Secure file uploads to Cloudinary
- PostgreSQL database via Supabase
- Comprehensive error handling and logging

## Tech Stack

- Node.js + Express
- PostgreSQL (Supabase)
- Prisma ORM
- JWT Authentication
- Google OAuth
- Cloudinary (Image uploads)
- Socket.io (Real-time)
- Nodemailer (Email)
- Winston (Logging)
- Zod (Validation)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Update the `.env` file with your credentials:

```env
PORT=3000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NODE_ENV=development
```

### 3. Initialize Database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Start Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile (with avatar upload)
- `GET /api/users/stats` - Get user statistics

### Mood Entries
- `POST /api/moods` - Create mood entry
- `GET /api/moods` - Get all mood entries
- `GET /api/moods/:id` - Get mood entry by ID
- `PUT /api/moods/:id` - Update mood entry
- `DELETE /api/moods/:id` - Delete mood entry

### Journal Entries
- `POST /api/journals` - Create journal entry (with image upload)
- `GET /api/journals` - Get all journal entries
- `GET /api/journals/:id` - Get journal entry by ID
- `PUT /api/journals/:id` - Update journal entry
- `DELETE /api/journals/:id` - Delete journal entry

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `DELETE /api/notifications/:id` - Delete notification

### Reminders
- `POST /api/reminders` - Create reminder
- `GET /api/reminders` - Get reminders
- `PUT /api/reminders/:id` - Update reminder
- `DELETE /api/reminders/:id` - Delete reminder

### Analytics
- `GET /api/analytics?days=30` - Get mood analytics
- `GET /api/analytics/history` - Get analytics history

## Example API Requests

### Register User
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Mood Entry
```json
POST /api/moods
Headers: { "Authorization": "Bearer <token>" }
{
  "mood": "happy",
  "note": "Had a great day!"
}
```

### Create Journal Entry (with image)
```
POST /api/journals
Headers: { "Authorization": "Bearer <token>" }
Content-Type: multipart/form-data

title: "My Day"
content: "Today was amazing..."
moodEntryId: "uuid-here"
image: <file>
```

### Create Reminder
```json
POST /api/reminders
Headers: { "Authorization": "Bearer <token>" }
{
  "message": "Time to journal!",
  "time": "2024-12-07T10:00:00Z",
  "repeat": "daily"
}
```

## Socket.io Events

### Client to Server
- `notification:read` - Mark notification as read

### Server to Client
- `mood:created` - New mood entry created
- `notification:new` - New notification
- `notification:updated` - Notification updated

### Connection
```javascript
const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token'
  }
});

socket.on('notification:new', (notification) => {
  console.log('New notification:', notification);
});
```

## Project Structure

```
moodmate-backend/
├── src/
│   ├── config/          # Configuration files
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── routes/          # Express routes
│   ├── middlewares/     # Custom middleware
│   ├── sockets/         # Socket.io handlers
│   ├── utils/           # Helper functions
│   └── prisma/          # Prisma client
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables
├── package.json
└── server.js            # Entry point
```

## License

MIT
