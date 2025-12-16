"use client"

import { useState, useCallback } from "react"
import type { DrillMode, SessionState, SessionResult, Question } from "@/lib/types"
import { MOCK_QUESTION_POOL } from "@/lib/mock-questions"

const QUESTIONS_PER_SESSION = 10

export function useCodexSession() {
  const [session, setSession] = useState<SessionState>({
    currentIndex: 0,
    mode: "practice",
    results: [],
    totalQuestions: QUESTIONS_PER_SESSION,
    isComplete: false,
  })

  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showRationale, setShowRationale] = useState(false)
  const [dailyProgress, setDailyProgress] = useState(0) // 0/20 questions today
  const [reserveCount, setReserveCount] = useState(450) // Unique questions left

  // Initialize a new session
  const startSession = useCallback((mode: DrillMode) => {
    // In production, fetch unanswered questions from API
    const questions = MOCK_QUESTION_POOL.slice(0, QUESTIONS_PER_SESSION)

    setCurrentQuestions(questions)
    setSession({
      currentIndex: 0,
      mode,
      results: [],
      totalQuestions: QUESTIONS_PER_SESSION,
      isComplete: false,
    })
    setSelectedOption(null)
    setShowRationale(false)

    console.log("[v0] Session started:", { mode, questionCount: questions.length })
  }, [])

  // Select an answer option
  const selectOption = useCallback(
    (optionId: string) => {
      if (showRationale) return // Prevent re-selection after rationale shown

      setSelectedOption(optionId)

      const currentQuestion = currentQuestions[session.currentIndex]
      const isCorrect = optionId === currentQuestion.correctOptionId

      // In practice mode, show rationale immediately
      if (session.mode === "practice") {
        setShowRationale(true)
      }

      // Update results
      const newResult: SessionResult = {
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
        isCorrect,
      }

      setSession((prev) => ({
        ...prev,
        results: [...prev.results, newResult],
      }))

      console.log("[v0] Option selected:", { optionId, isCorrect, mode: session.mode })
    },
    [currentQuestions, session.currentIndex, session.mode, showRationale],
  )

  // Submit quality ratings (Quality Gate)
  const submitRatings = useCallback((accuracyRating: number, relevanceRating: number) => {
    setSession((prev) => {
      const updatedResults = [...prev.results]
      const lastResultIndex = updatedResults.length - 1

      if (lastResultIndex >= 0) {
        updatedResults[lastResultIndex] = {
          ...updatedResults[lastResultIndex],
          accuracyRating,
          relevanceRating,
        }
      }

      return {
        ...prev,
        results: updatedResults,
      }
    })

    console.log("[v0] Ratings submitted:", { accuracyRating, relevanceRating })
  }, [])

  // Move to next question (gated by ratings in practice mode)
  const nextQuestion = useCallback(() => {
    const lastResult = session.results[session.results.length - 1]

    // Quality gate check for practice mode
    if (session.mode === "practice" && showRationale) {
      if (!lastResult?.accuracyRating || !lastResult?.relevanceRating) {
        console.log("[v0] Quality gate blocked: missing ratings")
        return false
      }
    }

    const nextIndex = session.currentIndex + 1

    if (nextIndex >= session.totalQuestions) {
      // Session complete
      setSession((prev) => ({ ...prev, isComplete: true }))
      setDailyProgress((prev) => prev + QUESTIONS_PER_SESSION)
      setReserveCount((prev) => prev - QUESTIONS_PER_SESSION)
      console.log("[v0] Session completed")
      return true
    }

    // Move to next question
    setSession((prev) => ({ ...prev, currentIndex: nextIndex }))
    setSelectedOption(null)
    setShowRationale(false)
    console.log("[v0] Moving to next question:", nextIndex + 1)
    return true
  }, [session, showRationale])

  // Flag a question for review
  const flagQuestion = useCallback(() => {
    setSession((prev) => {
      const updatedResults = [...prev.results]
      const lastResultIndex = updatedResults.length - 1

      if (lastResultIndex >= 0) {
        updatedResults[lastResultIndex] = {
          ...updatedResults[lastResultIndex],
          flagged: true,
        }
      }

      return {
        ...prev,
        results: updatedResults,
      }
    })

    console.log("[v0] Question flagged")
  }, [])

  const currentQuestion = currentQuestions[session.currentIndex]
  const sessionScore = session.results.filter((r) => r.isCorrect).length

  return {
    session,
    currentQuestion,
    selectedOption,
    showRationale,
    dailyProgress,
    reserveCount,
    sessionScore,
    startSession,
    selectOption,
    submitRatings,
    nextQuestion,
    flagQuestion,
  }
}
