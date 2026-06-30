// Student Dashboard Controller - Stats, Recent Quizzes, and Charts
import { loadUserProgress, incrementStudyTime } from "./progress.js";
import { getCurrentUser } from "./auth.js";
import { renderTrendChart, renderDistributionChart, renderComparisonChart } from "./charts.js";

/**
 * Periodically increments study time while active on dashboard or quiz (e.g. 1 min every 60s)
 */
export function startStudyTimeTracker(uid) {
  if (!uid) return;
  
  // Track activity every minute
  setInterval(async () => {
    try {
      await incrementStudyTime(uid, 1);
      // Update UI if on dashboard
      const studyTimeValEl = document.getElementById("stat-study-time-val");
      if (studyTimeValEl) {
        const progress = await loadUserProgress(uid);
        studyTimeValEl.textContent = `${progress.studyTime?.today || 0}m`;
      }
    } catch (e) {
      console.warn("Study time tracking failed:", e);
    }
  }, 60000);
}

/**
 * Generate unicode horizontal progress bar representation.
 * @param {number} percentage - 0 to 100
 * @returns {string} E.g., ████████░░ 80%
 */
export function getUnicodeProgressBar(percentage) {
  const totalBlocks = 10;
  const filledBlocks = Math.round((percentage / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const filledStr = "█".repeat(filledBlocks);
  const emptyStr = "░".repeat(emptyBlocks);
  return `${filledStr}${emptyStr} ${percentage}%`;
}

/**
 * Formats duration in seconds to mm:ss
 */
export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

/**
 * Loads, calculates, and populates all dashboard stats, charts, and list items
 * @param {string} uid - User unique ID
 */
export async function populateDashboard(uid) {
  if (!uid) return;

  const data = await loadUserProgress(uid);
  const scores = data.quizScores || [];

  // 1. Calculate General Stats
  const totalQuizzes = data.completedQuizzes || 0;
  let totalAnswered = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalSkipped = 0;

  scores.forEach(s => {
    totalCorrect += s.correct || 0;
    totalIncorrect += s.incorrect || 0;
    totalSkipped += s.skipped || 0;
    totalAnswered += (s.correct + s.incorrect);
  });

  const overallAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
  const averageScore = scores.length > 0
    ? Math.round((scores.reduce((acc, curr) => acc + (curr.correct / curr.total), 0) / scores.length) * 100)
    : 0;

  // 2. Identify Best and Weakest Subjects
  const subjects = ["Medicine", "Surgery", "Anatomy", "Pharmacology"];
  let bestSub = "None";
  let bestAccuracy = -1;
  let worstSub = "None";
  let worstAccuracy = 101;

  subjects.forEach(sub => {
    const subAttempts = scores.filter(s => s.subject === sub);
    if (subAttempts.length > 0) {
      const subCorrect = subAttempts.reduce((acc, curr) => acc + curr.correct, 0);
      const subTotal = subAttempts.reduce((acc, curr) => acc + curr.total, 0);
      const subAccuracy = subTotal > 0 ? Math.round((subCorrect / subTotal) * 100) : 0;

      if (subAccuracy > bestAccuracy) {
        bestAccuracy = subAccuracy;
        bestSub = `${sub} (${subAccuracy}%)`;
      }
      if (subAccuracy < worstAccuracy) {
        worstAccuracy = subAccuracy;
        worstSub = `${sub} (${subAccuracy}%)`;
      }
    }
  });

  if (bestAccuracy === -1) bestSub = "No data yet";
  if (worstAccuracy === 101) worstSub = "No data yet";

  // 3. Update Text Content Stats
  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setElText("stat-quizzes-val", totalQuizzes);
  setElText("stat-solved-val", totalAnswered);
  setElText("stat-accuracy-val", `${overallAccuracy}%`);
  setElText("stat-correct-val", totalCorrect);
  setElText("stat-study-time-val", `${data.studyTime?.today || 0}m`);
  setElText("stat-avg-score-val", `${averageScore}%`);
  setElText("stat-best-subject", bestSub);
  setElText("stat-weakest-subject", worstSub);

  // 4. Update Quiz Completion Progress Bars
  subjects.forEach(sub => {
    const progressPercent = data.progress[sub] || 0;
    
    // Set standard progress text
    const textEl = document.getElementById(`progress-text-${sub.toLowerCase()}`);
    if (textEl) {
      textEl.textContent = `${progressPercent}%`;
    }

    // Set unicode-themed progress bar text
    const unicodeEl = document.getElementById(`progress-unicode-${sub.toLowerCase()}`);
    if (unicodeEl) {
      unicodeEl.textContent = getUnicodeProgressBar(progressPercent);
    }

    // Adjust inline Tailwind width for the visual progress bar fill
    const fillEl = document.getElementById(`progress-bar-${sub.toLowerCase()}`);
    if (fillEl) {
      fillEl.style.width = `${progressPercent}%`;
    }
  });

  // 5. Populate Recent Quiz Attempts Table
  const recentTableBody = document.getElementById("recent-attempts-table-body");
  if (recentTableBody) {
    recentTableBody.innerHTML = "";
    const recentScores = [...scores].reverse().slice(0, 5); // top 5 newest

    if (recentScores.length === 0) {
      recentTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-6 py-8 text-center text-sm text-slate-400 dark:text-slate-500 font-medium">
            No quiz attempts recorded yet. Launch your first grand test session to see metrics here! 🩺🚀
          </td>
        </tr>
      `;
    } else {
      recentScores.forEach(s => {
        const row = document.createElement("tr");
        row.className = "border-b border-slate-100 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-all";
        
        const formattedDate = new Date(s.date).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        });

        const scorePercent = Math.round((s.correct / s.total) * 100);
        let badgeClass = "bg-rose-50 text-rose-600 border-rose-200/50";
        if (scorePercent >= 80) badgeClass = "bg-emerald-50 text-emerald-600 border-emerald-200/50";
        else if (scorePercent >= 60) badgeClass = "bg-amber-50 text-amber-600 border-amber-200/50";

        row.innerHTML = `
          <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-slate-100">${s.subject}</td>
          <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-medium">${s.exam}</td>
          <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400">${formattedDate}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="text-xs font-semibold px-2 py-1 rounded-md border ${badgeClass}">${s.correct}/${s.total} (${scorePercent}%)</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-slate-400 font-mono">${formatDuration(s.duration || 0)}</td>
        `;
        recentTableBody.appendChild(row);
      });
    }
  }

  // 6. Draw Charts
  try {
    renderTrendChart(document.getElementById("trendChart"), scores);
    renderDistributionChart(document.getElementById("distributionChart"), scores);
    renderComparisonChart(document.getElementById("comparisonChart"), scores);
  } catch (err) {
    console.error("Chart generation failed:", err);
  }
}
