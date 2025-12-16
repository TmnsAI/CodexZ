"use client"

import { useState } from "react"
import { Star, AlertCircle, CheckCircle2, Lock, Unlock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QualityGateRatingsProps {
  onSubmitRatings: (accuracyRating: number, relevanceRating: number) => void
  onNextQuestion: () => boolean
}

export function QualityGateRatings({ onSubmitRatings, onNextQuestion }: QualityGateRatingsProps) {
  const [accuracyRating, setAccuracyRating] = useState<number>(0)
  const [relevanceRating, setRelevanceRating] = useState<number>(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const isGateUnlocked = accuracyRating > 0 && relevanceRating > 0

  const handleSubmitAndNext = () => {
    if (!isGateUnlocked) return

    if (!hasSubmitted) {
      onSubmitRatings(accuracyRating, relevanceRating)
      setHasSubmitted(true)
    }

    const success = onNextQuestion()
    if (success) {
      // Reset for next question
      setAccuracyRating(0)
      setRelevanceRating(0)
      setHasSubmitted(false)
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-foreground">
            <AlertCircle className="h-5 w-5 text-primary" />
            Quality Gate
          </CardTitle>
          {isGateUnlocked ? (
            <div className="flex items-center gap-2 text-success">
              <Unlock className="h-4 w-4" />
              <span className="text-sm font-medium">Unlocked</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-sm font-medium">Locked</span>
            </div>
          )}
        </div>
        <CardDescription>Rate this question to continue (required for Practice Mode)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Accuracy Rating */}
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1">Accuracy Rating</h4>
            <p className="text-xs text-muted-foreground">Is the correct answer medically accurate?</p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={`accuracy-${rating}`}
                onClick={() => setAccuracyRating(rating)}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all",
                  "hover:border-primary hover:bg-primary/10",
                  accuracyRating >= rating
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                <Star className={cn("h-5 w-5", accuracyRating >= rating && "fill-current")} />
              </button>
            ))}
            {accuracyRating > 0 && <span className="ml-2 text-sm font-medium text-foreground">{accuracyRating}/5</span>}
          </div>
        </div>

        {/* Relevance Rating */}
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-1">Relevance Rating</h4>
            <p className="text-xs text-muted-foreground">Is this question relevant to your studies?</p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={`relevance-${rating}`}
                onClick={() => setRelevanceRating(rating)}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg border-2 transition-all",
                  "hover:border-primary hover:bg-primary/10",
                  relevanceRating >= rating
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                <Star className={cn("h-5 w-5", relevanceRating >= rating && "fill-current")} />
              </button>
            ))}
            {relevanceRating > 0 && (
              <span className="ml-2 text-sm font-medium text-foreground">{relevanceRating}/5</span>
            )}
          </div>
        </div>

        {/* Visual Feedback */}
        <div
          className={cn(
            "p-3 rounded-lg border-2 transition-all",
            isGateUnlocked ? "border-success/30 bg-success/10" : "border-border bg-muted/50",
          )}
        >
          <div className="flex items-start gap-2">
            {isGateUnlocked ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">Gate Unlocked!</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You can now proceed to the next question</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Ratings Required</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Please rate both accuracy and relevance to continue
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Next Button */}
        <Button onClick={handleSubmitAndNext} disabled={!isGateUnlocked} size="lg" className="w-full">
          {isGateUnlocked ? "Next Question" : "Rate to Continue"}
        </Button>
      </CardContent>
    </Card>
  )
}
