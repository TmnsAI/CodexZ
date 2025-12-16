"use client"

import { Flag, CheckCircle2, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Question } from "@/lib/types"
import { cn } from "@/lib/utils"

interface QuestionDisplayProps {
  question: Question
  currentIndex: number
  totalQuestions: number
  selectedOption: string | null
  correctOptionId?: string
  onSelectOption: (optionId: string) => void
  onFlag: () => void
  showFeedback?: boolean
}

export function QuestionDisplay({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  correctOptionId,
  onSelectOption,
  onFlag,
  showFeedback = false,
}: QuestionDisplayProps) {
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-muted-foreground">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <Button variant="ghost" size="sm" onClick={onFlag} className="gap-2">
            <Flag className="h-4 w-4" />
            Flag for Review
          </Button>
        </div>
        <Progress value={progressPercent} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-2">
        <CardContent className="pt-6">
          <div className="mb-2 inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {question.subject}
          </div>
          <h2 className="text-lg font-semibold text-foreground leading-relaxed mb-6">{question.text}</h2>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id
              const isCorrect = showFeedback && option.id === correctOptionId
              const isIncorrect = showFeedback && isSelected && option.id !== correctOptionId

              return (
                <button
                  key={option.id}
                  onClick={() => !selectedOption && onSelectOption(option.id)}
                  disabled={!!selectedOption}
                  className={cn(
                    "w-full text-left p-4 rounded-lg border-2 transition-all",
                    "hover:border-primary disabled:cursor-not-allowed",
                    !selectedOption && "hover:bg-primary/5",
                    isSelected && !showFeedback && "border-primary bg-primary/10",
                    isCorrect && "border-success bg-success/10",
                    isIncorrect && "border-destructive bg-destructive/10",
                    !isSelected && !isCorrect && !isIncorrect && "border-border",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={cn(
                          "flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold text-sm",
                          isSelected && !showFeedback && "border-primary bg-primary text-primary-foreground",
                          isCorrect && "border-success bg-success text-success-foreground",
                          isIncorrect && "border-destructive bg-destructive text-destructive-foreground",
                          !isSelected && !isCorrect && !isIncorrect && "border-muted-foreground text-muted-foreground",
                        )}
                      >
                        {option.id.toUpperCase()}
                      </div>
                      <span className={cn("text-sm leading-relaxed", isSelected ? "font-medium" : "")}>
                        {option.text}
                      </span>
                    </div>
                    {isCorrect && <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />}
                    {isIncorrect && <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />}
                  </div>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
