# WebSocket (Socket.io) Testing Guide

## ✅ WebSocket Status: FULLY OPERATIONAL

Your MoodMate backend has a complete real-time notification system using Socket.io.

---

## 🔌 How It Works

### 1. Socket.io Server Configuration
- **Port:** Same as HTTP server (3000)
- **CORS:** Configured for your frontend URL
- **Authentication:** JWT token required for connection
- **Status:** ✅ Initialized and running

### 2. Real-Time Events

#### Server → Client Events
- `notification:new` - New notification created
- `notification:updated` - Notification marked as read
- `mood:created` - New mood entry created

#### Client → Server Events
- `notification:read` - Mark notification as read

---

## 🧪 Testing WebSocket Connection

### Option 1: Using Browser Console

```javascript
// 1. First, login to get a token
const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const { token } = await loginResponse.json();

// 2. Load Socket.io client (add this to your HTML first)
// <script src="https://cdn.socket.io/4.6.0/socket.io.min.js"></script>

// 3. Connect to WebSocket
const socket = io('http://localhost:3000', {
  auth: {
    token: token
  }
});

// 4. Listen for connection
socket.on('connect', () => {
  console.log('✅ Connected to WebSocket!');
  console.log('Socket ID:', socket.id);
});

// 5. Listen for notifications
socket.on('notification:new', (notification) => {
  console.log('🔔 New notification:', notification);
});

socket.on('mood:created', (mood) => {
  console.log('😊 New mood created:', mood);
});

socket.on('notification:updated', (data) => {
  console.log('✅ Notification updated:', data);
});

// 6. Handle errors
socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from WebSocket');
});
```

### Option 2: Using Node.js Test Script

Create a file `test-websocket.js`:

```javascript
import { io } from 'socket.io-client';

// Replace with your actual JWT token
const token = 'YOUR_JWT_TOKEN_HERE';

const socket = io('http://localhost:3000', {
  auth: { token }
});

socket.on('connect', () => {
  console.log('✅ Connected! Socket ID:', socket.id);
});

socket.on('notification:new', (notification) => {
  console.log('🔔 New notification:', notification);
});

socket.on('mood:created', (mood) => {
  console.log('😊 Mood created:', mood);
});

socket.on('connect_error', (error) => {
  console.error('❌ Error:', error.message);
});

// Keep the script running
process.stdin.resume();
```

Run it:
```bash
npm install socket.io-client
node test-websocket.js
```

---

## 📡 Real-Time Features

### 1. Mood Entry Notifications
When a user creates a mood entry, they receive a real-time event:

**Trigger:**
```bash
POST /api/moods
Authorization: Bearer <token>
Body: {"mood": "happy", "note": "Great day!"}
```

**WebSocket Event Emitted:**
```javascript
{
  event: 'mood:created',
  data: {
    id: 'uuid',
    userId: 'uuid',
    mood: 'happy',
    note: 'Great day!',
    createdAt: '2025-12-06T10:00:00Z'
  }
}
```

### 2. Notification System
The backend can send notifications to users in real-time:

**How it works:**
```javascript
// In any controller/service
import { sendNotification } from '../sockets/socketHandler.js';

// Send notification to user
await sendNotification(userId, 'Your reminder is due!');
```

**WebSocket Event Emitted:**
```javascript
{
  event: 'notification:new',
  data: {
    id: 'uuid',
    userId: 'uuid',
    message: 'Your reminder is due!',
    read: false,
    createdAt: '2025-12-06T10:00:00Z'
  }
}
```

### 3. Mark Notification as Read
Users can mark notifications as read via WebSocket:

**Client sends:**
```javascript
socket.emit('notification:read', {
  notificationId: 'uuid-here'
});
```

**Server responds:**
```javascript
{
  event: 'notification:updated',
  data: {
    notificationId: 'uuid-here'
  }
}
```

---

## 🔐 Authentication

WebSocket connections require JWT authentication:

1. **Get JWT token** from login/register endpoint
2. **Pass token** in connection handshake:
   ```javascript
   const socket = io('http://localhost:3000', {
     auth: { token: 'your-jwt-token' }
   });
   ```
3. **Server validates** token and associates socket with user
4. **User-specific room** created: `user:{userId}`

