import { Question } from "../types";

export const QUESTIONS: Question[] = [
  // ==========================================
  // CARDIOVASCULAR SYSTEM (GENERAL MEDICINE)
  // ==========================================
  {
    id: "cardio_001",
    subject: "Cardiovascular System",
    subTopic: "Myocardial Infarction / CAD",
    exam: "INI-CET",
    year: 2023,
    questionText: "A 52-year-old male with chronic hypertension presents to the emergency department with severe, crushing substernal chest pain of 4 hours duration, radiating to his left shoulder. His blood pressure is 85/50 mmHg and heart rate is 58 bpm. The jugular venous pressure is elevated to 10 cm H2O, and his lung fields are completely clear to auscultation. The ECG demonstrates 3 mm ST-segment elevation in leads II, III, and aVF. Which of the following is the most appropriate next step in management?",
    options: [
      "Administer IV Metoprolol 5 mg slowly over 10 minutes",
      "Immediate administration of IV Nitroglycerin infusion",
      "Aggressive IV Normal Saline bolus (300-500 mL) to restore preload",
      "Administer IV Furosemide 40 mg to treat pulmonary congestion"
    ],
    correctAnswerIndex: 2,
    explanation: "The clinical triad of hypotension, elevated JVP (distended neck veins), and clear lung fields in the setting of an acute inferior wall myocardial infarction (ST elevations in II, III, aVF) is highly diagnostic of Right Ventricular (RV) Infarction. In RV infarction, the right ventricle loses its contractile force, making the cardiac output highly dependent on venous return (preload). Nitrates, diuretics, and beta-blockers decrease preload or contractility and can precipitate catastrophic cardiogenic shock. Therefore, the immediate first-line management is volume expansion with IV fluid boluses to maintain right ventricular preload.",
    pearl: "⭐ RV Infarction Pearl: Classic triad = Hypotension + Elevated JVP + Clear Lungs. Treat with IV fluids! NEVER give Nitrates or Diuretics."
  },
  {
    id: "cardio_002",
    subject: "Cardiovascular System",
    subTopic: "Valvular Heart Diseases",
    exam: "NEET PG",
    year: 2022,
    questionText: "A 28-year-old pregnant female in her second trimester presents with progressive dyspnea on exertion and orthopnea. On cardiovascular auscultation, there is a loud first heart sound (S1), a high-pitched opening snap shortly after S2, and a low-pitched, mid-diastolic rumbling murmur at the apex, which is best heard with the bell of the stethoscope in the left lateral decubitus position. What is the most likely diagnosis?",
    options: [
      "Aortic Stenosis",
      "Mitral Regurgitation",
      "Mitral Stenosis",
      "Aortic Regurgitation"
    ],
    correctAnswerIndex: 2,
    explanation: "The combination of a loud S1, an opening snap (OS), and a low-pitched mid-diastolic rumbling murmur with presystolic accentuation at the apex is pathognomonic for Mitral Stenosis (MS). Pregnancy causes a physiological increase in blood volume (by 40-50%) and heart rate. In mitral stenosis, this hyperdynamic state increases the transmitral pressure gradient and decreases diastolic filling time, which rapidly decompensates asymptomatic MS into severe symptomatic dyspnea, orthopnea, or pulmonary edema during the second trimester.",
    pearl: "⭐ Mitral Stenosis (MS) Pearl: Most common rheumatic valvular lesion in pregnancy. Characterized by Loud S1, Opening Snap, and Mid-Diastolic Rumble."
  },
  {
    id: "cardio_003",
    subject: "Cardiovascular System",
    subTopic: "Heart Failure & Shock",
    exam: "INI-CET",
    year: 2022,
    questionText: "A 65-year-old female with long-standing heart failure with reduced ejection fraction (HFEF, LVEF 30%) is currently taking Lisinopril, Carvedilol, and Furosemide. Despite adherence, she remains in NYHA Class III heart failure. To optimize medical therapy and reduce mortality, her physician decides to add an aldosterone antagonist (Spironolactone). Which of the following lab thresholds is a contraindication to initiating Spironolactone in this patient?",
    options: [
      "Serum Potassium of 4.8 mEq/L",
      "Estimated Glomerular Filtration Rate (eGFR) of 25 mL/min/1.73m²",
      "Serum Sodium of 132 mEq/L",
      "Systolic Blood Pressure of 105 mmHg"
    ],
    correctAnswerIndex: 1,
    explanation: "Mineralocorticoid receptor antagonists (MRAs) like Spironolactone reduce mortality in NYHA Class II-IV HFrEF. However, they carry a high risk of life-threatening hyperkalemia. Contraindications to starting MRAs include: (1) Serum Potassium > 5.0 mEq/L, and (2) Severe renal impairment, defined as an eGFR < 30 mL/min/1.73m² (or serum creatinine > 2.5 mg/dL in men, > 2.0 mg/dL in women). Since this patient's eGFR is 25 mL/min/1.73m², starting Spironolactone is strictly contraindicated.",
    pearl: "⭐ Spironolactone Safety limits: Do NOT initiate if Potassium > 5.0 mEq/L or Creatinine > 2.5 mg/dL (or eGFR < 30 mL/min)."
  },
  {
    id: "cardio_004",
    subject: "Cardiovascular System",
    subTopic: "Arrhythmias & ECG Interpretation",
    exam: "NEET PG",
    year: 2023,
    questionText: "A 23-year-old female presents to the clinic with recurrent episodes of sudden-onset palpitation, dizziness, and shortness of breath that terminate abruptly. During an active episode, her ECG demonstrates a regular, narrow-complex tachycardia with a rate of 190 bpm, with retrograde P waves visible immediately following the QRS complexes (pseudo-S waves in inferior leads). Carotid sinus massage terminates the rhythm instantly. What is the most likely mechanism of this arrhythmia?",
    options: [
      "Reentry within the sinoatrial node",
      "Dual AV nodal pathways with a slow and fast pathway (AVNRT)",
      "An accessory bypass tract (Kent bundle) with orthodromic conduction (AVRT)",
      "Triggered activity due to delayed afterdepolarizations (DADs)"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation describes Paroxysmal Supraventricular Tachycardia (PSVT), most commonly caused by Atrioventricular Nodal Reentrant Tachycardia (AVNRT). AVNRT is driven by a micro-reentrant circuit utilizing dual AV nodal pathways: a slow pathway (with short refractory period) and a fast pathway (with long refractory period). During tachycardia (usually triggered by a premature atrial contraction), conduction travels down the slow pathway and retrograde up the fast pathway, producing retrograde P waves obscured within or immediately following the QRS complex (often presenting as pseudo-S waves in inferior leads or pseudo-R' in V1). Carotid massage increases vagal tone, slowing AV nodal conduction and breaking the reentrant loop.",
    pearl: "⭐ AVNRT Pearl: Most common cause of PSVT in young healthy individuals. Uses dual AV nodal pathways (Slow and Fast)."
  },
  {
    id: "cardio_005",
    subject: "Cardiovascular System",
    subTopic: "Infective Endocarditis",
    exam: "AIIMS PG",
    year: 2019,
    questionText: "A 35-year-old intravenous drug abuser presents with a 10-day history of high-grade fever, chills, and progressive pleuritic chest pain. On physical examination, a grade 2/6 holosystolic murmur is heard best at the lower left sternal border, which increases in intensity during deep inspiration (Carvallo's sign). Chest X-ray reveals multiple bilateral, nodular, cavitary lesions. Which of the following is the most likely causative organism and the affected cardiac valve?",
    options: [
      "Streptococcus viridans on Mitral Valve",
      "Staphylococcus aureus on Tricuspid Valve",
      "Enterococcus faecalis on Aortic Valve",
      "Streptococcus bovis on Tricuspid Valve"
    ],
    correctAnswerIndex: 1,
    explanation: "Intravenous drug abusers (IVDUs) are highly predisposed to Right-Sided Infective Endocarditis, with the Tricuspid Valve being the most commonly affected site (>70% of cases). The most common causative pathogen in this cohort is Staphylococcus aureus. Tricuspid regurgitation produces a holosystolic murmur at the left lower sternal border that increases with inspiration (Carvallo's sign, representing increased right heart venous return). Septic emboli shed from the tricuspid valve enter the pulmonary circulation, causing multiple focal infarctions, nodules, and cavities visible on chest X-ray.",
    pearl: "⭐ Right-Sided IE Pearl: IV drug abusers + Staphylococcus aureus + Tricuspid valve. Look for positive Carvallo's sign and septic pulmonary emboli."
  },
  {
    id: "cardio_006",
    subject: "Cardiovascular System",
    subTopic: "Arrhythmias & ECG Interpretation",
    exam: "FMGE",
    year: 2021,
    questionText: "A 45-year-old male with history of heavy alcohol intake is brought to the emergency department after collapsing at home. His ECG reveals a chaotic, irregular, polymorphic ventricular tachycardia with continuously cycling QRS morphology that appears to twist around the virtual baseline. The QT interval on previous ECG was prolonged (520 ms). What is the drug of choice for the immediate management of this hemodynamically stable arrhythmia?",
    options: [
      "Intravenous Amiodarone",
      "Intravenous Magnesium Sulfate",
      "Intravenous Lidocaine",
      "Intravenous Metoprolol"
    ],
    correctAnswerIndex: 1,
    explanation: "The ECG description represents Torsades de Pointes (TdP), a form of polymorphic ventricular tachycardia characterized by QRS complexes twisting around the isoelectric line, occurring in the setting of prolonged QT interval (congenital or acquired, such as drug-induced or electrolyte-mediated). The immediate first-line treatment for both hemodynamically stable TdP and prevention of recurrences is Intravenous Magnesium Sulfate (1-2 g infused over a few minutes), which stabilizes the cardiac membrane by blocking L-type calcium channels and reducing early afterdepolarizations.",
    pearl: "⭐ Torsades de Pointes (TdP) Pearl: Twisting of QRS complexes on a prolonged QT. First-line therapy is IV Magnesium Sulfate, regardless of magnesium level!"
  },
  {
    id: "cardio_007",
    subject: "Cardiovascular System",
    subTopic: "Heart Failure & Shock",
    exam: "DNB-CET",
    year: 2021,
    questionText: "A 40-year-old male presents with worsening dyspnea on exertion. Echocardiogram shows a thickened left ventricular wall (septum-to-free-wall ratio of 1.4) with marked diastolic dysfunction, left atrial enlargement, and a normal ejection fraction (65%). Biopsy of the myocardium shows extracellular deposition of amorphous eosinophilic material that stains positive with Congo Red and demonstrates apple-green birefringence under polarized light. What is the diagnosis?",
    options: [
      "Dilated Cardiomyopathy",
      "Hypertrophic Obstructive Cardiomyopathy (HOCM)",
      "Restrictive Cardiomyopathy due to Amyloidosis",
      "Constrictive Pericarditis"
    ],
    correctAnswerIndex: 2,
    explanation: "The endomyocardial biopsy showing extracellular, amorphous, eosinophilic deposits that exhibit apple-green birefringence on Congo Red staining under polarized light is highly diagnostic of Cardiac Amyloidosis. This is the classic cause of Restrictive Cardiomyopathy, presenting with severe diastolic dysfunction, thickened ventricular walls (due to amyloid fibrils, mimicking hypertrophy), bi-atrial enlargement, and normal or near-normal systolic function (HFpEF) until advanced stages.",
    pearl: "⭐ Amyloidosis Pearl: Congo Red stain + Apple-green birefringence = Amyloidosis. Classic cause of Restrictive Cardiomyopathy."
  },
  {
    id: "cardio_008",
    subject: "Cardiovascular System",
    subTopic: "Heart Failure & Shock",
    exam: "AI Pattern Question",
    year: 2026,
    questionText: "A 62-year-old male with chronic ischemic cardiomyopathy is admitted for acute decompensated heart failure with signs of cardiogenic shock (BP 82/50 mmHg, CI 1.8 L/min/m², PCWP 24 mmHg). An inodilator (milrinone) is initiated. Which of the following describes the mechanism of action of Milrinone?",
    options: [
      "Inhibition of Phosphodiesterase-3 (PDE3), increasing intracellular cAMP in myocardium and smooth muscle",
      "Selective beta-1 adrenergic receptor agonist, activating adenylate cyclase",
      "Inhibition of Na+/K+ ATPase pump, increasing intracellular sodium and calcium",
      "Direct activation of soluble guanylate cyclase, increasing intracellular cGMP"
    ],
    correctAnswerIndex: 0,
    explanation: "Milrinone is a selective Phosphodiesterase-3 (PDE3) inhibitor. By preventing the breakdown of cAMP in cardiac myocytes, it increases intracellular cAMP, enhancing calcium influx and leading to a positive inotropic effect (increased contractility). In vascular smooth muscle, the increased cAMP levels lead to calcium uptake by the sarcoplasmic reticulum and subsequent vasodilation (decreased systemic and pulmonary vascular resistance, reducing afterload and preload). Thus, milrinone acts as an 'inodilator'.",
    pearl: "⭐ Milrinone Pearl: PDE-3 Inhibitor. Inodilator: Increases contractility (+ Inotrope) while causing vasodilation (decreases afterload/preload)."
  },

  // ==========================================
  // NEUROLOGY (GENERAL MEDICINE)
  // ==========================================
  {
    id: "neuro_001",
    subject: "Neurology",
    subTopic: "Stroke & Cerebrovascular Accidents",
    exam: "INI-CET",
    year: 2023,
    questionText: "A 62-year-old male presents with sudden-onset weakness of his left side. On neurological examination, he has left-sided hemiplegia and hemisensory loss, with the lower limb significantly more affected than the upper limb and face. He also exhibits urinary incontinence and transcortical motor aphasia. Which vascular territory is most likely occluded in this patient?",
    options: [
      "Right Middle Cerebral Artery (MCA)",
      "Right Anterior Cerebral Artery (ACA)",
      "Right Posterior Cerebral Artery (PCA)",
      "Right Lenticulostriate Artery"
    ],
    correctAnswerIndex: 1,
    explanation: "The Anterior Cerebral Artery (ACA) supplies the medial aspect of the cerebral cortex, which represents the motor and sensory areas of the contralateral lower limb and foot. Therefore, a classic ACA occlusion presents with contralateral hemiparesis and hemisensory loss that is significantly worse in the leg/foot than in the upper extremity or face. Other signs include urinary incontinence (due to involvement of the paracentral lobule) and transcortical motor aphasia or abulia (apathy/lack of initiative) due to frontal lobe involvement.",
    pearl: "⭐ Stroke Localization: ACA = Leg > Arm/Face + Urinary Incontinence. MCA = Face/Arm > Leg + Aphasia/Neglect."
  },
  {
    id: "neuro_002",
    subject: "Neurology",
    subTopic: "Epilepsy & Seizure Disorders",
    exam: "NEET PG",
    year: 2023,
    questionText: "An 8-year-old girl is brought by her teacher who noticed multiple episodes daily where the child suddenly stops writing, stares blankly into space for 10-15 seconds, and then continues writing as if nothing happened. There are no motor convulsions, no aura, and no post-ictal confusion. The episodes can be reliably triggered in the clinic by hyperventilation. What is the most characteristic EEG finding associated with this condition?",
    options: [
      "Hypsarrhythmia pattern",
      "Generalized 3 Hz spike-and-wave discharges",
      "Temporal lobe spikes",
      "Centrolateral polyspike-and-wave discharges"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation is characteristic of Absence (petit mal) Seizures, which typically occur in school-aged children. These episodes feature sudden, brief lapses of consciousness staring blankly, without loss of postural tone or post-ictal confusion, and can be precipitated by hyperventilation. The pathognomonic EEG finding during an absence seizure is generalized, symmetric 3 Hz (cycles per second) spike-and-wave complexes.",
    pearl: "⭐ Absence Seizure Pearl: Staring spells + Hyperventilation trigger + 3 Hz spike-and-wave on EEG. Drug of choice is Ethosuximide (or Valproate)."
  },
  {
    id: "neuro_003",
    subject: "Neurology",
    subTopic: "Meningitis & Encephalitis",
    exam: "INI-CET",
    year: 2021,
    questionText: "A 45-year-old male presents with severe headache, high-grade fever, neck stiffness, and photophobia of 2 days duration. On examination, Kernig's and Brudzinski's signs are positive. A lumbar puncture is performed. The cerebrospinal fluid (CSF) analysis reveals: Opening pressure 250 mm H2O (elevated), WBC 1200 cells/mm³ with 90% polymorphonuclear neutrophils, Protein 250 mg/dL (markedly elevated), and Glucose 15 mg/dL (markedly reduced). What is the most likely diagnosis?",
    options: [
      "Viral Meningitis",
      "Acute Bacterial Meningitis",
      "Tuberculous Meningitis",
      "Fungal Meningitis"
    ],
    correctAnswerIndex: 1,
    explanation: "The CSF profile is highly diagnostic of Acute Bacterial Meningitis. Key features include: (1) Marked pleocytosis (>1000 cells/mm³) with neutrophil predominance (PMNs > 80-90%), (2) Markedly elevated protein levels (>100-200 mg/dL), and (3) Low CSF glucose (<40 mg/dL or CSF-to-blood glucose ratio < 0.4) because bacteria consume glucose for glycolysis. Viral meningitis, in contrast, typically shows normal glucose, moderate lymphocytic pleocytosis, and mildly elevated protein.",
    pearl: "⭐ CSF Meningitis Profile: Bacterial = High PMNs + Very High Protein + Very Low Glucose. Viral = Lymphocytes + Mildly High Protein + Normal Glucose. TB/Fungal = Lymphocytes + High Protein + Low Glucose."
  },
  {
    id: "neuro_004",
    subject: "Neurology",
    subTopic: "Demyelinating & Neurodegenerative Diseases",
    exam: "AIIMS PG",
    year: 2018,
    questionText: "A 28-year-old female presents with sudden-onset painful loss of vision in her left eye, which worsens with eye movement. She also reports a strange electrical sensation radiating down her spine into her legs upon flexing her neck (Lhermitte's sign) and transient worsening of her neurological symptoms when taking a hot shower (Uhthoff's phenomenon). MRI of the brain demonstrates multiple periventricular white matter demyelinating lesions oriented perpendicular to the ventricles. What is the most specific CSF finding for this condition?",
    options: [
      "Marked pleocytosis with neutrophil predominance",
      "Oligoclonal bands of IgG on immunofixation electrophoresis",
      "Presence of 14-3-3 protein",
      "Marked albuminocytologic dissociation"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation is pathognomonic for Multiple Sclerosis (MS), a chronic autoimmune demyelinating disease of the central nervous system. Optic neuritis (painful unilateral vision loss), Lhermitte's sign, Uhthoff's phenomenon, and periventricular white matter demyelinating plaques (Dawson's fingers) are classic features. The most supportive and specific CSF finding in MS is the presence of oligoclonal IgG bands (OCBs) on gel electrophoresis that are not present in a matching serum sample, indicating localized intrathecal immunoglobulin synthesis.",
    pearl: "⭐ Multiple Sclerosis (MS) Pearl: Optic Neuritis + Uhthoff's (hot shower) + Lhermitte's (neck flex) + CSF Oligoclonal bands."
  },
  {
    id: "neuro_005",
    subject: "Neurology",
    subTopic: "Neuromuscular Junction Disorders & Neuropathies",
    exam: "NEET PG",
    year: 2021,
    questionText: "A 35-year-old female presents with progressive double vision (diplopia) and drooping of both eyelids (ptosis) that worsens significantly at the end of the day or after prolonged reading. There is no muscle pain or sensory loss. On examination, she has bilateral ptosis that increases during sustained upward gaze. Ice pack application over the eyelids for 2 minutes leads to a significant improvement in the ptosis. What is the underlying pathophysiology of this condition?",
    options: [
      "Autoantibodies against the voltage-gated calcium channels in presynaptic terminals",
      "Autoantibodies against the post-synaptic nicotinic acetylcholine receptors (AChR)",
      "Demyelination of the peripheral cranial nerves III, IV, and VI",
      "Degeneration of motor neurons in the anterior horn of the spinal cord"
    ],
    correctAnswerIndex: 1,
    explanation: "The patient has Myasthenia Gravis (MG), an autoimmune neuromuscular junction disorder characterized by fatiguable muscle weakness (worse with repetition and at the end of the day), frequently presenting with ocular symptoms (ptosis, fluctuating diplopia). Ptosis worsens during sustained upward gaze (fatigue) and improves with cold temperature (the Ice Pack Test) because cold inhibits acetylcholinesterase, keeping acetylcholine in the synaptic cleft longer. MG is caused by autoantibodies directed against the post-synaptic nicotinic acetylcholine receptors (AChR) on the motor endplate, leading to receptor destruction and impaired neuromuscular transmission.",
    pearl: "⭐ Myasthenia Gravis (MG) Pearl: Post-synaptic AChR antibodies + Fatiguable weakness + Ptosis improves with Ice Pack test."
  },
  {
    id: "neuro_006",
    subject: "Neurology",
    subTopic: "Neuromuscular Junction Disorders & Neuropathies",
    exam: "FMGE",
    year: 2022,
    questionText: "A 30-year-old male presents with rapidly progressive, symmetrical ascending weakness of both lower limbs of 3 days duration, which has now ascended to involve his hands. He reports an episode of watery diarrhea 2 weeks ago. On examination, he has flaccid paralysis with completely absent deep tendon reflexes (areflexia) in all four limbs. Sensory examination is unremarkable. Lumbar puncture shows: CSF Protein 180 mg/dL, WBC 4 cells/mm³. What is the most likely diagnosis?",
    options: [
      "Poliomyelitis",
      "Guillain-Barré Syndrome (GBS)",
      "Myasthenia Gravis",
      "Multiple Sclerosis"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation of rapidly progressive, symmetrical ascending flaccid paralysis accompanied by areflexia, occurring after a diarrheal illness (classically Campylobacter jejuni), is highly diagnostic of Guillain-Barré Syndrome (GBS / Acute Inflammatory Demyelinating Polyneuropathy). The hallmark CSF finding in GBS is Albuminocytologic Dissociation: a marked elevation in CSF protein levels (due to nerve root inflammation and blood-CSF barrier breakdown) with a normal or near-normal white blood cell count.",
    pearl: "⭐ GBS Pearl: Ascending flaccid paralysis + Areflexia + Campylobacter jejuni link + CSF Albuminocytologic Dissociation."
  },
  {
    id: "neuro_007",
    subject: "Neurology",
    subTopic: "Demyelinating & Neurodegenerative Diseases",
    exam: "NEET PG",
    year: 2022,
    questionText: "A 68-year-old male is brought by his family who noticed a progressive tremor in his right hand. On examination, he has a slow (4-6 Hz) resting tremor resembling a 'pill-rolling' motion that disappears with active movement. He also exhibits cogwheel rigidity, marked bradykinesia (demonstrated by micrographic writing), a expressionless mask-like face, and a stooped, shuffling gait with loss of arm swing. What is the pathological hallmark of this disease?",
    options: [
      "Amyloid plaques and neurofibrillary tangles containing hyperphosphorylated Tau",
      "Intracytoplasmic inclusions containing alpha-synuclein (Lewy bodies) in substantia nigra",
      "Loss of GABAergic neurons in the caudate nucleus and putamen",
      "Demyelination of the corticospinal tracts"
    ],
    correctAnswerIndex: 1,
    explanation: "This is a classic presentation of Parkinson's Disease, characterized by the clinical tetrad of resting pill-rolling tremor, bradykinesia, rigidity (cogwheel), and postural instability (stooped, shuffling gait). The pathological hallmark of Parkinson's is the loss of dopaminergic neurons in the pars compacta of the substantia nigra, accompanied by the presence of Lewy Bodies (intracytoplasmic, eosinophilic inclusions composed primarily of aggregated alpha-synuclein protein) within surviving neurons.",
    pearl: "⭐ Parkinson's Disease Pearl: Resting tremor + Rigidity + Bradykinesia + Substantia nigra dopamine loss + Alpha-synuclein (Lewy Bodies)."
  },
  {
    id: "neuro_008",
    subject: "Neurology",
    subTopic: "Epilepsy & Seizure Disorders",
    exam: "AI Pattern Question",
    year: 2026,
    questionText: "A 22-year-old male is brought to the emergency department in a state of continuous generalized tonic-clonic activity lasting over 10 minutes without returning to consciousness. What is the immediate first-line pharmacotherapy of choice to terminate this seizure activity?",
    options: [
      "Intravenous Phenytoin (or Fosphenytoin) loading",
      "Intravenous Lorazepam (0.1 mg/kg) administered at 2 mg/min",
      "Intravenous Valproic acid",
      "Intravenous Phenobarbital"
    ],
    correctAnswerIndex: 1,
    explanation: "The patient is in Status Epilepticus (defined as continuous seizure activity lasting >5 minutes, or recurrent seizures without full recovery of consciousness between episodes). The immediate first-line drug of choice to terminate status epilepticus is a rapid-acting benzodiazepine, with Intravenous Lorazepam being preferred due to its rapid onset and sustained duration in the CNS compared to diazepam. Once the acute seizure is terminated or during its administration, a long-acting anticonvulsant (like Phenytoin, Fosphenytoin, Levetiracetam, or Valproate) is co-administered to prevent recurrence.",
    pearl: "⭐ Status Epilepticus Protocol: First line = IV Lorazepam (or IV Diazepam / IM Midazolam). Second line = IV Fosphenytoin / Phenytoin / Levetiracetam."
  },

  // ==========================================
  // OBSTETRICS (STRICTLY NO GYNECOLOGY)
  // ==========================================
  {
    id: "ob_001",
    subject: "Obstetrics",
    subTopic: "Hypertensive Disorders of Pregnancy",
    exam: "INI-CET",
    year: 2023,
    questionText: "A 31-year-old primigravida at 34 weeks of gestation presents with a blood pressure of 165/110 mmHg, severe frontal headache, and visual blurriness. Urinalysis reveals 3+ protein. While being evaluated in the triage, she develops a generalized tonic-clonic convulsion. What is the immediate drug of choice for the prevention and treatment of seizures in this patient?",
    options: [
      "Intravenous Diazepam 10 mg slow bolus",
      "Intravenous Magnesium Sulfate (Pritchard or Zuspan regimen)",
      "Intravenous Phenytoin loading dose",
      "Intravenous Labetalol infusion"
    ],
    correctAnswerIndex: 1,
    explanation: "This patient has Eclampsia (development of generalized tonic-clonic seizures in a preeclamptic patient). The gold-standard drug of choice for the prevention and treatment of eclamptic seizures is Magnesium Sulfate (MgSO4), which is significantly more effective than standard anticonvulsants (like diazepam or phenytoin) and reduces maternal mortality. It can be administered via the Zuspan regimen (IV loading + maintenance) or the Pritchard regimen (combined IV and IM loading + IM maintenance). Labetalol is used to control severe hypertension but does not treat/prevent the seizures.",
    pearl: "⭐ Eclampsia Pearl: Anticonvulsant of choice is Magnesium Sulfate (MgSO4). Monitor: Patellar reflex, Respiration rate (>16/min), and Urine output (>30 mL/hr). Antidote is Calcium Gluconate!"
  },
  {
    id: "ob_002",
    subject: "Obstetrics",
    subTopic: "Antepartum & Postpartum Hemorrhage",
    exam: "NEET PG",
    year: 2023,
    questionText: "A 28-year-old multigravida at 32 weeks of gestation presents with sudden-onset, painless, bright red vaginal bleeding. She reports no history of trauma, abdominal pain, or contractions. On physical examination, her abdomen is soft, non-tender, and the uterus relaxed. Fetal heart rate is reassuring at 140 bpm. Which of the following is strictly contraindicated in the initial assessment of this patient?",
    options: [
      "Transabdominal Ultrasound",
      "Digital Vaginal Examination (Internal examination)",
      "Cardiotocography (CTG)",
      "Speculum examination with a sterile speculum"
    ],
    correctAnswerIndex: 1,
    explanation: "Sudden-onset, painless, bright red vaginal bleeding in the third trimester in a relaxed, non-tender uterus is highly characteristic of Placenta Previa. In placenta previa, the placenta covers or lies close to the internal cervical os. Performing a digital vaginal examination (internal examination) can disrupt the placenta from the lower uterine segment, triggering catastrophic, life-threatening maternal hemorrhage. Therefore, digital vaginal examination is strictly contraindicated until placenta previa is ruled out by ultrasound ('double setup' only in the OR if absolutely necessary).",
    pearl: "⭐ Placenta Previa Pearl: Painless, bright red bleeding + relaxed uterus. NO DIGITAL EXAMS! Diagnosis confirmed via Transabdominal/Transvaginal Ultrasound."
  },
  {
    id: "ob_003",
    subject: "Obstetrics",
    subTopic: "Antepartum & Postpartum Hemorrhage",
    exam: "INI-CET",
    year: 2022,
    questionText: "A 32-year-old primigravida at 38 weeks of gestation presents with sudden, severe abdominal pain and dark vaginal bleeding of 2 hours duration. On examination, she is hypertensive (BP 150/100 mmHg), and her uterus is tense, extremely tender, and 'woody' hard to palpation. Cardiotocography demonstrates late decelerations, indicating fetal distress. What is the most likely diagnosis?",
    options: [
      "Placenta Previa",
      "Abruptio Placentae (Placental Abruption)",
      "Uterine Rupture",
      "Vasa Previa"
    ],
    correctAnswerIndex: 1,
    explanation: "The clinical presentation of sudden-onset, severe, continuous abdominal pain, dark vaginal bleeding (which can be revealed or concealed), a tense, rigid, highly tender ('woody' hard) uterus, and signs of fetal distress in a hypertensive patient is classic for Abruptio Placentae (premature separation of a normally implanted placenta). This is a major obstetric emergency associated with severe complications like Disseminated Intravascular Coagulation (DIC) and Couvelaire uterus.",
    pearl: "⭐ Placental Abruption Pearl: Painful, dark bleeding + tense/woody uterus + fetal distress. High risk of maternal DIC!"
  },
  {
    id: "ob_004",
    subject: "Obstetrics",
    subTopic: "Antepartum & Postpartum Hemorrhage",
    exam: "NEET PG",
    year: 2021,
    questionText: "A 26-year-old primigravida delivers a healthy 3.8 kg male infant vaginally after an uncomplicated labor. Ten minutes after delivery of the placenta, she experiences brisk, heavy vaginal bleeding. On palpation, her uterus is soft, boggy, and reached above the umbilicus. What is the most common cause of postpartum hemorrhage (PPH) in this clinical scenario?",
    options: [
      "Retained placental fragments (Tissue)",
      "Uterine Atony (Tone)",
      "Genital tract laceration (Trauma)",
      "Coagulopathy (Thrombin)"
    ],
    correctAnswerIndex: 1,
    explanation: "Postpartum Hemorrhage (PPH) is defined as blood loss >500 mL after vaginal delivery or >1000 mL after cesarean section. The '4 Ts' of PPH etiology are Tone, Tissue, Trauma, and Thrombin. Among these, Uterine Atony (failure of the uterine myometrium to contract and compress the spiral arteries, presenting as a soft, boggy, poorly contracted uterus) is the most common cause of primary PPH, accounting for 75-80% of all cases.",
    pearl: "⭐ Postpartum Hemorrhage (PPH) Pearl: Most common cause is Uterine Atony (Tone). First-line management is uterine massage + IV Oxytocin."
  },
  {
    id: "ob_005",
    subject: "Obstetrics",
    subTopic: "Antenatal Care & Maternal Physiology",
    exam: "AIIMS PG",
    year: 2019,
    questionText: "A healthy 25-year-old primigravida at 12 weeks of gestation is evaluated for her routine antenatal labs. Her hemoglobin is 10.8 g/dL, hematocrit is 33%, and platelet count is 145,000/mm³. Which of the following physiological changes of pregnancy is primarily responsible for these laboratory findings?",
    options: [
      "True deficiency in iron absorption and erythropoietin production",
      "Disproportional increase in plasma volume relative to red blood cell mass (Physiological Hemodilution)",
      "Splenic sequestration of platelets and red blood cells during pregnancy",
      "Gestational suppression of bone marrow hematopoiesis by progesterone"
    ],
    correctAnswerIndex: 1,
    explanation: "During pregnancy, maternal plasma volume expands by approximately 45-50%, while the red blood cell mass increases by only 20-30%. This disproportionate expansion leads to a physiologic hemodilution, presenting as a decrease in hemoglobin concentration and hematocrit, known as the 'Physiological Anemia of Pregnancy' (normal lower limit is 11 g/dL in 1st/3rd trimesters, 10.5 g/dL in 2nd). Mild gestational thrombocytopenia (platelets 100,000-150,000/mm³) is also common and physiological due to hemodilution and increased consumption.",
    pearl: "⭐ Maternal Physiology Pearl: Plasma volume increases (50%) > RBC mass increases (25%) leading to physiologic hemodilution and mild physiological anemia."
  },
  {
    id: "ob_006",
    subject: "Obstetrics",
    subTopic: "Medical Complications in Pregnancy",
    exam: "FMGE",
    year: 2022,
    questionText: "A 29-year-old primigravida at 26 weeks of gestation undergoes a routine 75g Oral Glucose Tolerance Test (OGTT) for Gestational Diabetes Mellitus (GDM) screening. Which of the following diagnostic thresholds (venous plasma glucose), as per the International Association of Diabetes and Pregnancy Study Groups (IADPSG) and WHO criteria, is diagnostic of GDM?",
    options: [
      "Fasting glucose of 85 mg/dL",
      "1-hour post-load glucose of 185 mg/dL",
      "2-hour post-load glucose of 145 mg/dL",
      "Fasting glucose of 95 mg/dL"
    ],
    correctAnswerIndex: 1,
    explanation: "According to the IADPSG and WHO criteria (adopted by DIPSI in many Indian protocols), GDM is diagnosed if one or more of the following venous plasma glucose values are met or exceeded after a 75g OGTT at 24-28 weeks: (1) Fasting: ≥ 92 mg/dL, (2) 1-hour: ≥ 180 mg/dL, (3) 2-hour: ≥ 153 mg/dL. A 1-hour post-load glucose of 185 mg/dL meets this criteria, establishing a diagnosis of GDM.",
    pearl: "⭐ GDM (75g OGTT) Thresholds: Fasting ≥ 92 mg/dL | 1-Hour ≥ 180 mg/dL | 2-Hour ≥ 153 mg/dL. Just ONE abnormal value is diagnostic!"
  },
  {
    id: "ob_007",
    subject: "Obstetrics",
    subTopic: "Malpresentations & Labor",
    exam: "DNB-CET",
    year: 2020,
    questionText: "A 24-year-old primigravida at 39 weeks of gestation in active labor is evaluated. The cervix is 4 cm dilated, 60% effaced, soft, in an anterior position, and the fetal head station is at -1. What is the calculated Bishop Score for this patient and what does it primarily predict?",
    options: [
      "Bishop Score of 5; predicts the risk of shoulder dystocia",
      "Bishop Score of 7; predicts the likelihood of successful vaginal delivery / labor induction",
      "Bishop Score of 4; predicts the risk of uterine atony",
      "Bishop Score of 9; predicts the likelihood of breech conversion"
    ],
    correctAnswerIndex: 1,
    explanation: "The Bishop Score is a pre-labor scoring system used to predict the likelihood of successful labor induction or progression to vaginal delivery. It evaluates 5 parameters: Cervical dilation (0-3 points), Effacement (0-3 points), Station (0-3 points), Consistency (0-2 points), and Position (0-2 points). For this patient: Dilation 4 cm = 2 points; Effacement 60% = 2 points; Station -1 = 1 point; Consistency soft = 2 points; Position anterior = 2 points. Total Bishop Score = 2 + 2 + 1 + 2 + 2 = 9. (Note: A score of 7 or 8/13 indicates a highly favorable cervix with a high likelihood of successful vaginal delivery).",
    pearl: "⭐ Bishop Score Parameters: Dilation, Effacement, Station, Consistency, Position (Mnemonic: 'Don't Put Scared Cats Away'). Score ≥ 6-8 predicts favorable induction."
  },
  {
    id: "ob_008",
    subject: "Obstetrics",
    subTopic: "Medical Complications in Pregnancy",
    exam: "AI Pattern Question",
    year: 2026,
    questionText: "A 27-year-old pregnant female with a history of Rheumatic Heart Disease presents at 28 weeks of gestation with progressive orthopnea and nocturnal cough. Cardiovascular examination reveals a loud S1 and a diastolic rumble at the apex. She is diagnosed with severe Mitral Stenosis. Which of the following maternal-fetal periods carries the highest risk of acute hemodynamic decompensation and pulmonary edema in this patient?",
    options: [
      "First trimester during organogenesis",
      "At 20 weeks of gestation due to placental lactogen peak",
      "Immediately postpartum (first 24-48 hours after delivery) due to auto-transfusion of uterine blood",
      "Late third trimester (37-40 weeks) due to mechanical elevation of the diaphragm"
    ],
    correctAnswerIndex: 2,
    explanation: "In patients with severe Mitral Stenosis, the highest risk of acute pulmonary edema and hemodynamic collapse occurs during labor and the immediate postpartum period (first 24-48 hours). Immediately after delivery, the decompression of the gravid uterus from the inferior vena cava and the active contraction of the uterine sinusoids causes an acute 'auto-transfusion' of approximately 500-800 mL of blood back into the maternal systemic venous circulation. In a patient with restricted flow across the stenotic mitral valve, this sudden increase in preload causes a rapid surge in left atrial pressure and immediate pulmonary edema.",
    pearl: "⭐ Rheumatic Heart Disease in Pregnancy: The immediate postpartum period (first 24-48 hours) carries the absolute HIGHEST risk of pulmonary edema due to uterine autotransfusion!"
  }
];
