"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { nextStep, prevStep, setAnswer, calculateResult } from "@/redux/slices/riskFormSlice"
import { RISK_QUESTIONS } from "@/validators/risk-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function RiskFormPage() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { currentStep, answers, isComplete, result } = useAppSelector((state) => state.riskForm)

  const currentQuestion = RISK_QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / RISK_QUESTIONS.length) * 100

  // Handle completion redirect
  useEffect(() => {
    if (isComplete && result) {
      if (result === "low") router.push("/resources?recommendation=low")
      else if (result === "high" || result === "critical") router.push("/support-flow")
    }
  }, [isComplete, result, router])

  const handleOptionSelect = (score: number) => {
    dispatch(setAnswer({ questionId: currentQuestion.id, score }))

    if (currentStep < RISK_QUESTIONS.length - 1) {
      dispatch(nextStep())
    } else {
      dispatch(calculateResult())
    }
  }

  if (isComplete) {
    return <div className="p-8 text-center">Analyzing results...</div>
  }

  return (
    <div className="min-h-screen bg-secondary/20 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {/* Header with back button */}
        <div className="flex items-center gap-4">
          {currentStep > 0 && (
            <Button variant="ghost" size="icon" onClick={() => dispatch(prevStep())}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <div className="flex-1">
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-right">
              Question {currentStep + 1} of {RISK_QUESTIONS.length}
            </p>
          </div>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl leading-relaxed">{currentQuestion.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start text-left h-auto py-4 px-6 text-lg hover:border-primary hover:bg-primary/5 bg-transparent"
                onClick={() => handleOptionSelect(option.score)}
              >
                {option.label}
              </Button>
            ))}
          </CardContent>
          <CardFooter className="justify-center pt-6">
            <p className="text-sm text-muted-foreground">Your answers are private and autosaved.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
