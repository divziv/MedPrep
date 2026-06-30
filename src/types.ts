export interface Question {
  id: string;
  subject: "Cardiovascular System" | "Neurology" | "Obstetrics";
  subTopic: string;
  exam: "NEET PG" | "INI-CET" | "AIIMS PG" | "FMGE" | "DNB-CET" | "AI Pattern Question";
  year: number | string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // 0 to 3
  explanation: string;
  pearl?: string;
}

export type ThemeMode = "light" | "dark" | "lilac";

export interface QuizHistory {
  id: string;
  date: string;
  subject: string;
  score: number;
  total: number;
  timeTaken: number; // in seconds
  answers: Record<string, number>; // questionId -> selectedIndex
}

export interface UserProgress {
  studentName: string;
  totalSolved: number;
  totalCorrect: number;
  streak: number;
  lastActiveDate: string | null;
  history: QuizHistory[];
}

export interface QuizSession {
  id: string;
  subject: string;
  title: string;
  mode: "practice" | "exam";
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<string, number>; // questionId -> chosenIndex
  markedForReview: string[]; // array of questionIds
  startedAt: number; // timestamp
  elapsedSeconds: number;
  isCompleted: boolean;
}
