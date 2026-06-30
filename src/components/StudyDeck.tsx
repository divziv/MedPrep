import React, { useState } from "react";
import { 
  Sparkles, 
  HelpCircle, 
  Heart, 
  Stethoscope, 
  ShieldAlert, 
  Check, 
  Award,
  BookOpen
} from "lucide-react";

interface Flashcard {
  id: string;
  subject: "Cardiovascular System" | "Neurology" | "Obstetrics";
  topic: string;
  front: string;
  back: string;
  highYieldPearl: string;
}

const FLASHCARDS: Flashcard[] = [
  {
    id: "cardio_f1",
    subject: "Cardiovascular System",
    topic: "Myocardial Infarction / CAD",
    front: "What is the classic clinical triad of a Right Ventricular (RV) Infarction, and what medications are contraindicated?",
    back: "Triad: Hypotension + Elevated JVP + Clear Lungs (with acute inferior MI). Contraindicated: Nitrates, Diuretics, and Beta-blockers (as they drop preload, inducing cardiogenic shock). Treat immediately with IV fluids.",
    highYieldPearl: "🔥 RV MI is highly preload-dependent. Standard nitroglycerin or furosemide will drop cardiac output precipitously!"
  },
  {
    id: "cardio_f2",
    subject: "Cardiovascular System",
    topic: "Infective Endocarditis",
    front: "Contrast Janeway lesions and Osler's nodes in Infective Endocarditis.",
    back: "Janeway lesions: Painless, flat, erythematous/hemorrhagic macules on palms/soles due to septic embolization. Osler's nodes: Painful, raised, violaceous nodules on fingers/toes due to immune complex deposition.",
    highYieldPearl: "🔥 Mnemonic: 'O'sler = 'O'uch (Painful). Janeway = Painless!"
  },
  {
    id: "cardio_f3",
    subject: "Cardiovascular System",
    topic: "Mitral Stenosis",
    front: "Why does Mitral Stenosis rapidly decompensate in the second trimester of pregnancy?",
    back: "Pregnancy increases circulating blood volume by 50% and raises heart rate. In Mitral Stenosis, the narrowed valve restricts outflow, and the shortened diastole reduces filling time, elevating left atrial pressure and causing pulmonary edema.",
    highYieldPearl: "🔥 MS is the most common and highest-risk rheumatic valvular pathology encountered in obstetrics."
  },
  {
    id: "neuro_f1",
    subject: "Neurology",
    topic: "Stroke Syndromes",
    front: "How do you distinguish Anterior Cerebral Artery (ACA) from Middle Cerebral Artery (MCA) strokes based on clinical motor/sensory deficits?",
    back: "ACA strokes present with contralateral deficits affecting the lower limb (leg/foot) significantly more than the upper limb/face. MCA strokes present with contralateral deficits where the face and arm are affected much more than the leg, along with aphasia.",
    highYieldPearl: "🔥 Think Homunculus: The medial cortex (ACA) maps the lower limbs, whereas the lateral convexity (MCA) maps the face, arm, and speech centers."
  },
  {
    id: "neuro_f2",
    subject: "Neurology",
    topic: "Multiple Sclerosis",
    front: "What is Uhthoff's phenomenon, and what is its underlying neuro-pathophysiological explanation?",
    back: "Uhthoff's phenomenon is the transient worsening of neurological symptoms (like blurred vision) with elevated body temperature (e.g., hot bath or exercise). It is caused by temperature-sensitive conduction block in demyelinated axons.",
    highYieldPearl: "🔥 Lhermitte's sign (electric shocks on neck flexion) and oligoclonal IgG bands in CSF are other key MS findings."
  },
  {
    id: "neuro_f3",
    subject: "Neurology",
    topic: "Meningitis Diagnostics",
    front: "Describe the typical cerebrospinal fluid (CSF) findings in tuberculous meningitis.",
    back: "TB Meningitis CSF shows: Elevated opening pressure, moderate lymphocytic pleocytosis, significantly elevated protein levels, and markedly reduced glucose levels (CSF/blood glucose ratio < 0.3). Cobweb coagulum is often seen.",
    highYieldPearl: "🔥 Bacterial meningitis shows neutrophilic predominance, whereas TB shows lymphocytic predominance with low glucose."
  },
  {
    id: "ob_f1",
    subject: "Obstetrics",
    topic: "Eclampsia (MgSO4)",
    front: "What are the three mandatory clinical monitoring parameters before administering each dose of Magnesium Sulfate (MgSO4)?",
    back: "(1) Patellar reflex must be present, (2) Respiratory rate must be ≥ 16 breaths per minute, and (3) Urine output must be ≥ 30 mL per hour (or 100 mL in 4 hours). Antidote is Calcium Gluconate.",
    highYieldPearl: "🔥 Therapeutic MgSO4 range is 4-7 mEq/L. Loss of deep tendon reflexes is the earliest warning sign of toxicity (at 9-12 mEq/L)."
  },
  {
    id: "ob_f2",
    subject: "Obstetrics",
    topic: "Antepartum Hemorrhage",
    front: "How does the uterine palpation feel different in Placenta Previa vs Abruptio Placentae?",
    back: "In Placenta Previa, the uterus is soft, relaxed, and non-tender (painless, bright red bleeding). In Abruptio Placentae, the uterus is tense, rigid, highly tender, and often feels 'woody' hard to the touch.",
    highYieldPearl: "🔥 Vaginal digital exams are strictly prohibited in third-trimester bleeding until placenta previa is ruled out by ultrasound."
  },
  {
    id: "ob_f3",
    subject: "Obstetrics",
    topic: "Postpartum Hemorrhage",
    front: "What is the most common cause of primary Postpartum Hemorrhage (PPH), and what is the first-line pharmacotherapy?",
    back: "Most common cause is Uterine Atony (Tone - 80% of cases). First-line pharmacotherapy is intravenous Oxytocin infusion (along with active uterine bimanual massage). Second-line includes Methylergometrine, Carboprost, and Misoprostol.",
    highYieldPearl: "🔥 Remember the 4 Ts of PPH: Tone (Atony), Tissue (Retained Placenta), Trauma (Lacerations), and Thrombin (Coagulopathy)."
  }
];

