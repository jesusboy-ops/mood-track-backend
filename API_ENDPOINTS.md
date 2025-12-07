# MoodMate API - Complete Endpoint Reference

**Base URL:** `http://localhost:3000/api`  
**Version:** 1.0.0  
**Last Updated:** December 6, 2025  
**Total Endpoints:** 33

---

## 🚀 Quick Reference - All 33 Endpoints

### Authentication (5)
1. POST `/api/auth/register` - Register new user
2. POST `/api/auth/login` - Login user
3. POST `/api/auth/google` - Google OAuth login
4. POST `/api/auth/logout` - Logout user
5. GET `/api/auth/me` - Get current user

### Users (3)
6. GET `/api/users/profile` - Get user profile
7. PUT `/api/users/profile` - Update profile
8. GET `/api/users/stats` - Get user statistics

### Mood Entries (5)
9. POST `/api/moods` - Create mood entry
10. GET `/api/moods` - Get all mood entries
11. GET `/api/moods/:id` - Get mood entry by ID
12. PUT `/api/moods/:id` - Update mood entry
13. DELETE `/api/moods/:id` - Delete mood entry

### Journal Entries (5)
14. POST `/api/journals` - Create journal entry
15. GET `/api/journals` - Get all journal entries
16. GET `/api/journals/:id` - Get journal entry by ID
17. PUT `/api/journals/:id` - Update journal entry
18. DELETE `/api/journals/:id` - Delete journal entry

### Notifications (4)
19. GET `/api/notifications` - Get all notifications
20. PUT `/api/notifications/:id/read` - Mark notification as read
21. PUT `/api/notifications/read-all` - Mark all as read
22. DELETE `/api/notifications/:id` - Delete notification

### Reminders (4)
23. POST `/api/reminders` - Create reminder
24. GET `/api/reminders` - Get all reminders
25. PUT `/api/reminders/:id` - Update reminder
26. DELETE `/api/reminders/:id` - Delete reminder

### Motivation (4)
27. GET `/api/motivation/:mood` - Get motivational message by mood
28. GET `/api/motivation` - Get all motivational messages
29. POST `/api/motivation` - Create motivational message
30. POST `/api/motivation/seed` - Seed motivational messages

### Analytics (2)
31. GET `/api/analytics` - Get mood analytics
32. GET `/api/analytics/history` - Get analytics history

### Health Check (1)
33. GET `/api/health` - Check server status

---

## 📋 Table of Contents

