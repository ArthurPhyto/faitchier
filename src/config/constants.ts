// Environment configuration
const FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Application configuration
const APP_CONFIG = {
  BASE_URL: typeof window !== 'undefined' ? window.location.origin : '',
  FIREBASE: FIREBASE_CONFIG,
  MAX_TARGETS: 5,
  MIN_TARGETS: 1,
  DEFAULT_PATH_LENGTH: 6
};

export { APP_CONFIG, FIREBASE_CONFIG };