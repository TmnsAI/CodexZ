"use client"

import { Database } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ReserveCounterProps {
  reserveCount: number
  totalQuestions?: number
}

export function ReserveCounter({ reserveCount, totalQuestions = 500 }: ReserveCounterProps) {
  const percentRemaining = (reserveCount / totalQuestions) * 100

  return (
    <Card className="border border-border">
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-foreground">{reserveCount}</div>
            <p className="text-sm text-muted-foreground">Unique questions remaining</p>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Year 1 Question Bank</span>
            <span className="font-medium">{percentRemaining.toFixed(0)}% available</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
