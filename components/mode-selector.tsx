"use client"

import { Brain, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DrillMode } from "@/lib/types"

interface ModeSelectorProps {
  onSelectMode: (mode: DrillMode) => void
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelectMode("practice")}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-foreground">Practice Mode</CardTitle>
          </div>
          <CardDescription>Instant feedback with detailed explanations</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Immediate rationale after each question</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Rate question quality (accuracy & relevance)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent font-bold">•</span>
              <span>Build understanding as you learn</span>
            </li>
          </ul>
          <Button className="w-full" onClick={() => onSelectMode("practice")}>
            Start Practice Drill
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => onSelectMode("exam")}>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <CardTitle className="text-foreground">Exam Mode</CardTitle>
          </div>
          <CardDescription>Simulate real exam conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>Delayed feedback until completion</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>Test your knowledge under pressure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-warning font-bold">•</span>
              <span>Review all answers at the end</span>
            </li>
          </ul>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => onSelectMode("exam")}>
            Start Exam Drill
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