1. [Authentication](#authentication)
2. [Users](#users)
3. [Mood Entries](#mood-entries)
4. [Journal Entries](#journal-entries)
5. [Notifications](#notifications)
6. [Reminders](#reminders)
7. [Motivation](#motivation)
8. [Analytics](#analytics)
9. [Health Check](#health-check)

---

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication

### 1. Register User
**POST** `/api/auth/register`

**Description:** Create a new user account

**Authentication:** None (Public)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation:**
- `name`: String, min 2 characters
- `email`: Valid email format
- `password`: String, min 6 characters

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null,
    "createdAt": "2025-12-06T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Validation failed
- `409`: User already exists

---

### 2. Login User
**POST** `/api/auth/login`

**Description:** Login with email and password

**Authentication:** None (Public)

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Invalid credentials

---

### 3. Google OAuth Login
**POST** `/api/auth/google`

**Description:** Login or register using Google OAuth

**Authentication:** None (Public)

**Request Body:**
```json
{
  "token": "google-oauth-token-here"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://lh3.googleusercontent.com/...",
    "googleId": "google-user-id"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `400`: Invalid token
- `401`: Authentication failed

---

### 4. Logout User
**POST** `/api/auth/logout`

**Description:** Logout and invalidate session

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** None

**Success Response (200):**
```json
{
  "message": "Logout successful"
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 5. Get Current User
**GET** `/api/auth/me`

**Description:** Get currently authenticated user details

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": null,
    "googleId": null,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized

---

## Users

### 6. Get User Profile
**GET** `/api/users/profile`

**Description:** Get detailed user profile

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://res.cloudinary.com/...",
    "googleId": null,
    "createdAt": "2025-12-06T10:00:00.000Z",
    "updatedAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 7. Update User Profile
**PUT** `/api/users/profile`

**Description:** Update user profile (name, email, avatar)

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
name: "John Updated"
email: "john.new@example.com"
avatar: <file> (optional, image file)
```

**Success Response (200):**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "name": "John Updated",
    "email": "john.new@example.com",
    "avatar": "https://res.cloudinary.com/..."
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized

---

### 8. Get User Statistics
**GET** `/api/users/stats`

**Description:** Get user statistics (mood count, journal count, etc.)

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "stats": {
    "totalMoods": 45,
    "totalJournals": 23,
    "totalNotifications": 12,
    "unreadNotifications": 3,
    "activeReminders": 5
  }
}
```

**Error Responses:**
- `401`: Unauthorized

---

## Mood Entries

### 9. Create Mood Entry
**POST** `/api/moods`

**Description:** Create a new mood entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "mood": "happy",
  "note": "Had a great day at work!"
}
```

**Validation:**
- `mood`: Enum ["happy", "sad", "anxious", "calm", "excited", "angry", "neutral"]
- `note`: String (optional)

**Success Response (201):**
```json
{
  "message": "Mood entry created",
  "moodEntry": {
    "id": "uuid",
    "userId": "uuid",
    "mood": "happy",
    "note": "Had a great day at work!",
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Real-time Event:** Emits `mood:created` via WebSocket

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized

---

### 10. Get All Mood Entries
**GET** `/api/moods`

**Description:** Get all mood entries for the authenticated user

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of entries to return (default: 50)

**Example:** `/api/moods?limit=20`

**Success Response (200):**
```json
{
  "moodEntries": [
    {
      "id": "uuid",
      "userId": "uuid",
      "mood": "happy",
      "note": "Great day!",
      "createdAt": "2025-12-06T10:00:00.000Z"
    },
    {
      "id": "uuid",
      "userId": "uuid",
      "mood": "calm",
      "note": "Relaxing evening",
      "createdAt": "2025-12-05T18:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 11. Get Mood Entry by ID
**GET** `/api/moods/:id`

**Description:** Get a specific mood entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Mood entry UUID

**Example:** `/api/moods/123e4567-e89b-12d3-a456-426614174000`

**Success Response (200):**
```json
{
  "moodEntry": {
    "id": "uuid",
    "userId": "uuid",
    "mood": "happy",
    "note": "Great day!",
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Mood entry not found

---

### 12. Update Mood Entry
**PUT** `/api/moods/:id`

**Description:** Update a mood entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Mood entry UUID

**Request Body:**
```json
{
  "mood": "excited",
  "note": "Updated note"
}
```

**Success Response (200):**
```json
{
  "message": "Mood entry updated"
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized
- `404`: Mood entry not found

---

### 13. Delete Mood Entry
**DELETE** `/api/moods/:id`

**Description:** Delete a mood entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Mood entry UUID

**Success Response (200):**
```json
{
  "message": "Mood entry deleted"
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Mood entry not found

---

## Journal Entries

### 14. Create Journal Entry
**POST** `/api/journals`

**Description:** Create a new journal entry with optional image

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
title: "My Amazing Day"
content: "Today was incredible because..."
moodEntryId: "uuid" (optional)
image: <file> (optional, image file)
```

**Success Response (201):**
```json
{
  "message": "Journal entry created",
  "journalEntry": {
    "id": "uuid",
    "userId": "uuid",
    "moodEntryId": "uuid",
    "title": "My Amazing Day",
    "content": "Today was incredible because...",
    "imageUrl": "https://res.cloudinary.com/...",
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized

---

### 15. Get All Journal Entries
**GET** `/api/journals`

**Description:** Get all journal entries for the authenticated user

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `limit` (optional): Number of entries (default: 50)

**Success Response (200):**
```json
{
  "journalEntries": [
    {
      "id": "uuid",
      "userId": "uuid",
      "moodEntryId": "uuid",
      "title": "My Day",
      "content": "Today was...",
      "imageUrl": "https://res.cloudinary.com/...",
      "createdAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 16. Get Journal Entry by ID
**GET** `/api/journals/:id`

**Description:** Get a specific journal entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Journal entry UUID

**Success Response (200):**
```json
{
  "journalEntry": {
    "id": "uuid",
    "userId": "uuid",
    "moodEntryId": "uuid",
    "title": "My Day",
    "content": "Today was...",
    "imageUrl": "https://res.cloudinary.com/...",
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Journal entry not found

---

### 17. Update Journal Entry
**PUT** `/api/journals/:id`

**Description:** Update a journal entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**URL Parameters:**
- `id`: Journal entry UUID

**Request Body (Form Data):**
```
title: "Updated Title"
content: "Updated content"
image: <file> (optional, new image)
```

**Success Response (200):**
```json
{
  "message": "Journal entry updated"
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized
- `404`: Journal entry not found

---

### 18. Delete Journal Entry
**DELETE** `/api/journals/:id`

**Description:** Delete a journal entry

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Journal entry UUID

**Success Response (200):**
```json
{
  "message": "Journal entry deleted"
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Journal entry not found

---

## Notifications

### 19. Get All Notifications
**GET** `/api/notifications`

**Description:** Get all notifications for the authenticated user

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `unreadOnly` (optional): Boolean, filter unread only

**Example:** `/api/notifications?unreadOnly=true`

**Success Response (200):**
```json
{
  "notifications": [
    {
      "id": "uuid",
      "userId": "uuid",
      "message": "Your reminder is due!",
      "read": false,
      "createdAt": "2025-12-06T10:00:00.000Z"
    },
    {
      "id": "uuid",
      "userId": "uuid",
      "message": "Welcome to MoodMate!",
      "read": true,
      "createdAt": "2025-12-05T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 20. Mark Notification as Read
**PUT** `/api/notifications/:id/read`

**Description:** Mark a specific notification as read

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Notification UUID

**Success Response (200):**
```json
{
  "message": "Notification marked as read"
}
```

**Real-time Event:** Emits `notification:updated` via WebSocket

**Error Responses:**
- `401`: Unauthorized
- `404`: Notification not found

---

### 21. Mark All Notifications as Read
**PUT** `/api/notifications/read-all`

**Description:** Mark all notifications as read

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "All notifications marked as read"
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 22. Delete Notification
**DELETE** `/api/notifications/:id`

**Description:** Delete a notification

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Notification UUID

**Success Response (200):**
```json
{
  "message": "Notification deleted"
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Notification not found

---

## Reminders

### 23. Create Reminder
**POST** `/api/reminders`

**Description:** Create a new reminder

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "message": "Time to journal!",
  "time": "2025-12-07T10:00:00Z",
  "repeat": "daily"
}
```

**Validation:**
- `message`: String, min 1 character
- `time`: ISO 8601 datetime string
- `repeat`: Enum ["none", "daily", "weekly"] (default: "none")

**Success Response (201):**
```json
{
  "message": "Reminder created",
  "reminder": {
    "id": "uuid",
    "userId": "uuid",
    "message": "Time to journal!",
    "time": "2025-12-07T10:00:00.000Z",
    "repeat": "daily",
    "active": true,
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized

---

### 24. Get All Reminders
**GET** `/api/reminders`

**Description:** Get all reminders for the authenticated user

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `activeOnly` (optional): Boolean, filter active only

**Example:** `/api/reminders?activeOnly=true`

**Success Response (200):**
```json
{
  "reminders": [
    {
      "id": "uuid",
      "userId": "uuid",
      "message": "Time to journal!",
      "time": "2025-12-07T10:00:00.000Z",
      "repeat": "daily",
      "active": true,
      "createdAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 25. Update Reminder
**PUT** `/api/reminders/:id`

**Description:** Update a reminder

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Reminder UUID

**Request Body:**
```json
{
  "message": "Updated message",
  "time": "2025-12-08T10:00:00Z",
  "repeat": "weekly",
  "active": false
}
```

**Success Response (200):**
```json
{
  "message": "Reminder updated"
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized
- `404`: Reminder not found

---

### 26. Delete Reminder
**DELETE** `/api/reminders/:id`

**Description:** Delete a reminder

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Reminder UUID

**Success Response (200):**
```json
{
  "message": "Reminder deleted"
}
```

**Error Responses:**
- `401`: Unauthorized
- `404`: Reminder not found

---

## Motivation

### 27. Get Motivational Message by Mood
**GET** `/api/motivation/:mood`

**Description:** Get a random motivational message based on mood or mood type

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `mood`: Mood name or type
  - Mood names: "happy", "sad", "anxious", "calm", "excited", "angry", "neutral"
  - Mood types: "positive", "neutral", "negative"

**Examples:** 
- `/api/motivation/happy`
- `/api/motivation/sad`
- `/api/motivation/positive`

**Success Response (200):**
```json
{
  "motivation": {
    "id": "uuid",
    "moodType": "positive",
    "content": "🌟 Keep shining! Your positive energy is contagious!",
    "createdAt": "2025-12-06T10:00:00.000Z"
  },
  "moodType": "positive"
}
```

**Error Responses:**
- `400`: Invalid mood
- `401`: Unauthorized
- `404`: No motivational messages found

---

### 28. Get All Motivational Messages
**GET** `/api/motivation`

**Description:** Get all motivational messages (admin)

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "motivations": [
    {
      "id": "uuid",
      "moodType": "positive",
      "content": "🌟 Keep shining! Your positive energy is contagious!",
      "createdAt": "2025-12-06T10:00:00.000Z"
    },
    {
      "id": "uuid",
      "moodType": "negative",
      "content": "💪 Tough times don't last, but tough people do. You've got this!",
      "createdAt": "2025-12-06T10:00:00.000Z"
    }
  ],
  "count": 24
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 29. Create Motivational Message
**POST** `/api/motivation`

**Description:** Create a new motivational message (admin)

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "moodType": "positive",
  "content": "🎉 You're amazing! Keep being awesome!"
}
```

**Validation:**
- `moodType`: Enum ["positive", "neutral", "negative"]
- `content`: String, min 1 character

**Success Response (201):**
```json
{
  "message": "Motivational message created",
  "motivation": {
    "id": "uuid",
    "moodType": "positive",
    "content": "🎉 You're amazing! Keep being awesome!",
    "createdAt": "2025-12-06T10:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation failed
- `401`: Unauthorized

---

### 30. Seed Motivational Messages
**POST** `/api/motivation/seed`

**Description:** Seed initial motivational messages (admin)

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Successfully seeded 24 motivational messages",
  "count": 24
}
```

**If already seeded:**
```json
{
  "message": "Motivational messages already seeded"
}
```

**Error Responses:**
- `401`: Unauthorized

---

## Analytics

### 31. Get Mood Analytics
**GET** `/api/analytics`

**Description:** Get mood analytics and trends

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `days` (optional): Number of days to analyze (default: 30)

**Example:** `/api/analytics?days=7`

**Success Response (200):**
```json
{
  "analytics": {
    "moodCounts": {
      "happy": 15,
      "sad": 3,
      "anxious": 5,
      "calm": 10,
      "excited": 8,
      "angry": 2,
      "neutral": 7
    },
    "trendData": [
      {
        "date": "2025-12-06",
        "mood": "happy",
        "count": 3
      },
      {
        "date": "2025-12-05",
        "mood": "calm",
        "count": 2
      }
    ],
    "totalEntries": 50,
    "averageMoodPerDay": 1.67,
    "mostFrequentMood": "happy"
  }
}
```

**Error Responses:**
- `401`: Unauthorized

---

### 32. Get Analytics History
**GET** `/api/analytics/history`

**Description:** Get historical analytics logs

**Authentication:** Required

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "history": [
    {
      "id": "uuid",
      "userId": "uuid",
      "moodCounts": {
        "happy": 15,
        "sad": 3
      },
      "trendData": [...],
      "createdAt": "2025-12-06T10:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized

---

## Health Check

### 33. Health Check
**GET** `/api/health`

**Description:** Check if the API is running

**Authentication:** None (Public)

**Success Response (200):**
```json
{
  "status": "ok",
  "message": "MoodMate API is running"
}
```

---

## 📡 WebSocket Events

### Connection
```javascript
const socket = io('http://localhost:3000', {
  auth: { token: 'your-jwt-token' }
});
```

### Server → Client Events

#### mood:created
Emitted when a mood entry is created
```json
{
  "id": "uuid",
  "userId": "uuid",
  "mood": "happy",
  "note": "Great day!",
  "createdAt": "2025-12-06T10:00:00.000Z"
}
```

#### notification:new
Emitted when a new notification is created
```json
{
  "id": "uuid",
  "userId": "uuid",
  "message": "Your reminder is due!",
  "read": false,
  "createdAt": "2025-12-06T10:00:00.000Z"
}
```

#### notification:updated
Emitted when a notification is marked as read
```json
{
  "notificationId": "uuid"
}
```

### Client → Server Events

#### notification:read
Mark a notification as read
```javascript
socket.emit('notification:read', {
  notificationId: 'uuid'
});
```

---

## 🔒 Error Responses

### Standard Error Format
```json
{
  "error": "Error message here"
}
```

### Validation Error Format
```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 6 characters"
    }
  ]
}
```

### Common HTTP Status Codes
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (missing or invalid token)
- `404`: Not Found
- `409`: Conflict (e.g., user already exists)
- `500`: Internal Server Error

---

## 📊 Summary

**Total Endpoints:** 33

- **Authentication:** 5 endpoints
- **Users:** 3 endpoints
- **Mood Entries:** 5 endpoints
- **Journal Entries:** 5 endpoints
- **Notifications:** 4 endpoints
- **Reminders:** 4 endpoints
- **Motivation:** 4 endpoints
- **Analytics:** 2 endpoints
- **Health Check:** 1 endpoint

**WebSocket Events:** 4 events (3 server→client, 1 client→server)

---

*Last updated: December 6, 2025*
