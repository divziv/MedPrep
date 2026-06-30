// Progress storage manager with support for Firebase Firestore and Local Storage fallback
import { db, isFirebaseEnabled } from "./firebase.js";

// Structure of offline progress storage
const DEFAULT_OFFLINE_DATA = {
  progress: {
    "Medicine": 0,
    "Surgery": 0,
    "Anatomy": 0,
    "Pharmacology": 0
  },
  quizScores: [], // Array of { id, subject, exam, date, correct, incorrect, skipped, total, accuracy, duration }
  completedQuizzes: 0,
  settings: {
    darkMode: false
  },
  studyTime: {
    today: 0,
    lastActiveDate: ""
  }
};

/**
 * Gets a clean default data structure.
 */
function getDefaultData() {
  return JSON.parse(JSON.stringify(DEFAULT_OFFLINE_DATA));
}

/**
 * Loads user progress.
 * If Firebase is enabled, pulls from Firestore users/{uid}.
 * Otherwise, pulls from localStorage offline_user_data.
 */
export async function loadUserProgress(uid) {
  if (!uid) return getDefaultData();

  if (isFirebaseEnabled && db) {
    try {
      const userDocRef = db.collection("users").doc(uid);
      const doc = await userDocRef.get();
      if (doc.exists) {
        const data = doc.data();
        // Ensure standard fields exist
        return {
          progress: data.progress || getDefaultData().progress,
          quizScores: data.quizScores || [],
          completedQuizzes: data.completedQuizzes || 0,
          settings: data.settings || getDefaultData().settings,
          studyTime: data.studyTime || getDefaultData().studyTime
        };
      } else {
        // Create initial document in firestore
        const defaultData = getDefaultData();
        await userDocRef.set(defaultData);
        return defaultData;
      }
    } catch (error) {
      console.error("Firestore progress load failed, fallback to local:", error);
    }
  }

  // Local storage fallback
  const localData = localStorage.getItem(`user_progress_${uid}`);
  if (localData) {
    try {
      const parsed = JSON.parse(localData);
      return {
        ...getDefaultData(),
        ...parsed
      };
    } catch (e) {
      return getDefaultData();
    }
  } else {
    const defaultData = getDefaultData();
    localStorage.setItem(`user_progress_${uid}`, JSON.stringify(defaultData));
    return defaultData;
  }
}

/**
 * Saves user progress to Firestore or Local Storage.
 */
export async function saveUserProgress(uid, data) {
  if (!uid) return;

  if (isFirebaseEnabled && db) {
    try {
      await db.collection("users").doc(uid).set(data, { merge: true });
      return;
    } catch (error) {
      console.error("Firestore progress save failed:", error);
    }
  }

  // Local storage fallback
  localStorage.setItem(`user_progress_${uid}`, JSON.stringify(data));
}

/**
 * Save a new quiz score attempt and recalculate completion progress.
 */
export async function saveQuizAttempt(uid, attempt) {
  const data = await loadUserProgress(uid);
  
  // Add new attempt
  data.quizScores.push(attempt);
  data.completedQuizzes = (data.completedQuizzes || 0) + 1;

  // Recalculate subject completion (e.g. increase by 20% per completed quiz up to 100%)
  const subject = attempt.subject;
  const currentProgress = data.progress[subject] || 0;
  data.progress[subject] = Math.min(100, currentProgress + 20);

  await saveUserProgress(uid, data);
  return data;
}

/**
 * Reset a specific subject's scores, completion, and attempts.
 */
export async function resetSubjectProgress(uid, subject) {
  const data = await loadUserProgress(uid);
  
  // 1. Reset completion to 0%
  if (data.progress && data.progress[subject] !== undefined) {
    data.progress[subject] = 0;
  }

  // 2. Filter out quiz scores belonging to this subject
  if (data.quizScores) {
    data.quizScores = data.quizScores.filter(score => score.subject !== subject);
  }

  // 3. Recalculate completedQuizzes count
  data.completedQuizzes = data.quizScores.length;

  await saveUserProgress(uid, data);
  return data;
}

/**
 * Reset all progress completely.
 */
export async function resetAllProgress(uid) {
  const data = await loadUserProgress(uid);
  const fresh = getDefaultData();
  
  // Keep settings but wipe stats and history
  fresh.settings = data.settings || fresh.settings;
  
  await saveUserProgress(uid, fresh);
  return fresh;
}

/**
 * Update user settings.
 */
export async function updateUserSettings(uid, settings) {
  const data = await loadUserProgress(uid);
  data.settings = {
    ...data.settings,
    ...settings
  };
  await saveUserProgress(uid, data);
  return data;
}

/**
 * Increment daily study time (tracker).
 */
export async function incrementStudyTime(uid, minutes) {
  const data = await loadUserProgress(uid);
  const todayStr = new Date().toDateString();

  if (!data.studyTime) {
    data.studyTime = { today: 0, lastActiveDate: todayStr };
  }

  if (data.studyTime.lastActiveDate === todayStr) {
    data.studyTime.today += minutes;
  } else {
    data.studyTime.today = minutes;
    data.studyTime.lastActiveDate = todayStr;
  }

  await saveUserProgress(uid, data);
  return data;
}
