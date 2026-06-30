// Authentication Handler for Google Sign-In (Firebase) and Guest Login Fallback
import { auth, isFirebaseEnabled } from "./firebase.js";

// Callbacks to notify UI of auth changes
let authStateChangeListeners = [];

/**
 * Register a listener for auth state changes
 */
export function onAuthStateChanged(callback) {
  authStateChangeListeners.push(callback);
  
  // Instantly trigger with current state
  const user = getCurrentUser();
  callback(user);
}

/**
 * Triggers all listeners with the current user state
 */
function notifyAuthStateChanged(user) {
  authStateChangeListeners.forEach(cb => cb(user));
}

/**
 * Gets the current logged-in user.
 * Looks in Firebase or fallback localStorage guest state.
 */
export function getCurrentUser() {
  if (isFirebaseEnabled && auth) {
    const fbUser = auth.currentUser;
    if (fbUser) {
      return {
        uid: fbUser.uid,
        displayName: fbUser.displayName || "Medical Student",
        email: fbUser.email,
        photoURL: fbUser.photoURL || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&auto=format&fit=crop&q=80",
        isGuest: false
      };
    }
  }

  // Fallback guest user check in localStorage
  const guestUser = localStorage.getItem("medical_prep_guest_user");
  if (guestUser) {
    try {
      return JSON.parse(guestUser);
    } catch (e) {
      return null;
    }
  }

  return null;
}

/**
 * Handles Google Login.
 * If Firebase is enabled, opens popup with Google provider.
 * Otherwise, logs in as a fully-featured mock student.
 */
export async function loginWithGoogle() {
  if (isFirebaseEnabled && auth) {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      const user = result.user;
      const formattedUser = {
        uid: user.uid,
        displayName: user.displayName || "Medical Student",
        email: user.email,
        photoURL: user.photoURL || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&auto=format&fit=crop&q=80",
        isGuest: false
      };
      notifyAuthStateChanged(formattedUser);
      return formattedUser;
    } catch (error) {
      console.error("Google login failed via Firebase:", error);
      throw error;
    }
  } else {
    // Local guest student simulation
    const guestUser = {
      uid: "guest_student_123",
      displayName: "Guest Aspirant",
      email: "aspirant@medicalprep.edu",
      photoURL: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
      isGuest: true
    };
    localStorage.setItem("medical_prep_guest_user", JSON.stringify(guestUser));
    notifyAuthStateChanged(guestUser);
    return guestUser;
  }
}

/**
 * Handles Logout.
 */
export async function logout() {
  if (isFirebaseEnabled && auth) {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Firebase SignOut failed:", error);
    }
  }

  // Clear guest state as well
  localStorage.removeItem("medical_prep_guest_user");
  notifyAuthStateChanged(null);
}

// Set up Firebase auth observer if Firebase is enabled
if (isFirebaseEnabled && auth) {
  auth.onAuthStateChanged((fbUser) => {
    if (fbUser) {
      const formattedUser = {
        uid: fbUser.uid,
        displayName: fbUser.displayName || "Medical Student",
        email: fbUser.email,
        photoURL: fbUser.photoURL || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=150&auto=format&fit=crop&q=80",
        isGuest: false
      };
      notifyAuthStateChanged(formattedUser);
    } else {
      // Check if we have a local guest, otherwise notify null
      const guestUser = getCurrentUser();
      notifyAuthStateChanged(guestUser);
    }
  });
}
