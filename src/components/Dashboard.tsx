import React, { useState } from "react";
import { 
  Award, 
  Flame, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Play, 
  Stethoscope, 
  Heart, 
  ShieldAlert, 
  Sparkles 
} from "lucide-react";
import { ThemeMode } from "../types";

interface DashboardProps {
  userName: string;
  setUserName: (name: string) => void;
  stats: {
    quizzesCompleted: number;
    totalAnswered: number;
    totalCorrect: number;
    overallAccuracy: number;
    streak: number;
  };
  subtopicPerformance: {
    [key: string]: { correct: number; total: number };
  };
  onStartQuiz: (config: {
    category: "NEET PG" | "INI-CET" | "All";
    subject: "Cardiovascular System" | "Neurology" | "Obstetrics" | "All";
    mode: "practice" | "exam";
    questionCount: number;
  }) => void;
  theme: ThemeMode;
}

const SUPPORTIVE_QUOTES = [
  "You've got this, sis! Every single question you solve is bringing you closer to that dream MD/MS seat! 🩺✨",
  "Sending you so much love and support. You are going to be an absolutely brilliant consultant! 💜",
  "Remember, consistency beats intensity. One page, one concept, one question at a time! 🌟",
  "Dr. Future Topper, you've worked incredibly hard. Your dedication is absolutely inspiring! 🩺💪",
  "Don't stress over mistakes—they are just guidelines pointing you to what to master next! 🧠📖",
];

