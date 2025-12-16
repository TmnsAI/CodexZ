"use client"

import { BookOpen, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RationaleDisplayProps {
  rationale: string
  isCorrect: boolean
}

export function RationaleDisplay({ rationale, isCorrect }: RationaleDisplayProps) {
  return (
    <Card className={cn("border-2", isCorrect ? "border-success/30 bg-success/5" : "border-warning/30 bg-warning/5")}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          {isCorrect ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-success">Correct!</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-warning" />
              <span className="text-warning">Incorrect</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-3">
          <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Explanation</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{rationale}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
