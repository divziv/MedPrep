import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  Clock, 
  Check, 
  X, 
  Lightbulb, 
  HelpCircle, 
  AlertCircle,
  FileText,
  RotateCcw
} from "lucide-react";
import { Question, QuizSession } from "../types";

interface ShuffledOption {
  text: string;
  originalIndex: number;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: ShuffledOption[];
}

interface QuizEngineProps {
  session: QuizSession;
  onAnswerQuestion: (questionId: string, originalOptionIndex: number) => void;
  onToggleMarkReview: (questionId: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
  onJumpToQuestion: (index: number) => void;
  onSubmitSession: () => void;
  onExit: () => void;
}

export default function QuizEngine({
  session,
  onAnswerQuestion,
  onToggleMarkReview,
  onNextQuestion,
  onPrevQuestion,
  onJumpToQuestion,
  onSubmitSession,
  onExit
}: QuizEngineProps) {
  const { questions, currentIndex, userAnswers, markedForReview, mode, elapsedSeconds } = session;
  const currentQuestion = questions[currentIndex];

  // We want to persist the shuffled order of options for each question for the duration of this session
  // We can do this by using a ref that maps questionId -> ShuffledOption[]
  const shuffledOptionsMapRef = useRef<Record<string, ShuffledOption[]>>({});

  const getShuffledOptions = (q: Question) => {
    if (shuffledOptionsMapRef.current[q.id]) {
      return shuffledOptionsMapRef.current[q.id];
    }

    const opts: ShuffledOption[] = q.options.map((text, idx) => ({
      text,
      originalIndex: idx
    }));

    // Perform Durstenfeld shuffle
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }

    shuffledOptionsMapRef.current[q.id] = opts;
    return opts;
  };

  const activeShuffledOptions = getShuffledOptions(currentQuestion);

  // Format timer
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const selectedOriginalIndex = userAnswers[currentQuestion.id] !== undefined 
    ? userAnswers[currentQuestion.id] 
    : null;

  const isMarked = markedForReview.includes(currentQuestion.id);

  // For Practice Mode: Has the user answered this question yet?
  const hasAnswered = selectedOriginalIndex !== null;

  return (
    <div id="quiz-engine-container" className="max-w-5xl mx-auto space-y-6">
      {/* Top Controls & Status Bar */}
      <div id="quiz-header-bar" className="bg-white dark:bg-slate-900 lilac:bg-purple-50/50 px-5 py-4 rounded-2xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <button
            id="exit-quiz-btn"
            onClick={onExit}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            ← Exit Session
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <span id="quiz-mode-badge" className="text-xs font-bold bg-purple-50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full border border-purple-100/30">
            {mode === "practice" ? "📚 Practice Mode" : "⏱️ Exam Mode"}
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <div id="quiz-timer" className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 font-mono text-sm font-bold bg-slate-50 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <Clock className="w-4 h-4 text-purple-600 animate-pulse" />
            <span>{formatTime(elapsedSeconds)}</span>
          </div>

          <button
            id="submit-session-btn"
            onClick={onSubmitSession}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition"
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Main MCQ Area */}
        <div className="lg:col-span-3 bg-white dark:bg-[#181824] lilac:bg-purple-50/20 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md space-y-6">
          