---

## 🎯 Use Cases

### 1. Real-Time Mood Tracking
```javascript
// User creates mood entry
POST /api/moods → mood:created event → Update UI instantly
```

### 2. Reminder Notifications
```javascript
// Email scheduler triggers reminder
Scheduler → sendNotification() → notification:new event → Show popup
```

### 3. Multi-Device Sync
```javascript
// User logs in on multiple devices
Device 1 creates mood → Both devices receive mood:created event
```

---

## 🧪 Complete Test Flow

### Step 1: Register/Login
```powershell
$response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"email":"john@example.com","password":"password123"}'
  
$token = $response.token
Write-Output "Token: $token"
```

### Step 2: Connect WebSocket (Browser)
```javascript
const socket = io('http://localhost:3000', {
  auth: { token: 'paste-token-here' }
});

socket.on('connect', () => console.log('Connected!'));
socket.on('notification:new', (n) => console.log('Notification:', n));
socket.on('mood:created', (m) => console.log('Mood:', m));
```

### Step 3: Create Mood Entry
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/moods" `
  -Method POST `
  -Headers @{Authorization="Bearer $token"} `
  -ContentType "application/json" `
  -Body '{"mood":"happy","note":"Testing WebSocket!"}'
```

### Step 4: Check Browser Console
You should see:
```
Mood: {id: "...", mood: "happy", note: "Testing WebSocket!", ...}
```

---

## 📊 WebSocket Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │◄───────►│  Socket.io   │◄───────►│  Services   │
│  (Browser)  │  Events │   Server     │  Emit   │ Controllers │
└─────────────┘         └──────────────┘         └─────────────┘
                              │
                              ▼
                        ┌──────────────┐
                        │  User Rooms  │
                        │ user:{userId}│
                        └──────────────┘
```

### Flow:
1. **Client connects** with JWT token
2. **Server authenticates** and creates user room
3. **Services emit events** to specific user rooms
4. **Socket.io broadcasts** to all connected clients in that room
5. **Client receives** real-time updates

---

## ✅ Verification Checklist

- ✅ Socket.io server initialized
- ✅ CORS configured for frontend
- ✅ JWT authentication middleware active
- ✅ User rooms created on connection
- ✅ `emitToUser()` function available
- ✅ `sendNotification()` function available
- ✅ Mood creation emits real-time event
- ✅ Notification system integrated
- ✅ Disconnect handling implemented

---

## 🔧 Configuration

### Current Settings
```javascript
// src/config/socket.js
cors: {
  origin: process.env.FRONTEND_URL,  // http://localhost:3000
  methods: ['GET', 'POST'],
  credentials: true
}
```

### Environment Variables
```env
FRONTEND_URL=http://localhost:3000  # Update for production
```

---

## 🐛 Troubleshooting

### Connection Refused
**Problem:** `connect_error: Error: xhr poll error`  
**Solution:** Ensure server is running on port 3000

### Authentication Error
**Problem:** `connect_error: Authentication error`  
**Solution:** Check JWT token is valid and not expired

### CORS Error
**Problem:** `Access-Control-Allow-Origin error`  
**Solution:** Update `FRONTEND_URL` in `.env` to match your frontend

### No Events Received
**Problem:** Connected but no events  
**Solution:** Check you're listening to correct event names

---

## 📚 Available Events

### Server Emits (You Listen)
| Event | Description | Data |
|-------|-------------|------|
| `notification:new` | New notification created | `{id, userId, message, read, createdAt}` |
| `notification:updated` | Notification marked as read | `{notificationId}` |
| `mood:created` | New mood entry created | `{id, userId, mood, note, createdAt}` |

### Client Emits (Server Listens)
| Event | Description | Data |
|-------|-------------|------|
| `notification:read` | Mark notification as read | `{notificationId}` |

---

## 🎉 Summary

Your WebSocket system is **fully functional** with:

✅ Real-time mood entry notifications  
✅ Real-time notification system  
✅ JWT authentication  
✅ User-specific rooms  
✅ Multi-device support  
✅ Automatic reconnection  
✅ Error handling  

**Ready for production use!**

---

*Last updated: December 6, 2025*
