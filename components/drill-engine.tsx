"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuestionDisplay } from "@/components/question-display"
import { RationaleDisplay } from "@/components/rationale-display"
import { QualityGateRatings } from "@/components/quality-gate-ratings"
import { SessionComplete } from "@/components/session-complete"
import { DebugOverlay } from "@/components/debug-overlay"
import { useCodexSession } from "@/hooks/use-codex-session"

interface DrillEngineProps {
  onExit: () => void
}

export function DrillEngine({ onExit }: DrillEngineProps) {
  const {
    session,
    currentQuestion,
    selectedOption,
    showRationale,
    dailyProgress,
    reserveCount,
    sessionScore,
    selectOption,
    submitRatings,
    nextQuestion,
    flagQuestion,
  } = useCodexSession()

  if (session.isComplete) {
    return (
      <SessionComplete
        session={session}
        sessionScore={sessionScore}
        dailyProgress={dailyProgress}
        reserveCount={reserveCount}
        onReturnHome={onExit}
      />
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Loading questions...</h2>
        </div>
      </div>
    )
  }

  const lastResult = session.results[session.results.length - 1]
  const isCorrect = lastResult?.isCorrect ?? false

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" onClick={onExit} className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Exit Drill
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {session.mode === "practice" ? "Practice Mode" : "Exam Mode"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Score: {sessionScore}/{session.results.length}
              </p>
            </div>
          </div>
        </div>

        {/* Question */}
        <QuestionDisplay
          question={currentQuestion}
          currentIndex={session.currentIndex}
          totalQuestions={session.totalQuestions}
          selectedOption={selectedOption}
          correctOptionId={showRationale ? currentQuestion.correctOptionId : undefined}
          onSelectOption={selectOption}
          onFlag={flagQuestion}
          showFeedback={showRationale}
        />

        {/* Rationale (Practice Mode Only) */}
        {showRationale && session.mode === "practice" && (
          <div className="mt-6 space-y-4">
            <RationaleDisplay rationale={currentQuestion.rationale} isCorrect={isCorrect} />
            <QualityGateRatings onSubmitRatings={submitRatings} onNextQuestion={nextQuestion} />
          </div>
        )}

        {/* Next Button (Exam Mode Only - no quality gate) */}
        {session.mode === "exam" && selectedOption && (
          <div className="mt-6 flex justify-end">
            <Button size="lg" onClick={() => nextQuestion()}>
              {session.currentIndex + 1 < session.totalQuestions ? "Next Question" : "Complete Session"}
            </Button>
          </div>
        )}
      </div>

      {/* Debug Overlay */}
      <DebugOverlay
        session={session}
        currentQuestionId={currentQuestion.id}
        selectedOption={selectedOption}
        showRationale={showRationale}
        sessionScore={sessionScore}
      />
    </div>
  )
}
