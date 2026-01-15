"use client"

import { useState } from "react"
import { BookOpen, Sparkles } from "lucide-react"
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
      <header className="border-b border-border/40 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shadow-lg">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">CodexZ</h1>
              <p className="text-sm text-muted-foreground">Medical Knowledge Platform</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <MambaStreakDisplay dailyProgress={dailyProgress} />
          <ReserveCounter reserveCount={reserveCount} />
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Select Your Drill</h2>
          </div>
          <ModeSelector onSelectMode={handleStartDrill} />
        </div>

        <div className="mt-12 p-6 bg-card/50 rounded-xl border border-border/40 backdrop-blur-sm">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-1 h-6 bg-primary rounded-full flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-foreground text-lg">How It Works</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            Each drill contains 10 curated medical questions. In Practice Mode, you'll receive immediate feedback and
            can rate question quality. In Exam Mode, test yourself under realistic conditions. Complete 20 questions
            daily to maintain your streak and accelerate your learning journey.
          </p>
        </div>
      </div>
    </div>
  )
}