export default function StudyDeck() {
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIds, setMasteredIds] = useState<string[]>([]);

  const filteredCards = FLASHCARDS.filter(
    (card) => selectedSubject === "All" || card.subject === selectedSubject
  );

  const activeCard = filteredCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }, 150);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => 
      prev.includes(id) ? prev.filter((mId) => mId !== id) : [...prev, id]
    );
  };

  const getSubjectIcon = (subject: string) => {
    if (subject === "Cardiovascular System") return <Heart className="w-4 h-4 text-red-500" />;
    if (subject === "Neurology") return <ShieldAlert className="w-4 h-4 text-blue-500" />;
    return <Stethoscope className="w-4 h-4 text-purple-500" />;
  };

  return (
    <div id="study-deck-container" className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div id="deck-header" className="bg-white dark:bg-[#181824] lilac:bg-purple-50/20 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 lilac:border-purple-200/50 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center space-x-2 font-sans tracking-tight">
            <Sparkles className="w-5 h-5 text-purple-600 fill-current" />
            <span>High-Yield Active Recall Deck</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">Review critical medical PG formulas, triads, and syndromes</p>
        </div>

        {/* Subject Filter Tab */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100/80 dark:bg-slate-800/80 p-1 rounded-xl">
          {["All", "Cardiovascular System", "Neurology", "Obstetrics"].map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0); // reset index
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedSubject === sub
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {sub === "All" ? "All Subjects" : sub.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {filteredCards.length > 0 ? (
        <div className="space-y-6">
          {/* Flashcard Frame */}
          <div 
            id="flashcard-box"
            className="perspective-1000 h-80 sm:h-96 w-full"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div 
              id="flashcard-inner"
              className={`relative w-full h-full rounded-3xl transition-transform duration-500 transform-style-3d cursor-pointer ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front Side */}
              <div className="absolute inset-0 bg-white dark:bg-slate-900 lilac:bg-purple-50/50 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 lilac:border-purple-200 flex flex-col justify-between shadow-md backface-hidden">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1">
                      {getSubjectIcon(activeCard.subject)}
                      <span>{activeCard.subject}</span>
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] px-2 py-1 rounded-full font-medium">
                      {activeCard.topic}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    Flashcard {currentIndex + 1}
                  </div>
                </div>

                <div className="my-auto text-center py-6">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 lilac:text-purple-950 leading-relaxed">
                    {activeCard.front}
                  </h3>
                  <p className="text-xs text-slate-400 mt-4 animate-pulse">
                    Click card to reveal high-yield answer & clinical pearl 💡
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <span>Topic Recall Framework</span>
                  <Award className="w-4 h-4 text-purple-500" />
                </div>
              </div>

              {/* Back Side (Rotated) */}
              <div className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 lilac:bg-purple-50/60 p-6 sm:p-8 rounded-3xl border border-purple-300/60 dark:border-purple-900/60 flex flex-col justify-between shadow-lg rotate-y-180 backface-hidden overflow-y-auto">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1">
                    <span>Clinical Answer Key</span>
                  </span>
                  <div className="text-xs font-mono text-slate-400">
                    Active Recall Key
                  </div>
                </div>

                <div className="my-auto py-4 space-y-4 text-left">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Concept Summary</div>
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-semibold">
                      {activeCard.back}
                    </p>
                  </div>

                  {activeCard.highYieldPearl && (
                    <div className="bg-purple-100/50 dark:bg-purple-950/20 p-3 rounded-xl text-[11px] font-semibold text-purple-900 dark:text-purple-300 flex items-start space-x-1.5">
                      <span>💡</span>
                      <span>{activeCard.highYieldPearl}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs border-t border-slate-100 dark:border-slate-800 pt-3" onClick={(e) => e.stopPropagation()}>
                  <span className="text-slate-400">Click anywhere to flip back</span>
                  <button
                    onClick={() => toggleMastered(activeCard.id)}
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition ${
                      masteredIds.includes(activeCard.id)
                        ? "bg-emerald-600 text-white"
                        : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 hover:bg-purple-200"
                    }`}
                  >
                    <span>{masteredIds.includes(activeCard.id) ? "✓ Mastered" : "Mark Mastered"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Flashcard Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition"
            >
              Previous Card
            </button>

            <span className="text-xs text-slate-500 font-bold">
              Card {currentIndex + 1} of {filteredCards.length}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="px-4 py-2.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition shadow-sm"
            >
              Next Card
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-slate-400 text-sm">No flashcards match the selected filter.</p>
        </div>
      )}
    </div>
  );
}
