import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  BookOpen, 
  Stethoscope, 
  Sparkles, 
  Activity, 
  Award,
  ShieldCheck,
  RotateCcw,
  LogOut,
  User,
  Heart
} from "lucide-react";
import { ThemeMode, QuizSession, UserProgress, QuizHistory, Question } from "./types";
import { QUESTIONS } from "./data/questions";
import Dashboard from "./components/Dashboard";
import QuizEngine from "./components/QuizEngine";
import Analytics from "./components/Analytics";
import StudyDeck from "./components/StudyDeck";
import ThemeSelector from "./components/ThemeSelector";

const LOCAL_STORAGE_KEY = "medical_pg_prep_progress";
const THEME_STORAGE_KEY = "medical_pg_prep_theme";

// Helper to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>("lilac");
  const [activeTab, setActivePage] = useState<"dashboard" | "quiz" | "analytics" | "flashcards">("dashboard");
  const [userName, setUserName] = useState<string>("Dr. Sister 🩺");
  const [progress, setProgress] = useState<UserProgress>({
    studentName: "Dr. Sister 🩺",
    totalSolved: 0,
    totalCorrect: 0,
    streak: 1,
    lastActiveDate: null,
    history: []
  });

  const [activeSession, setActiveSession] = useState<QuizSession | null>(null);
  const [lastFinishedQuizSummary, setLastFinishedQuizSummary] = useState<QuizHistory | null>(null);

  // Load progress and theme on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress(parsed);
        if (parsed.studentName) {
          setUserName(parsed.studentName);
        }
      } catch (e) {
        console.error("Failed to parse progress from localStorage", e);
      }
    }

    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      setTheme(savedTheme as ThemeMode);
    }
  }, []);

  // Update theme class on HTML element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "theme-lilac");
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "lilac") {
      root.classList.add("theme-lilac");
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  // Sync user progress to localStorage
  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProgress));
  };

  // Sync user name
  const handleUpdateUserName = (newName: string) => {
    setUserName(newName);
    const updated = { ...progress, studentName: newName };
    saveProgress(updated);
  };

  // Timer interval for active session
  useEffect(() => {
    if (!activeSession || activeSession.isCompleted) return;

    const interval = setInterval(() => {
      setActiveSession((prev) => {
        if (!prev || prev.isCompleted) return prev;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeSession]);

  // Start a new quiz session
  const handleStartQuiz = (config: {
    category: "NEET PG" | "INI-CET" | "All";
    subject: "Cardiovascular System" | "Neurology" | "Obstetrics" | "All";
    mode: "practice" | "exam";
    questionCount: number;
  }) => {
    // Filter questions based on configuration
    let filtered = QUESTIONS;

    if (config.category !== "All") {
      filtered = filtered.filter(q => q.exam === config.category);
    }

    if (config.subject !== "All") {
      filtered = filtered.filter(q => q.subject === config.subject);
    }

    if (filtered.length === 0) {
      filtered = QUESTIONS; // Fallback to all questions if none match
    }

    // Shuffle questions
    const shuffled = shuffleArray(filtered);
    const selectedQuestions = shuffled.slice(0, Math.min(config.questionCount, shuffled.length));

    const newSession: QuizSession = {
      id: Math.random().toString(36).substring(2, 9),
      subject: config.subject === "All" ? "General Medicine & Obstetrics" : config.subject,
      title: `${config.category === "All" ? "Mixed" : config.category} - ${config.subject === "All" ? "Grand Test" : config.subject}`,
      mode: config.mode,
      questions: selectedQuestions,
      currentIndex: 0,
      userAnswers: {},
      markedForReview: [],
      startedAt: Date.now(),
      elapsedSeconds: 0,
      isCompleted: false
    };

    setActiveSession(newSession);
    setLastFinishedQuizSummary(null);
    setActivePage("quiz");
  };

  // Answer question
  const handleAnswerQuestion = (questionId: string, originalOptionIndex: number) => {
    if (!activeSession) return;

    setActiveSession((prev) => {
      if (!prev) return prev;
      const updatedAnswers = {
        ...prev.userAnswers,
        [questionId]: originalOptionIndex
      };

      return {
        ...prev,
        userAnswers: updatedAnswers
      };
    });
  };

  // Toggle marked for review
  const handleToggleMarkReview = (questionId: string) => {
    if (!activeSession) return;

    setActiveSession((prev) => {
      if (!prev) return prev;
      const isMarked = prev.markedForReview.includes(questionId);
      const updatedMarked = isMarked
        ? prev.markedForReview.filter(id => id !== questionId)
        : [...prev.markedForReview, questionId];

      return {
        ...prev,
        markedForReview: updatedMarked
      };
    });
  };

  const handleNextQuestion = () => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev || prev.currentIndex >= prev.questions.length - 1) return prev;
      return {
        ...prev,
        currentIndex: prev.currentIndex + 1
      };
    });
  };

  const handlePrevQuestion = () => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev || prev.currentIndex <= 0) return prev;
      return {
        ...prev,
        currentIndex: prev.currentIndex - 1
      };
    });
  };

  const handleJumpToQuestion = (index: number) => {
    if (!activeSession) return;
    setActiveSession((prev) => {
      if (!prev || index < 0 || index >= prev.questions.length) return prev;
      return {
        ...prev,
        currentIndex: index
      };
    });
  };

  // Submit active session
  const handleSubmitSession = () => {
    if (!activeSession) return;

    // Calculate score
    let score = 0;
    activeSession.questions.forEach((q) => {
      const userAnswer = activeSession.userAnswers[q.id];
      if (userAnswer !== undefined && userAnswer === q.correctAnswerIndex) {
        score += 1;
      }
    });

    const finishedSummary: QuizHistory = {
      id: activeSession.id,
      date: new Date().toISOString(),
      subject: activeSession.title,
      score: score,
      total: activeSession.questions.length,
      timeTaken: activeSession.elapsedSeconds,
      answers: activeSession.userAnswers
    };

    // Calculate new streak
    const todayStr = new Date().toISOString().split("T")[0];
    let newStreak = progress.streak;

    if (progress.lastActiveDate) {
      const lastActive = new Date(progress.lastActiveDate);
      const today = new Date(todayStr);
      const diffTime = Math.abs(today.getTime() - lastActive.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        newStreak += 1;
      } else if (diffDays > 1) {
        newStreak = 1; // Reset streak if missed days
      }
    } else {
      newStreak = 1;
    }

    const updatedHistory = [finishedSummary, ...progress.history];
    const updatedProgress: UserProgress = {
      ...progress,
      studentName: userName,
      totalSolved: progress.totalSolved + activeSession.questions.length,
      totalCorrect: progress.totalCorrect + score,
      streak: newStreak,
      lastActiveDate: todayStr,
      history: updatedHistory
    };

    saveProgress(updatedProgress);
    setLastFinishedQuizSummary(finishedSummary);
    setActiveSession(null);
    setActivePage("dashboard");
  };

  // Exit active session without saving
  const handleExitSession = () => {
    if (window.confirm("Are you sure you want to exit this session? Your current progress will not be saved.")) {
      setActiveSession(null);
      setActivePage("dashboard");
    }
  };

  // Reset Progress entirely
  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your learning analytics and quiz history? This cannot be undone.")) {
      const cleared: UserProgress = {
        studentName: userName,
        totalSolved: 0,
        totalCorrect: 0,
        streak: 1,
        lastActiveDate: null,
        history: []
      };
      saveProgress(cleared);
      setLastFinishedQuizSummary(null);
    }
  };

  // Compile subtopic performance dynamically
  const getSubtopicPerformance = () => {
    const map: Record<string, { correct: number; total: number }> = {};

    progress.history.forEach((hist) => {
      Object.entries(hist.answers).forEach(([questionId, selectedIndex]) => {
        const originalQ = QUESTIONS.find((q) => q.id === questionId);
        if (originalQ) {
          if (!map[originalQ.subTopic]) {
            map[originalQ.subTopic] = { correct: 0, total: 0 };
          }
          map[originalQ.subTopic].total += 1;
          if (selectedIndex === originalQ.correctAnswerIndex) {
            map[originalQ.subTopic].correct += 1;
          }
        }
      });
    });

    return map;
  };

  const subtopicPerf = getSubtopicPerformance();

  // Aggregate stats for Dashboard
  const dashboardStats = {
    quizzesCompleted: progress.history.length,
    totalAnswered: progress.totalSolved,
    totalCorrect: progress.totalCorrect,
    overallAccuracy: progress.totalSolved > 0 ? Math.round((progress.totalCorrect / progress.totalSolved) * 100) : 0,
    streak: progress.streak
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] text-[#3D3445] dark:bg-[#0c0c12] dark:text-slate-100 transition-all duration-300 font-sans pb-16">
      
      {/* Dynamic Floating Confetti Effect for Completed Quiz */}
      {lastFinishedQuizSummary && (
        <div className="max-w-4xl mx-auto px-4 pt-6 animate-fade-in" id="congrats-panel">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-3xl p-6 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-center sm:text-left">
              <div className="bg-white/20 p-3 rounded-full animate-bounce shadow">
                <Award className="w-8 h-8 text-yellow-300 fill-current" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Excellent Work, Dr. Sister! 🎉</h3>
                <p className="text-xs text-emerald-100 mt-1">
                  You scored <strong className="text-white text-sm">{lastFinishedQuizSummary.score} out of {lastFinishedQuizSummary.total}</strong> correct in <strong>{lastFinishedQuizSummary.subject}</strong>! Accuracy: {Math.round((lastFinishedQuizSummary.score / lastFinishedQuizSummary.total) * 100)}%.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setLastFinishedQuizSummary(null)}
                className="bg-white text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs shadow hover:bg-emerald-50 transition"
              >
                Accept Rewards 🏆
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#111019]/80 backdrop-blur-md border-b border-[#E9E1F0] dark:border-[#1e1b29] transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-2.5">
            <div className="bg-[#5B21B6] text-white p-2.5 rounded-2xl shadow-sm">
              <Stethoscope className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="font-sans font-extrabold text-sm sm:text-base text-[#3D3445] dark:text-slate-100 tracking-tight flex items-center">
                Medical PG Prep Portal
              </span>
              <span className="text-[10px] font-bold text-[#5B21B6] dark:text-purple-400 block tracking-wider uppercase -mt-0.5">
                Cardiology, Neurology & Obstetrics
              </span>
            </div>
          </div>

          {/* Theme Selector Integration */}
          <div className="flex items-center space-x-4">
            <ThemeSelector currentTheme={theme} onThemeChange={setTheme} />
          </div>
        </div>
      </header>

      {/* Main Tab Switcher Bar */}
      {activeTab !== "quiz" && (
        <div className="max-w-6xl mx-auto px-4 pt-8" id="navigation-tabs">
          <div className="flex space-x-1.5 bg-[#F3F0F7] dark:bg-[#1c1a24] p-1.5 rounded-3xl border border-[#E9E1F0] dark:border-[#221f30]">
            <button
              onClick={() => setActivePage("dashboard")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === "dashboard"
                  ? "bg-white dark:bg-[#111019] text-[#5B21B6] dark:text-purple-300 shadow-sm scale-[1.02]"
                  : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Dashboard Launchpad</span>
            </button>

            <button
              onClick={() => setActivePage("analytics")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === "analytics"
                  ? "bg-white dark:bg-[#111019] text-[#5B21B6] dark:text-purple-300 shadow-sm scale-[1.02]"
                  : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Diagnostic Analytics</span>
            </button>

            <button
              onClick={() => setActivePage("flashcards")}
              className={`flex-1 py-3 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
                activeTab === "flashcards"
                  ? "bg-white dark:bg-[#111019] text-[#5B21B6] dark:text-purple-300 shadow-sm scale-[1.02]"
                  : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Active Recall Cards</span>
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Router Frame */}
      <main className="max-w-7xl mx-auto px-4 pt-8 animate-fade-in">
        {activeTab === "dashboard" && (
          <Dashboard
            userName={userName}
            setUserName={handleUpdateUserName}
            stats={dashboardStats}
            subtopicPerformance={subtopicPerf}
            onStartQuiz={handleStartQuiz}
            theme={theme}
          />
        )}

        {activeTab === "quiz" && activeSession && (
          <QuizEngine
            session={activeSession}
            onAnswerQuestion={handleAnswerQuestion}
            onToggleMarkReview={handleToggleMarkReview}
            onNextQuestion={handleNextQuestion}
            onPrevQuestion={handlePrevQuestion}
            onJumpToQuestion={handleJumpToQuestion}
            onSubmitSession={handleSubmitSession}
            onExit={handleExitSession}
          />
        )}

        {activeTab === "analytics" && (
          <Analytics 
            history={progress.history} 
            subtopicPerformance={subtopicPerf} 
          />
        )}

        {activeTab === "flashcards" && (
          <StudyDeck />
        )}
      </main>

      {/* Developer Reset Trigger */}
      {activeTab !== "quiz" && progress.history.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 mt-12 flex justify-end">
          <button
            id="reset-progress-btn"
            onClick={handleResetProgress}
            className="flex items-center space-x-1.5 text-xs text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/50 dark:bg-rose-950/20 px-3.5 py-2 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Portal Statistics</span>
          </button>
        </div>
      )}
    </div>
  );
}
