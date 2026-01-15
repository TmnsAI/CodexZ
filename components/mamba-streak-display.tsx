"use client"

import { Target, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

interface MambaStreakDisplayProps {
  dailyProgress: number
  dailyGoal?: number
}

export function MambaStreakDisplay({ dailyProgress, dailyGoal = 20 }: MambaStreakDisplayProps) {
  const progressPercent = (dailyProgress / dailyGoal) * 100

  return (
    <Card className="border border-border/40 bg-gradient-to-br from-card to-card/50 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="pt-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 mt-0.5">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">Mamba Streak</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Daily Progress</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-bold text-2xl text-primary">{dailyProgress}</span>
              <span className="text-muted-foreground">/ {dailyGoal}</span>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs text-muted-foreground">today</span>
            </div>
          </div>
        </div>
        <Progress value={progressPercent} className="h-2.5 mb-4" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          {dailyGoal - dailyProgress > 0
            ? `${dailyGoal - dailyProgress} questions remaining to complete your daily goal`
            : "✓ Daily goal completed! Keep going tomorrow."}
        </p>
      </CardContent>
    </Card>
  )
}
