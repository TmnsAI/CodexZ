import type { Question } from "./types"

// Mock question pool - In production, this would come from a database
export const MOCK_QUESTION_POOL: Question[] = [
  {
    id: "q1",
    text: "A 45-year-old male presents with sudden onset chest pain radiating to the left arm. Which of the following is the most appropriate immediate diagnostic test?",
    options: [
      { id: "a", text: "Chest X-ray" },
      { id: "b", text: "Electrocardiogram (ECG)" },
      { id: "c", text: "Complete Blood Count" },
      { id: "d", text: "Cardiac MRI" },
    ],
    correctOptionId: "b",
    rationale:
      "ECG is the most appropriate immediate test for suspected acute coronary syndrome. It can quickly identify ST-segment changes indicative of myocardial infarction.",
    subject: "Cardiology",
  },
  {
    id: "q2",
    text: "Which of the following antibiotics is contraindicated in pregnancy?",
    options: [
      { id: "a", text: "Amoxicillin" },
      { id: "b", text: "Cephalexin" },
      { id: "c", text: "Tetracycline" },
      { id: "d", text: "Azithromycin" },
    ],
    correctOptionId: "c",
    rationale:
      "Tetracycline is contraindicated in pregnancy due to risks of permanent tooth discoloration and impaired bone growth in the fetus.",
    subject: "Pharmacology",
  },
  {
    id: "q3",
    text: "A patient with type 2 diabetes mellitus has an HbA1c of 9.5%. What does this indicate?",
    options: [
      { id: "a", text: "Excellent glycemic control" },
      { id: "b", text: "Good glycemic control" },
      { id: "c", text: "Poor glycemic control" },
      { id: "d", text: "Normal blood sugar" },
    ],
    correctOptionId: "c",
    rationale: "An HbA1c of 9.5% indicates poor glycemic control. Target HbA1c for most diabetic patients is below 7%.",
    subject: "Endocrinology",
  },
  {
    id: "q4",
    text: "Which cranial nerve is responsible for lateral eye movement?",
    options: [
      { id: "a", text: "CN III (Oculomotor)" },
      { id: "b", text: "CN IV (Trochlear)" },
      { id: "c", text: "CN VI (Abducens)" },
      { id: "d", text: "CN II (Optic)" },
    ],
    correctOptionId: "c",
    rationale:
      "The abducens nerve (CN VI) innervates the lateral rectus muscle, which is responsible for lateral (outward) eye movement.",
    subject: "Neurology",
  },
  {
    id: "q5",
    text: "What is the first-line treatment for acute anaphylaxis?",
    options: [
      { id: "a", text: "Diphenhydramine IV" },
      { id: "b", text: "Epinephrine IM" },
      { id: "c", text: "Corticosteroids IV" },
      { id: "d", text: "Albuterol nebulizer" },
    ],
    correctOptionId: "b",
    rationale:
      "Intramuscular epinephrine is the first-line treatment for anaphylaxis. It should be administered immediately upon recognition.",
    subject: "Emergency Medicine",
  },
  {
    id: "q6",
    text: "Which of the following is a characteristic finding in Parkinson's disease?",
    options: [
      { id: "a", text: "Intention tremor" },
      { id: "b", text: "Resting tremor" },
      { id: "c", text: "Postural tremor" },
      { id: "d", text: "Flapping tremor" },
    ],
    correctOptionId: "b",
    rationale:
      'Resting tremor is a classic feature of Parkinson\'s disease, typically described as "pill-rolling" tremor.',
    subject: "Neurology",
  },
  {
    id: "q7",
    text: "A 28-year-old woman presents with polyuria, polydipsia, and weight loss. Fasting glucose is 180 mg/dL. What is the most likely diagnosis?",
    options: [
      { id: "a", text: "Type 1 Diabetes Mellitus" },
      { id: "b", text: "Type 2 Diabetes Mellitus" },
      { id: "c", text: "Diabetes Insipidus" },
      { id: "d", text: "Hyperthyroidism" },
    ],
    correctOptionId: "a",
    rationale:
      "Young age, classic symptoms, and elevated fasting glucose suggest Type 1 Diabetes Mellitus, an autoimmune condition.",
    subject: "Endocrinology",
  },
  {
    id: "q8",
    text: "Which hepatitis virus is transmitted primarily through the fecal-oral route?",
    options: [
      { id: "a", text: "Hepatitis A" },
      { id: "b", text: "Hepatitis B" },
      { id: "c", text: "Hepatitis C" },
      { id: "d", text: "Hepatitis D" },
    ],
    correctOptionId: "a",
    rationale: "Hepatitis A is transmitted via the fecal-oral route, commonly through contaminated food or water.",
    subject: "Infectious Disease",
  },
  {
    id: "q9",
    text: "What is the mechanism of action of ACE inhibitors?",
    options: [
      { id: "a", text: "Block calcium channels" },
      { id: "b", text: "Inhibit angiotensin-converting enzyme" },
      { id: "c", text: "Block beta-adrenergic receptors" },
      { id: "d", text: "Inhibit sodium-potassium pump" },
    ],
    correctOptionId: "b",
    rationale:
      "ACE inhibitors work by inhibiting the angiotensin-converting enzyme, reducing angiotensin II and aldosterone levels.",
    subject: "Pharmacology",
  },
  {
    id: "q10",
    text: "Which of the following is the most common cause of community-acquired pneumonia?",
    options: [
      { id: "a", text: "Mycoplasma pneumoniae" },
      { id: "b", text: "Streptococcus pneumoniae" },
      { id: "c", text: "Haemophilus influenzae" },
      { id: "d", text: "Klebsiella pneumoniae" },
    ],
    correctOptionId: "b",
    rationale: "Streptococcus pneumoniae is the most common bacterial cause of community-acquired pneumonia in adults.",
    subject: "Pulmonology",
  },
]

// Mock answered questions tracker
export const getUnansweredQuestions = (answeredIds: string[]): Question[] => {
  return MOCK_QUESTION_POOL.filter((q) => !answeredIds.includes(q.id))
}