          {/* Question Metadata & Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span id="question-exam-tag" className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase border border-blue-100/30">
                {currentQuestion.exam} {currentQuestion.year}
              </span>
              <span id="question-topic-tag" className="bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-purple-100/30">
                {currentQuestion.subTopic}
              </span>
            </div>

            <button
              id="mark-review-btn"
              onClick={() => onToggleMarkReview(currentQuestion.id)}
              className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition ${
                isMarked
                  ? "bg-amber-100 dark:bg-amber-950/30 text-amber-700 border-amber-300"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-800"
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isMarked ? "fill-current text-amber-600" : ""}`} />
              <span>{isMarked ? "Marked for Review" : "Mark for Review"}</span>
            </button>
          </div>

          {/* Question Stem */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {currentIndex + 1} of {questions.length}</div>
            <h3 id="question-stem-text" className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 leading-relaxed font-sans">
              {currentQuestion.questionText}
            </h3>
          </div>

          {/* Options Grid */}
          <div id="options-container" className="grid grid-cols-1 gap-3.5">
            {activeShuffledOptions.map((option, idx) => {
              const alphabet = ["A", "B", "C", "D"][idx];
              const isSelected = selectedOriginalIndex === option.originalIndex;
              const isCorrectOriginal = option.originalIndex === currentQuestion.correctAnswerIndex;

              let btnClass = "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100";
              let badgeClass = "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400";

              if (mode === "practice" && hasAnswered) {
                // If this option is the correct one
                if (isCorrectOriginal) {
                  btnClass = "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-500 text-emerald-900 dark:text-emerald-300";
                  badgeClass = "bg-emerald-500 text-white";
                } 
                // If user selected this option and it is wrong
                else if (isSelected && !isCorrectOriginal) {
                  btnClass = "bg-rose-50 dark:bg-rose-950/20 border-rose-500 text-rose-900 dark:text-rose-300";
                  badgeClass = "bg-rose-500 text-white";
                }
              } else {
                // Exam Mode or Practice Mode (before answering)
                if (isSelected) {
                  btnClass = "bg-purple-50 dark:bg-purple-950/30 border-purple-500 text-purple-900 dark:text-purple-300 ring-2 ring-purple-500/20";
                  badgeClass = "bg-purple-600 text-white";
                }
              }

              return (
                <button
                  key={idx}
                  id={`option-btn-${alphabet}`}
                  onClick={() => {
                    if (mode === "practice" && hasAnswered) return; // Prevent changing in practice once answered
                    onAnswerQuestion(currentQuestion.id, option.originalIndex);
                  }}
                  disabled={mode === "practice" && hasAnswered}
                  className={`w-full text-left p-4 rounded-xl border flex items-center space-x-4 transition-all duration-200 ${btnClass}`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold shrink-0 shadow-sm transition ${badgeClass}`}>
                    {mode === "practice" && hasAnswered && isCorrectOriginal ? (
                      <Check className="w-4 h-4" />
                    ) : mode === "practice" && hasAnswered && isSelected && !isCorrectOriginal ? (
                      <X className="w-4 h-4" />
                    ) : (
                      alphabet
                    )}
                  </span>
                  <span className="text-sm font-semibold">{option.text}</span>
                </button>
              );
            })}
          </div>

          {/* Practice Mode Instant Explanation and High-Yield Pearl */}
          {mode === "practice" && hasAnswered && (
            <div id="explanation-box" className="p-5 rounded-2xl bg-amber-50/60 dark:bg-slate-900 border border-amber-100 dark:border-slate-800 space-y-4 animate-fade-in">
              <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-400">
                <Lightbulb className="w-5 h-5 text-amber-500 fill-current animate-pulse" />
                <h4 className="text-sm font-bold uppercase tracking-wider font-sans">High-Yield Explanation</h4>
              </div>
              <p id="explanation-text" className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>
              
              {currentQuestion.pearl && (
                <div id="exam-pearl-box" className="bg-purple-100/50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-200/30 text-purple-900 dark:text-purple-300 text-xs font-semibold leading-relaxed flex items-start space-x-2">
                  <span className="text-base">💡</span>
                  <span>{currentQuestion.pearl}</span>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-between border-t pt-4 border-slate-100 dark:border-slate-800">
            <button
              id="prev-question-btn"
              onClick={onPrevQuestion}
              disabled={currentIndex === 0}
              className="flex items-center space-x-1 px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                id="submit-exam-action-btn"
                onClick={onSubmitSession}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition"
              >
                Submit Exam
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={onNextQuestion}
                className="flex items-center space-x-1 px-4 py-2.5 text-xs font-bold rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Diagnostic Sidebar (Progress Map) */}
        <div id="quiz-navigation-sidebar" className="bg-white dark:bg-slate-900 lilac:bg-purple-50/50 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md space-y-5">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 font-sans tracking-tight">MCQ Navigation Grid</h4>
            <p className="text-xs text-slate-400 mt-0.5">Click any node to navigate</p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const hasAns = userAnswers[q.id] !== undefined;
              const marked = markedForReview.includes(q.id);

              let nodeClass = "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400";
              
              if (isCurrent) {
                nodeClass = "bg-purple-600 text-white border-purple-600 font-bold scale-105 shadow-md shadow-purple-200 dark:shadow-none";
              } else if (marked) {
                nodeClass = "bg-amber-100 dark:bg-amber-950/40 text-amber-700 border-amber-300 font-bold";
              } else if (hasAns) {
                nodeClass = "bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-900/40";
              }

              return (
                <button
                  key={idx}
                  id={`nav-node-${idx}`}
                  onClick={() => onJumpToQuestion(idx)}
                  className={`w-full aspect-square rounded-xl border flex items-center justify-center text-xs font-semibold transition-all ${nodeClass}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="border-t pt-4 border-slate-100 dark:border-slate-800 space-y-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-md bg-purple-600 shadow-sm border border-purple-600 inline-block"></span>
              <span>Active Question</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-md bg-purple-50 dark:bg-purple-950/20 border border-purple-200 inline-block"></span>
              <span>Attempted</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3.5 h-3.5 rounded-md bg-amber-100 dark:bg-amber-950/40 border border-amber-300 inline-block"></span>
              <span>Marked for Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
