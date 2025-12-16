"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { MambaStreakDisplay } from "@/components/mamba-streak-display"
import { ReserveCounter } from "@/components/reserve-counter"
import { ModeSelector } from "@/components/mode-selector"
import { DrillEngine } from "@/components/drill-engine"
import { useCodexSession } from "@/hooks/use-codex-session"
import type { DrillMode } from "@/lib/types"

export default function DashboardPage() {
  const { dailyProgress, reserveCount, startSession } = useCodexSession()
  const [drillStarted, setDrillStarted] = useState(false)

  const handleStartDrill = (mode: DrillMode) => {
    startSession(mode)
    setDrillStarted(true)
  }

  const handleExitDrill = () => {
    setDrillStarted(false)
  }

  if (drillStarted) {
    return <DrillEngine onExit={handleExitDrill} />
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground text-balance">CodexZ</h1>
              <p className="text-muted-foreground">Medical Question Bank</p>
            </div>
          </div>
        </header>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <MambaStreakDisplay dailyProgress={dailyProgress} />
          <ReserveCounter reserveCount={reserveCount} />
        </div>

        {/* Mode Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Start a New Drill</h2>
          <ModeSelector onSelectMode={handleStartDrill} />
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-2">About Mamba Flow</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Each drill consists of 10 questions. In Practice Mode, you'll provide quality ratings for each question to
            help improve the question bank. Complete 20 questions daily to maintain your streak and maximize learning.
          </p>
        </div>
      </div>
    </div>
  )
}
