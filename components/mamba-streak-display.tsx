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
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Mamba Streak</h3>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <TrendingUp className="h-4 w-4 text-accent" />
            <span className="font-bold text-foreground">
              {dailyProgress}/{dailyGoal}
            </span>
            <span className="text-muted-foreground">today</span>
          </div>
        </div>
        <Progress value={progressPercent} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">
          {dailyGoal - dailyProgress > 0
            ? `${dailyGoal - dailyProgress} questions to reach your daily goal`
            : "Daily goal completed!"}
        </p>
      </CardContent>
    </Card>
  )
}
