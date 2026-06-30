import React from "react";
import { 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  Award, 
  BookOpen, 
  Activity, 
  History, 
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { QuizHistory, Question } from "../types";
import { QUESTIONS } from "../data/questions";

interface AnalyticsProps {
  history: QuizHistory[];
  subtopicPerformance: {
    [key: string]: { correct: number; total: number };
  };
}

export default function Analytics({ history, subtopicPerformance }: AnalyticsProps) {
  // Compute overall stats
  const totalQuizzes = history.length;
  const totalCorrect = history.reduce((sum, item) => sum + item.score, 0);
  const totalAttempted = history.reduce((sum, item) => sum + item.total, 0);
  const overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  
  const averageTimePerQuiz = totalQuizzes > 0 
    ? Math.round(history.reduce((sum, item) => sum + item.timeTaken, 0) / totalQuizzes) 
    : 0;

  // Group by Subject Accuracy
  const subjectStats: Record<string, { correct: number; total: number }> = {
    "Cardiovascular System": { correct: 0, total: 0 },
    "Neurology": { correct: 0, total: 0 },
    "Obstetrics": { correct: 0, total: 0 }
  };

  // Group subtopic accuracy
  const subtopics = Array.from(new Set(QUESTIONS.map(q => q.subTopic)));
  const subtopicStats: Record<string, { correct: number; total: number; subject: string }> = {};
  
  QUESTIONS.forEach(q => {
    subtopicStats[q.subTopic] = { correct: 0, total: 0, subject: q.subject };
  });

  // Populate from history
  history.forEach(item => {
    // For each history item, find the questions and calculate their subject
    Object.entries(item.answers).forEach(([questionId, selectedIdx]) => {
      const originalQ = QUESTIONS.find(q => q.id === questionId);
      if (originalQ) {
        const isCorrect = selectedIdx === originalQ.correctAnswerIndex;
        
        // Subject Stats
        if (subjectStats[originalQ.subject]) {
          subjectStats[originalQ.subject].total += 1;
          if (isCorrect) subjectStats[originalQ.subject].correct += 1;
        }

        // Subtopic Stats
        if (subtopicStats[originalQ.subTopic]) {
          subtopicStats[originalQ.subTopic].total += 1;
          if (isCorrect) subtopicStats[originalQ.subTopic].correct += 1;
        }
      }
    });
  });

  // Format time (MM:SS)
  const formatSeconds = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div id="analytics-container" className="space-y-8 max-w-6xl mx-auto">
      {/* Overview Analytics Header */}
      <div id="analytics-header" className="bg-white dark:bg-[#181824] lilac:bg-purple-50/20 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2 font-sans tracking-tight">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <span>Interactive Performance Analytics</span>
        </h2>
        <p className="text-sm text-gray-500 mt-1">Detailed diagnostic profiling across the core medical syllabus</p>
      </div>

      {totalQuizzes === 0 ? (
        <div id="no-analytics" className="bg-white dark:bg-[#181824] p-12 rounded-3xl border border-slate-100 dark:border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Activity className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 font-sans">No Performance Data Yet</h3>
            <p className="text-sm text-slate-500">Complete at least one mock exam or practice session from the dashboard to activate the diagnostic reports.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Main Visual SVG Donut Progress Cards */}
          <div id="subject-accuracy-grid" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(subjectStats).map(([subjectName, stat]) => {
              const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
              
              // SVG Circle properties
              const radius = 50;
              const circumference = 2 * Math.PI * radius;
              const offset = circumference - (accuracy / 100) * circumference;

              let color = "stroke-purple-600";
              let textClass = "text-purple-600";
              let bgHex = "bg-purple-50 dark:bg-purple-950/20";
              if (subjectName === "Cardiovascular System") {
                color = "stroke-red-500";
                textClass = "text-red-500";
                bgHex = "bg-red-50 dark:bg-red-950/20";
              } else if (subjectName === "Neurology") {
                color = "stroke-blue-500";
                textClass = "text-blue-500";
                bgHex = "bg-blue-50 dark:bg-blue-950/20";
              }

              return (
                <div key={subjectName} className="bg-white dark:bg-slate-900 lilac:bg-purple-50/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-sm flex items-center justify-between">
                  <div className="space-y-3 flex-1 mr-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject Diagnostics</span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight tracking-tight">{subjectName}</h3>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      {stat.correct} / {stat.total} MCQs Correct
                    </div>
                  </div>

                  {/* Gorgeous SVG Gauge */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className="stroke-slate-100 dark:stroke-slate-800 fill-none"
                        strokeWidth="8"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        className={`${color} fill-none transition-all duration-1000 ease-out`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className={`text-xl font-black ${textClass}`}>{accuracy}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtopic Level Accuracy Diagnosis */}
          <div id="subtopic-performance-grid" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Detailed Subtopic Progress List */}
            <div id="subtopics-card" className="bg-white dark:bg-[#181824] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight">Syllabus Subtopic Performance</h3>
                <p className="text-xs text-gray-500 mt-0.5">Performance tracking down to specific clinical entities</p>
              </div>

              <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                {Object.entries(subtopicStats).map(([subtopic, stat]) => {
                  const accuracy = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : null;
                  
                  let progressColor = "bg-purple-600";
                  if (stat.subject === "Cardiovascular System") progressColor = "bg-red-500";
                  if (stat.subject === "Neurology") progressColor = "bg-blue-500";

                  return (
                    <div key={subtopic} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">{subtopic}</span>
                        <span className="text-slate-800 dark:text-slate-200">
                          {accuracy !== null ? `${accuracy}% (${stat.correct}/${stat.total})` : "Unattempted"}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`${progressColor} h-full rounded-full transition-all`}
                          style={{ width: `${accuracy !== null ? accuracy : 0}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Management & Study Tips */}
            <div id="time-management-card" className="bg-white dark:bg-[#181824] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight">Time Management profile</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Analysing average speed during exams</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="p-3 bg-purple-100 dark:bg-purple-950/40 text-purple-600 rounded-xl">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div id="avg-time-val" className="text-xl font-bold text-slate-800 dark:text-slate-200">{formatSeconds(averageTimePerQuiz)}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Time Per Quiz</div>
                    </div>
                  </div>
                </div>

                {/* High Yield Advice Card */}
                <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/15 border border-amber-100 dark:border-amber-900/30 space-y-2">
                  <div className="flex items-center space-x-1.5 text-amber-800 dark:text-amber-400">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">Exam Speed Recommendation</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                    For INI-CET and NEET PG, the optimal speed is 40-45 seconds per MCQ. Your current pacing is {formatSeconds(averageTimePerQuiz / 8)} per question. Keep practicing to build high clinical reflex speed!
                  </p>
                </div>
              </div>

              {/* Motivational sister card */}
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-100/50 dark:border-purple-900/40 text-xs text-purple-900 dark:text-purple-300">
                <div className="font-bold flex items-center space-x-1 mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Dr. Divya's Performance Coach 🎯</span>
                </div>
                <span>Excellent dedication! Use the <strong>Score History</strong> log below to revisit previous mistakes and study the corresponding active-recall clinical explanations.</span>
              </div>
            </div>
          </div>

          {/* Historical Score Log */}
          <div id="historical-score-log" className="bg-white dark:bg-[#181824] p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 font-sans tracking-tight flex items-center space-x-2">
                <History className="w-5 h-5 text-purple-600" />
                <span>Score History & Logs</span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">Logs of all completed sessions and performance reports</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] uppercase tracking-wider text-slate-400">
                    <th className="pb-3 pl-2">Date</th>
                    <th className="pb-3">Subject / Focus</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 text-center">Accuracy</th>
                    <th className="pb-3 text-right pr-2">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {history.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3.5 pl-2">{new Date(item.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                      <td className="py-3.5">{item.subject}</td>
                      <td className="py-3.5 text-center text-purple-600 font-bold">{item.score} / {item.total}</td>
                      <td className="py-3.5 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          (item.score / item.total) >= 0.7 
                            ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600" 
                            : "bg-amber-50 dark:bg-amber-950 text-amber-600"
                        }`}>
                          {Math.round((item.score / item.total) * 100)}%
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2 font-mono text-slate-500">{formatSeconds(item.timeTaken)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
