// Firebase Initialization and Graceful Fallback Manager

// Load Firebase configuration from environment or localStorage
let savedConfig = null;
try {
  const configStr = localStorage.getItem("medical_prep_firebase_config");
  if (configStr) {
    savedConfig = JSON.parse(configStr);
  }
} catch (e) {
  console.error("Failed to parse user-entered Firebase config:", e);
}

const firebaseConfig = savedConfig || {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

let db = null;
let auth = null;
let isFirebaseEnabled = false;

// Check if valid config exists
if (firebaseConfig.apiKey && firebaseConfig.projectId && typeof firebase !== 'undefined') {
  try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    auth = firebase.auth();
    // Enable offline persistence if possible
    db.enablePersistence().catch((err) => {
      console.warn("Firestore persistence could not be enabled:", err.code);
    });
    isFirebaseEnabled = true;
    console.log("Firebase initialized successfully! 🚀");
  } catch (error) {
    console.error("Firebase initialization failed, running in Local Storage mode:", error);
  }
} else {
  console.log("Running in Local Storage Mode (Offline Capable) 📴. To connect real Firebase, specify config in Settings.");
}

// Export initialization variables
export { db, auth, isFirebaseEnabled, firebaseConfig };