const SUBJECTS = [
  { id: "Cardiovascular System", name: "Cardiovascular System (General Medicine)", icon: Heart, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20 lilac:bg-red-100/30" },
  { id: "Neurology", name: "Neurology (General Medicine)", icon: ShieldAlert, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/20 lilac:bg-blue-100/30" },
  { id: "Obstetrics", name: "Obstetrics (ObsGyn - Strict)", icon: Stethoscope, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/20 lilac:bg-purple-100/30" }
];

export default function Dashboard({
  userName,
  setUserName,
  stats,
  subtopicPerformance,
  onStartQuiz,
  theme
}: DashboardProps) {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState<"NEET PG" | "INI-CET" | "All">("All");
  const [selectedSubject, setSelectedSubject] = useState<"Cardiovascular System" | "Neurology" | "Obstetrics" | "All">("All");
  const [selectedMode, setSelectedMode] = useState<"practice" | "exam">("practice");
  const [questionCount, setQuestionCount] = useState<number>(8);

  const handleNameSave = () => {
    if (tempName.trim()) {
      setUserName(tempName);
      setEditingName(false);
    }
  };

  const getSubtopicAnalysis = () => {
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    Object.entries(subtopicPerformance).forEach(([subtopic, data]) => {
      if (data.total >= 2) {
        const accuracy = (data.correct / data.total) * 100;
        if (accuracy >= 70) {
          strengths.push(`${subtopic} (${Math.round(accuracy)}%)`);
        } else if (accuracy <= 50) {
          weaknesses.push(`${subtopic} (${Math.round(accuracy)}%)`);
        }
      }
    });

    return { strengths, weaknesses };
  };

  const { strengths, weaknesses } = getSubtopicAnalysis();

  return (
    <div id="dashboard" className="space-y-8 max-w-6xl mx-auto">
      {/* Personalized Welcome Card */}
      <div id="welcome-card" className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-purple-900/10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-2xl -ml-20 -mb-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 bg-white/15 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm w-max border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Made with Love for My Sister 💜</span>
            </div>

            {editingName ? (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  id="student-name-input"
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-white/20 text-white font-bold text-2xl sm:text-3xl rounded-xl px-3 py-1 border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-300 backdrop-blur-md"
                  placeholder="Enter Name..."
                  maxLength={30}
                />
                <button
                  id="student-name-save-btn"
                  onClick={handleNameSave}
                  className="bg-white text-purple-700 font-bold px-4 py-2 rounded-xl text-sm shadow hover:bg-purple-50 transition"
                >
                  Save
                </button>
              </div>
            ) : (
              <h1 id="welcome-header" className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center flex-wrap gap-2">
                Welcome back, <span className="underline decoration-wavy decoration-amber-400 decoration-2">{userName}</span>! 🩺
                <button
                  id="student-name-edit-btn"
                  onClick={() => setEditingName(true)}
                  className="text-xs font-normal text-purple-200 hover:text-white ml-2 underline"
                >
                  (edit name)
                </button>
              </h1>
            )}

            <p id="dashboard-quote" className="text-purple-100 font-medium italic text-sm sm:text-base max-w-xl transition-all duration-500">
              "{SUPPORTIVE_QUOTES[quoteIndex]}"
            </p>
            <button
              id="next-quote-btn"
              onClick={() => setQuoteIndex((prev) => (prev + 1) % SUPPORTIVE_QUOTES.length)}
              className="text-xs text-purple-200 hover:text-white underline font-semibold flex items-center space-x-1"
            >
              <span>Refresh motivation ✨</span>
            </button>
          </div>

          <div id="streak-card" className="flex items-center bg-white/15 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner md:self-stretch justify-center">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-400 p-3 rounded-xl shadow-lg animate-bounce">
                <Flame className="w-6 h-6 text-orange-700 fill-current" />
              </div>
              <div>
                <div id="streak-count" className="text-3xl font-black">{stats.streak} Days</div>
                <div className="text-xs text-purple-200 font-semibold tracking-wider uppercase">Active Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div id="quick-stats-grid" className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div id="stat-quizzes-card" className="bg-white dark:bg-[#111019] lilac:bg-white p-5 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F5F3FF] dark:bg-[#1f1b2e] rounded-2xl flex items-center justify-center text-[#5B21B6] dark:text-[#c084fc] font-bold shrink-0">
            01
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider">Quizzes Finished</p>
            <p id="stat-quizzes-val" className="text-lg sm:text-xl font-bold text-[#3D3445] dark:text-white">{stats.quizzesCompleted}</p>
          </div>
        </div>

        <div id="stat-solved-card" className="bg-white dark:bg-[#111019] lilac:bg-white p-5 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F5F3FF] dark:bg-[#1f1b2e] rounded-2xl flex items-center justify-center text-[#5B21B6] dark:text-[#c084fc] font-bold shrink-0">
            02
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider">MCQs Attempted</p>
            <p id="stat-solved-val" className="text-lg sm:text-xl font-bold text-[#3D3445] dark:text-white">{stats.totalAnswered}</p>
          </div>
        </div>

        <div id="stat-accuracy-card" className="bg-white dark:bg-[#111019] lilac:bg-white p-5 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F5F3FF] dark:bg-[#1f1b2e] rounded-2xl flex items-center justify-center text-[#5B21B6] dark:text-[#c084fc] font-bold shrink-0">
            03
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider">Average Accuracy</p>
            <p id="stat-accuracy-val" className="text-lg sm:text-xl font-bold text-[#3D3445] dark:text-white">{stats.overallAccuracy}%</p>
          </div>
        </div>

        <div id="stat-correct-card" className="bg-white dark:bg-[#111019] lilac:bg-white p-5 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-[#F5F3FF] dark:bg-[#1f1b2e] rounded-2xl flex items-center justify-center text-[#5B21B6] dark:text-[#c084fc] font-bold shrink-0">
            04
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-[#A78BFA] tracking-wider">Correct Answers</p>
            <p id="stat-correct-val" className="text-lg sm:text-xl font-bold text-[#3D3445] dark:text-white">{stats.totalCorrect}</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Custom Quiz Launchpad & Adaptive Study Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start" id="quiz-options-section">
        {/* Quiz Launcher Panel */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111019] p-6 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b pb-4 border-[#E9E1F0] dark:border-[#1e1b29]">
            <div>
              <h2 className="text-xl font-bold text-[#3D3445] dark:text-slate-100 font-sans tracking-tight">Configure Custom Quiz</h2>
              <p className="text-sm text-[#807090] mt-1">Configure your personalized clinical grand test session</p>
            </div>
            <span className="text-xs bg-[#EDE9FE] dark:bg-[#1e1b29] text-[#5B21B6] dark:text-purple-300 font-bold px-3 py-1 rounded-full border border-[#D6BCFA]/40">
              Shuffled Questions 🔀
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Target Exam */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#807090] dark:text-slate-300 uppercase tracking-wider block mb-1">Select Examination Frame</label>
              <div className="flex bg-[#F3F0F7] dark:bg-[#1c1a24] p-1 rounded-full border border-[#E9E1F0] dark:border-[#221f30]">
                {["All", "NEET PG", "INI-CET"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat as any)}
                    className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-full transition-all ${
                      selectedCategory === cat
                        ? "bg-white dark:bg-[#111019] text-[#5B21B6] dark:text-purple-300 shadow-sm"
                        : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#807090] dark:text-slate-300 uppercase tracking-wider block mb-1">Select Subject Focus</label>
              <select
                id="subject-dropdown"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as any)}
                className="w-full bg-[#FAF9FF] dark:bg-[#1c1a24] text-[#3D3445] dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl px-3 py-2 border border-[#E9E1F0] dark:border-[#221f30] focus:outline-none focus:ring-2 focus:ring-[#C084FC]"
              >
                <option value="All">All Subjects (Cardiology, Neurology, Obstetrics)</option>
                <option value="Cardiovascular System">Cardiovascular System (General Medicine)</option>
                <option value="Neurology">Neurology (General Medicine)</option>
                <option value="Obstetrics">Obstetrics (ObsGyn - Strict)</option>
              </select>
            </div>

            {/* Mode Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#807090] dark:text-slate-300 uppercase tracking-wider block mb-1">Execution Mode</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="mode-practice-btn"
                  onClick={() => setSelectedMode("practice")}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                    selectedMode === "practice"
                      ? "bg-[#FAF5FF] dark:bg-[#1f1a2e] border-[#C084FC] text-[#5B21B6] dark:text-[#c084fc] shadow-sm font-bold"
                      : "bg-[#FAF9FF] dark:bg-[#1c1a24] text-[#807090] border-[#E9E1F0] dark:border-[#221f30] hover:bg-[#F3F0F7]"
                  }`}
                >
                  <span className="text-xs block">Practice Mode</span>
                  <span className="text-[9px] opacity-70 block mt-0.5">Instant keys & pearls</span>
                </button>

                <button
                  id="mode-exam-btn"
                  onClick={() => setSelectedMode("exam")}
                  className={`py-3 px-4 rounded-2xl border text-center transition-all ${
                    selectedMode === "exam"
                      ? "bg-[#FAF5FF] dark:bg-[#1f1a2e] border-[#C084FC] text-[#5B21B6] dark:text-[#c084fc] shadow-sm font-bold"
                      : "bg-[#FAF9FF] dark:bg-[#1c1a24] text-[#807090] border-[#E9E1F0] dark:border-[#221f30] hover:bg-[#F3F0F7]"
                  }`}
                >
                  <span className="text-xs block">Exam Mode</span>
                  <span className="text-[9px] opacity-70 block mt-0.5">Full stats at end</span>
                </button>
              </div>
            </div>

            {/* MCQ Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#807090] dark:text-slate-300 uppercase tracking-wider block mb-1">Question Volume</label>
              <div className="flex bg-[#F3F0F7] dark:bg-[#1c1a24] p-1 rounded-full border border-[#E9E1F0] dark:border-[#221f30]">
                {[4, 8, 12, 16].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`flex-1 py-1.5 px-1.5 text-xs font-semibold rounded-full transition-all ${
                      questionCount === count
                        ? "bg-white dark:bg-[#111019] text-[#5B21B6] dark:text-purple-300 shadow-sm"
                        : "text-[#807090] dark:text-slate-400 hover:text-[#5B21B6] dark:hover:text-white"
                    }`}
                  >
                    {count} MCQs
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            id="launch-quiz-btn"
            onClick={() => onStartQuiz({ category: selectedCategory, subject: selectedSubject, mode: selectedMode, questionCount })}
            className="w-full bg-[#5B21B6] hover:bg-[#4c1d95] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#5B21B6]/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 text-sm sm:text-base mt-2"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Grand Test Session 🩺🚀</span>
          </button>
        </div>

        {/* Diagnostic Strengths & Weaknesses Tracker */}
        <div id="insights-panel" className="bg-white dark:bg-[#111019] p-6 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm space-y-6 self-stretch">
          <div className="border-b pb-4 border-[#E9E1F0] dark:border-[#1e1b29]">
            <h2 className="text-lg font-bold text-[#3D3445] dark:text-slate-100 flex items-center space-x-1.5 font-sans">
              <TrendingUp className="w-4 h-4 text-[#5B21B6]" />
              <span>Diagnostic Insights</span>
            </h2>
            <p className="text-xs text-[#807090] mt-0.5">Analysis of subtopics based on performance</p>
          </div>

          {/* Strengths */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Strong Areas (≥70%)</h3>
            </div>
            {strengths.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {strengths.map((str, idx) => (
                  <span key={idx} className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                    {str}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Complete at least 2 questions per subtopic with high accuracy to identify strengths.</p>
            )}
          </div>

          {/* Weaknesses */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider">Needs Improvement (≤50%)</h3>
            </div>
            {weaknesses.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {weaknesses.map((weak, idx) => (
                  <span key={idx} className="bg-amber-50 dark:bg-[#2c2214]/40 text-amber-700 dark:text-amber-300 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-amber-100 dark:border-amber-900/40">
                    {weak}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Excellent! No severe weak areas identified. Keep practicing to maintain excellence.</p>
            )}
          </div>

          {/* Tip/Quote of the Day */}
          <div className="bg-[#FAF5FF] dark:bg-[#1f1a2e] p-4 rounded-2xl border border-[#E9E1F0] dark:border-[#221f30] text-xs text-[#807090] dark:text-purple-300">
            <div className="font-bold flex items-center space-x-1 mb-1 text-[#5B21B6] dark:text-[#c084fc]">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Dr. Divya's Study Strategy 💡</span>
            </div>
            <span>Use the <strong>Practice Mode</strong> to thoroughly read the clinical explanations and explanations. Spaced repetition is the key to medical mastery.</span>
          </div>
        </div>
      </div>

      {/* Subject Coverage & Analysis */}
      <div id="subject-coverage" className="space-y-4">
        <h2 className="text-xl font-bold text-[#3D3445] dark:text-slate-100 font-sans tracking-tight">Syllabus Mastery Tracker</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBJECTS.map((subj) => {
            // Find total questions in database for this subject
            let subCorrect = 0;
            let subTotal = 0;
            Object.entries(subtopicPerformance).forEach(([subtopic, val]) => {
              if (
                (subj.id === "Cardiovascular System" && ["Myocardial Infarction / CAD", "Valvular Heart Diseases", "Heart Failure & Shock", "Arrhythmias & ECG Interpretation", "Infective Endocarditis"].includes(subtopic)) ||
                (subj.id === "Neurology" && ["Stroke & Cerebrovascular Accidents", "Epilepsy & Seizure Disorders", "Meningitis & Encephalitis", "Demyelinating & Neurodegenerative Diseases", "Neuromuscular Junction Disorders & Neuropathies"].includes(subtopic)) ||
                (subj.id === "Obstetrics" && ["Hypertensive Disorders of Pregnancy", "Antepartum & Postpartum Hemorrhage", "Antenatal Care & Maternal Physiology", "Medical Complications in Pregnancy", "Malpresentations & Labor"].includes(subtopic))
              ) {
                subCorrect += val.correct;
                subTotal += val.total;
              }
            });

            const subAccuracy = subTotal > 0 ? Math.round((subCorrect / subTotal) * 100) : 0;
            const percentageCompleted = subTotal > 0 ? Math.min(100, Math.round((subTotal / 15) * 100)) : 0;

            return (
              <div key={subj.id} className="bg-white dark:bg-[#111019] p-6 rounded-3xl border border-[#E9E1F0] dark:border-[#1e1b29] shadow-sm flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#3D3445] dark:text-slate-100 text-sm tracking-tight">{subj.name}</h3>
                    <p className="text-xs text-[#807090] dark:text-slate-400">Target high-yield topics</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF5FF] dark:bg-[#1f1a2e] border border-[#E9E1F0] dark:border-purple-900/20">
                    <subj.icon className="w-5 h-5 text-[#5B21B6] dark:text-[#C084FC]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#807090] dark:text-slate-400">Mastery Progress</span>
                    <span className="text-[#5B21B6] dark:text-[#C084FC]">{subTotal > 0 ? `${subCorrect}/${subTotal} Correct` : "Not Attempted"}</span>
                  </div>
                  <div className="w-full bg-[#F3F0F7] dark:bg-[#1c1a24] h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#C084FC] dark:bg-[#5B21B6] h-full rounded-full transition-all duration-500"
                      style={{ width: `${subTotal > 0 ? Math.max(10, percentageCompleted) : 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#807090] dark:text-slate-500 pt-0.5">
                    <span>{percentageCompleted}% Syllabus covered</span>
                    <span>Accuracy: {subAccuracy}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
