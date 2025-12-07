# MoodMate API - Example Requests

## Authentication

### 1. Register User
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  },
  "token": "jwt-token-here"
}
```

### 2. Login
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### 3. Google OAuth Login
```bash
POST http://localhost:3000/api/auth/google
Content-Type: application/json

{
  "token": "google-id-token"
}
```

### 4. Get Current User
```bash
GET http://localhost:3000/api/auth/me
Authorization: Bearer <your-jwt-token>
```

### 5. Logout
```bash
POST http://localhost:3000/api/auth/logout
Authorization: Bearer <your-jwt-token>
```

## Mood Entries

### 1. Create Mood Entry
```bash
POST http://localhost:3000/api/moods
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "mood": "happy",
  "note": "Had a great day at work!"
}
```

**Valid mood values:** happy, sad, anxious, calm, excited, angry, neutral

### 2. Get All Mood Entries
```bash
GET http://localhost:3000/api/moods?limit=50
Authorization: Bearer <your-jwt-token>
```

### 3. Get Mood Entry by ID
```bash
GET http://localhost:3000/api/moods/:id
Authorization: Bearer <your-jwt-token>
```

### 4. Update Mood Entry
```bash
PUT http://localhost:3000/api/moods/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "mood": "calm",
  "note": "Feeling better now"
}
```

### 5. Delete Mood Entry
```bash
DELETE http://localhost:3000/api/moods/:id
Authorization: Bearer <your-jwt-token>
```

## Journal Entries

### 1. Create Journal Entry (with image)
```bash
POST http://localhost:3000/api/journals
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

title=My Amazing Day
content=Today was incredible! I accomplished so much.
moodEntryId=uuid-of-mood-entry (optional)
image=@/path/to/image.jpg
```

### 2. Create Journal Entry (without image)
```bash
POST http://localhost:3000/api/journals
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

title=Evening Thoughts
content=Reflecting on the day...
```

### 3. Get All Journal Entries
```bash
GET http://localhost:3000/api/journals?limit=50
Authorization: Bearer <your-jwt-token>
```

### 4. Get Journal Entry by ID
```bash
GET http://localhost:3000/api/journals/:id
Authorization: Bearer <your-jwt-token>
```

### 5. Update Journal Entry
```bash
PUT http://localhost:3000/api/journals/:id
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

title=Updated Title
content=Updated content
image=@/path/to/new-image.jpg (optional)
```

### 6. Delete Journal Entry
```bash
DELETE http://localhost:3000/api/journals/:id
Authorization: Bearer <your-jwt-token>
```

## User Profile

### 1. Get Profile
```bash
GET http://localhost:3000/api/users/profile
Authorization: Bearer <your-jwt-token>
```

### 2. Update Profile (with avatar)
```bash
PUT http://localhost:3000/api/users/profile
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data

name=John Updated
avatar=@/path/to/avatar.jpg
```

### 3. Update Profile (without avatar)
```bash
PUT http://localhost:3000/api/users/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "John Updated"
}
```

### 4. Get User Stats
```bash
GET http://localhost:3000/api/users/stats
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "stats": {
    "totalMoodEntries": 45,
    "totalJournalEntries": 23,
    "activeReminders": 3
  }
}
```

## Notifications

### 1. Get All Notifications
```bash
GET http://localhost:3000/api/notifications
Authorization: Bearer <your-jwt-token>
```

### 2. Get Unread Notifications Only
```bash
GET http://localhost:3000/api/notifications?unreadOnly=true
Authorization: Bearer <your-jwt-token>
```

### 3. Mark Notification as Read
```bash
PUT http://localhost:3000/api/notifications/:id/read
Authorization: Bearer <your-jwt-token>
```

### 4. Mark All Notifications as Read
```bash
PUT http://localhost:3000/api/notifications/read-all
Authorization: Bearer <your-jwt-token>
```

### 5. Delete Notification
```bash
DELETE http://localhost:3000/api/notifications/:id
Authorization: Bearer <your-jwt-token>
```

## Reminders

### 1. Create Reminder (One-time)
```bash
POST http://localhost:3000/api/reminders
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "message": "Time to journal your thoughts!",
  "time": "2024-12-07T10:00:00Z",
  "repeat": "none"
}
```

### 2. Create Daily Reminder
```bash
POST http://localhost:3000/api/reminders
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "message": "Daily mood check-in",
  "time": "2024-12-07T09:00:00Z",
  "repeat": "daily"
}
```

### 3. Create Weekly Reminder
```bash
POST http://localhost:3000/api/reminders
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "message": "Weekly reflection time",
  "time": "2024-12-07T18:00:00Z",
  "repeat": "weekly"
}
```

### 4. Get All Reminders
```bash
GET http://localhost:3000/api/reminders
Authorization: Bearer <your-jwt-token>
```

### 5. Get Active Reminders Only
```bash
GET http://localhost:3000/api/reminders?activeOnly=true
Authorization: Bearer <your-jwt-token>
```

### 6. Update Reminder
```bash
PUT http://localhost:3000/api/reminders/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "message": "Updated reminder message",
  "time": "2024-12-08T10:00:00Z",
  "active": true
}
```

### 7. Delete Reminder
```bash
DELETE http://localhost:3000/api/reminders/:id
Authorization: Bearer <your-jwt-token>
```

## Analytics

### 1. Get Mood Analytics (Last 30 days)
```bash
GET http://localhost:3000/api/analytics?days=30
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "analytics": {
    "moodCounts": {
      "happy": 15,
      "calm": 10,
      "anxious": 5,
      "sad": 3
    },
    "trendData": {
      "2024-12-01": { "happy": 2, "calm": 1 },
      "2024-12-02": { "anxious": 1, "happy": 1 }
    },
    "totalEntries": 33,
    "period": "30 days"
  }
}
```

### 2. Get Mood Analytics (Last 7 days)
```bash
GET http://localhost:3000/api/analytics?days=7
Authorization: Bearer <your-jwt-token>
```

### 3. Get Analytics History
```bash
GET http://localhost:3000/api/analytics/history?limit=10
Authorization: Bearer <your-jwt-token>
```

## Health Check

```bash
GET http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "MoodMate API is running"
}
```

## Socket.io Connection

### JavaScript Client Example
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
  auth: {
    token: 'your-jwt-token-here'
  }
});

// Listen for new notifications
socket.on('notification:new', (notification) => {
  console.log('New notification:', notification);
});

// Listen for mood created events
socket.on('mood:created', (moodEntry) => {
  console.log('New mood entry:', moodEntry);
});

// Mark notification as read
socket.emit('notification:read', { notificationId: 'uuid' });

// Handle connection
socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

## cURL Examples

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Create Mood Entry
```bash
curl -X POST http://localhost:3000/api/moods \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mood":"happy","note":"Great day!"}'
```

### Upload Journal with Image
```bash
curl -X POST http://localhost:3000/api/journals \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Day" \
  -F "content=Today was amazing" \
  -F "image=@/path/to/image.jpg"
```

### Get Analytics
```bash
curl -X GET "http://localhost:3000/api/analytics?days=30" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid token"
}
```

### 404 Not Found
```json
{
  "error": "Not found",
  "message": "Record not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```
