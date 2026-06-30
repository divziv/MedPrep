// Quiz Execution Engine for NEET PG, INI-CET, and FMGE
import { shuffleQuiz } from "./shuffle.js";
import { saveQuizAttempt } from "./progress.js";
import { getCurrentUser } from "./auth.js";

export class QuizSession {
  constructor(subject, exam, questions, config = {}) {
    this.subject = subject; // e.g. "Medicine", "Surgery", "Anatomy", "Pharmacology"
    this.exam = exam;       // e.g. "NEET PG", "INI-CET", "FMGE"
    this.rawQuestions = questions;
    
    // Config values
    this.limit = config.limit || questions.length;
    
    // Shuffle questions and options on initialization
    const fullShuffled = shuffleQuiz(questions);
    this.questions = fullShuffled.slice(0, this.limit);

    // Session State
    this.currentIndex = 0;
    this.userAnswers = {}; // { questionId: selectedOptionIndex }
    this.bookmarks = [];   // Array of questionIds
    this.markedForReview = []; // Array of questionIds
    
    // Timer
    this.timeRemaining = this.questions.length * 60; // 60 seconds per question
    this.timerId = null;
    
    // UI Update Callback
    this.onUpdate = config.onUpdate || (() => {});
    this.onComplete = config.onComplete || (() => {});
  }

  start() {
    this.startTimer();
    this.onUpdate();
  }

  startTimer() {
    if (this.timerId) clearInterval(this.timerId);
    
    this.timerId = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.timeRemaining = 0;
        this.submit();
      } else {
        this.onUpdate();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  nextQuestion() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.onUpdate();
    }
  }

  prevQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.onUpdate();
    }
  }

  goToQuestion(index) {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndex = index;
      this.onUpdate();
    }
  }

  toggleBookmark() {
    const qId = this.getCurrentQuestion().id;
    const idx = this.bookmarks.indexOf(qId);
    if (idx === -1) {
      this.bookmarks.push(qId);
    } else {
      this.bookmarks.splice(idx, 1);
    }
    this.onUpdate();
  }

  isBookmarked(qId) {
    return this.bookmarks.includes(qId || this.getCurrentQuestion().id);
  }

  toggleMarkForReview() {
    const qId = this.getCurrentQuestion().id;
    const idx = this.markedForReview.indexOf(qId);
    if (idx === -1) {
      this.markedForReview.push(qId);
    } else {
      this.markedForReview.splice(idx, 1);
    }
    this.onUpdate();
  }

  isMarkedForReview(qId) {
    return this.markedForReview.includes(qId || this.getCurrentQuestion().id);
  }

  selectOption(optionIndex) {
    const qId = this.getCurrentQuestion().id;
    this.userAnswers[qId] = optionIndex;
    this.onUpdate();
    this.saveTemporaryState(); // For optional resume support
  }

  getSelectedOption() {
    const qId = this.getCurrentQuestion().id;
    return this.userAnswers[qId] !== undefined ? this.userAnswers[qId] : null;
  }

  skipQuestion() {
    this.nextQuestion();
  }

  getStats() {
    let correctCount = 0;
    let incorrectCount = 0;
    let skippedCount = 0;
    const wrongQuestions = [];

    this.questions.forEach(q => {
      const ans = this.userAnswers[q.id];
      if (ans === undefined || ans === null) {
        skippedCount++;
      } else if (ans === q.correct) {
        correctCount++;
      } else {
        incorrectCount++;
        wrongQuestions.push({
          ...q,
          userAnswer: ans,
          userAnswerText: q.options[ans],
          correctAnswerText: q.options[q.correct]
        });
      }
    });

    const accuracy = this.questions.length > skippedCount 
      ? Math.round((correctCount / (this.questions.length - skippedCount)) * 100) 
      : 0;

    return {
      correct: correctCount,
      incorrect: incorrectCount,
      skipped: skippedCount,
      total: this.questions.length,
      accuracy,
      wrongQuestions,
      scorePercentage: Math.round((correctCount / this.questions.length) * 100)
    };
  }

  async submit() {
    this.stopTimer();
    const stats = this.getStats();
    
    // Save to Firestore or local storage if a user is logged in
    const user = getCurrentUser();
    if (user) {
      const attemptData = {
        id: "attempt_" + Date.now(),
        subject: this.subject,
        exam: this.exam,
        date: new Date().toISOString(),
        correct: stats.correct,
        incorrect: stats.incorrect,
        skipped: stats.skipped,
        total: stats.total,
        accuracy: stats.accuracy,
        duration: (this.questions.length * 60) - this.timeRemaining
      };
      await saveQuizAttempt(user.uid, attemptData);
    }

    this.clearTemporaryState();
    this.onComplete(stats);
  }

  // --- OPTIONAL RESUME SUPPORT ---
  saveTemporaryState() {
    const state = {
      subject: this.subject,
      exam: this.exam,
      currentIndex: this.currentIndex,
      userAnswers: this.userAnswers,
      bookmarks: this.bookmarks,
      markedForReview: this.markedForReview,
      timeRemaining: this.timeRemaining,
      questions: this.questions
    };
    localStorage.setItem("medical_prep_active_session", JSON.stringify(state));
  }

  static loadTemporarySession() {
    const raw = localStorage.getItem("medical_prep_active_session");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  clearTemporaryState() {
    localStorage.removeItem("medical_prep_active_session");
  }
}
