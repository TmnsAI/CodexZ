"use client"

import { Trophy, Target, CheckCircle2, XCircle, TrendingUp, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { SessionState } from "@/lib/types"

interface SessionCompleteProps {
  session: SessionState
  sessionScore: number
  dailyProgress: number
  reserveCount: number
  onReturnHome: () => void
}

export function SessionComplete({
  session,
  sessionScore,
  dailyProgress,
  reserveCount,
  onReturnHome,
}: SessionCompleteProps) {
  const scorePercent = (sessionScore / session.totalQuestions) * 100
  const correctCount = sessionScore
  const incorrectCount = session.totalQuestions - sessionScore
  const dailyGoal = 20
  const dailyProgressPercent = (dailyProgress / dailyGoal) * 100

  // Performance message based on score
  let performanceMessage = ""
  let performanceColor = ""
  if (scorePercent >= 90) {
    performanceMessage = "Excellent Performance!"
    performanceColor = "text-success"
  } else if (scorePercent >= 70) {
    performanceMessage = "Good Work!"
    performanceColor = "text-primary"
  } else if (scorePercent >= 50) {
    performanceMessage = "Keep Practicing"
    performanceColor = "text-warning"
  } else {
    performanceMessage = "Review Recommended"
    performanceColor = "text-destructive"
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full space-y-6 py-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border-4 border-primary">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Session Complete!</h1>
          <p className="text-muted-foreground">
            {session.mode === "practice" ? "Practice Mode" : "Exam Mode"} • 10 Questions
          </p>
        </div>

        {/* Score Card */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-center">
              <div className="text-5xl font-bold text-foreground mb-2">
                {sessionScore}/{session.totalQuestions}
              </div>
              <div className={`text-lg ${performanceColor}`}>{performanceMessage}</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={scorePercent} className="h-3" />

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg border border-success/30">
                <CheckCircle2 className="h-8 w-8 text-success" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{correctCount}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-destructive/10 rounded-lg border border-destructive/30">
                <XCircle className="h-8 w-8 text-destructive" />
                <div>
                  <div className="text-2xl font-bold text-foreground">{incorrectCount}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Updates */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Daily Progress */}
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{dailyProgress}/20</div>
                  <div className="text-xs text-muted-foreground">Daily Progress</div>
                </div>
              </div>
              <Progress value={dailyProgressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {dailyGoal - dailyProgress > 0
                  ? `${dailyGoal - dailyProgress} more to reach your goal`
                  : "Daily goal achieved!"}
              </p>
            </CardContent>
          </Card>

          {/* Reserve Count Update */}
          <Card className="border border-border">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xl font-bold text-foreground">{reserveCount}</div>
                  <div className="text-xs text-muted-foreground">Questions Remaining</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {session.totalQuestions} questions used from your Year 1 question bank
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={onReturnHome}>
            <Home className="h-4 w-4 mr-2" />
            Return to Dashboard
          </Button>
        </div>

        {/* Additional Info */}
        {session.mode === "practice" && (
          <Card className="bg-muted/50 border-border">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Thank you for rating the questions! Your feedback helps improve the quality of the CodexZ question bank
                for all medical students.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
