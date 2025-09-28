# Firebase Setup Guide for Memefy

This project uses Firebase for authentication, database, and cloud functions with full MERN stack compatibility.

## Quick Start

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter your project name (e.g., "memefy-app")
4. Enable Google Analytics (optional)
5. Create project

### 2. Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Google** provider
3. Add your domain to authorized domains

### 3. Setup Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Start in **test mode** (for development)
4. Choose a location close to your users

### 4. Setup Firebase Storage (Optional)
1. Go to **Storage**
2. Click "Get started"
3. Start in **test mode**
4. Choose same location as Firestore

### 5. Get Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps"
3. Click **Web app** icon (`</>`)
4. Register your app (name: "Memefy Web")
5. Copy the config object

### 6. Update Environment Variables
Create or update your `.env` file with the Firebase config:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### 7. Start Development
```bash
npm run dev
```

## Firebase Features

### What Firebase Provides:
- ✅ **Google Authentication**: Secure social login built-in
- ✅ **Real-time Database**: Live meme interactions with Firestore
- ✅ **MERN Stack Ready**: Perfect Node.js integration  
- ✅ **Cloud Storage**: Built-in image/video storage (optional)
- ✅ **Offline Support**: Works without internet connection
- ✅ **Generous Free Tier**: 1GB storage + 20K writes/day

## Firestore Collections Structure

```js
// Memes Collection
memes: {
  id: "auto-generated",
  title: "Meme Title",
  imageUrl: "https://...",
  userId: "user-auth-id", 
  author: "User Display Name",
  likes: 0,
  shares: 0,
  views: 0,
  createdAt: serverTimestamp(),
  category: "Popular|Trending|Classic"
}

// User Profiles (Optional)
profiles: {
  id: "user-auth-id",
  displayName: "User Name", 
  email: "user@email.com",
  photoURL: "https://...",
  premium: false,
  createdAt: serverTimestamp()
}
```

## Security Rules

Update Firestore security rules in Firebase Console:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Memes readable by everyone, writable by authenticated users
    match /memes/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User profiles private to user
    match /profiles/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## MERN Stack Integration

Firebase works perfectly with Express.js backends:

```js
// server.js example
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Verify Firebase tokens in Express middleware
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

## Demo Mode

The app includes a built-in demo mode when Firebase is not configured:
- Demo users stored in localStorage
- Mock data for analytics and memes  
- Full UI functionality without backend
- Perfect for testing and development

## Troubleshooting

### Common Issues:
1. **Authentication not working**: Check if Google provider is enabled
2. **Permission denied**: Update Firestore security rules
3. **App not loading**: Verify all environment variables are set
4. **CORS errors**: Add your domain to Firebase authorized domains

### Development Tips:
- Use Firebase Emulator Suite for local testing
- Enable debug mode: `localStorage.debug = 'firebase:*'`
- Check browser Network tab for API call errors
- Use Firebase Console to monitor real-time database activity

## Next Steps for MERN Stack

1. **Express.js Backend**: Create API routes with Firebase Admin SDK
2. **MongoDB Integration**: Use alongside Firebase for complex queries  
3. **Redis Caching**: Cache popular memes for better performance
4. **Image Processing**: Add automatic meme generation APIs
5. **Social Features**: Real-time comments and reactions

Happy meme creating! 🎭✨