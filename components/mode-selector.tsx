"use client"

import { Brain, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DrillMode } from "@/lib/types"

interface ModeSelectorProps {
  onSelectMode: (mode: DrillMode) => void
}

export function ModeSelector({ onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="cursor-pointer border border-border/40 bg-gradient-to-br from-card to-card/50 hover:border-primary/40 hover:shadow-lg transition-all group overflow-hidden">
        <CardHeader>
          <div className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-foreground text-lg">Practice Mode</CardTitle>
              <CardDescription className="text-xs mt-0.5">Learn with Feedback</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
              <span>Immediate detailed explanations for each question</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
              <span>Rate question quality to improve your bank</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
              <span>Build deep understanding while you learn</span>
            </li>
          </ul>
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium group/btn"
            onClick={() => onSelectMode("practice")}
          >
            Start Practice Drill
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      <Card className="cursor-pointer border border-border/40 bg-gradient-to-br from-card to-card/50 hover:border-accent/40 hover:shadow-lg transition-all group overflow-hidden">
        <CardHeader>
          <div className="flex items-start gap-3 mb-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 group-hover:bg-accent/30 transition-colors">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <CardTitle className="text-foreground text-lg">Exam Mode</CardTitle>
              <CardDescription className="text-xs mt-0.5">Test Your Knowledge</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground mb-6">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
              <span>Timed practice with delayed feedback</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
              <span>Simulate real exam conditions and pressure</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold text-lg leading-none mt-0.5">•</span>
              <span>Review all answers with complete rationales</span>
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full border-border/40 hover:border-accent/40 hover:bg-accent/10 text-foreground font-medium group/btn bg-transparent"
            onClick={() => onSelectMode("exam")}
          >
            Start Exam Drill
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
