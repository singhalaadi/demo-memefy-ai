import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

// Validate required fields
if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API Key is missing. Check your environment variables.')
}
if (!firebaseConfig.projectId) {
  throw new Error('Firebase Project ID is missing. Check your environment variables.')
}

let app;
try {
  app = initializeApp(firebaseConfig)
  console.log('Firebase initialized successfully')
} catch (error) {
  console.error('Firebase initialization error:', error)
  throw error
}

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Only initialize analytics if measurement ID is provided
export const analytics = firebaseConfig.measurementId ? getAnalytics(app) : null

export default app