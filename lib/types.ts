export type DrillMode = "practice" | "exam"

export interface QuestionOption {
  id: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: QuestionOption[]
  correctOptionId: string
  rationale: string
  subject: string
}

export interface SessionResult {
  questionId: string
  selectedOptionId: string | null
  isCorrect: boolean
  accuracyRating?: number
  relevanceRating?: number
  flagged?: boolean
}

export interface SessionState {
  currentIndex: number
  mode: DrillMode
  results: SessionResult[]
  totalQuestions: number
  isComplete: boolean
}
