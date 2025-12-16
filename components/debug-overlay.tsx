"use client"

import type { SessionState } from "@/lib/types"

interface DebugOverlayProps {
  session: SessionState
  currentQuestionId?: string
  selectedOption: string | null
  showRationale: boolean
  sessionScore: number
}

export function DebugOverlay({
  session,
  currentQuestionId,
  selectedOption,
  showRationale,
  sessionScore,
}: DebugOverlayProps) {
  // Only show in development
  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-card border-2 border-primary rounded-lg p-4 text-xs font-mono shadow-lg max-w-xs z-50">
      <div className="font-bold text-primary mb-2">Debug Overlay</div>
      <div className="space-y-1 text-muted-foreground">
        <div>
          <span className="text-foreground">Mode:</span> {session.mode}
        </div>
        <div>
          <span className="text-foreground">Index:</span> {session.currentIndex + 1}/{session.totalQuestions}
        </div>
        <div>
          <span className="text-foreground">Question ID:</span> {currentQuestionId || "N/A"}
        </div>
        <div>
          <span className="text-foreground">Selected:</span> {selectedOption || "None"}
        </div>
        <div>
          <span className="text-foreground">Show Rationale:</span> {showRationale ? "Yes" : "No"}
        </div>
        <div>
          <span className="text-foreground">Score:</span> {sessionScore}/{session.results.length}
        </div>
        <div>
          <span className="text-foreground">Complete:</span> {session.isComplete ? "Yes" : "No"}
        </div>
      </div>
    </div>
  )
}
