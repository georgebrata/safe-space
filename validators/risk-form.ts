import { z } from "zod"

// Schema for a single answer
export const riskAnswerSchema = z.object({
  questionId: z.string(),
  value: z.number().min(0).max(30),
  textResponse: z.string().optional(),
})

// Schema for the full form submission
export const riskFormSchema = z.object({
  answers: z.array(riskAnswerSchema),
  completedAt: z.date(),
})

export type RiskAnswer = z.infer<typeof riskAnswerSchema>
export type RiskFormSubmission = z.infer<typeof riskFormSchema>

// Risk Assessment Questions Configuration
export const RISK_QUESTIONS = [
  {
    id: "q1",
    text: "Has the physical violence increased in frequency or severity over the past 6 months?",
    options: [
      { label: "No", score: 0 },
      { label: "Yes", score: 20 },
    ],
  },
  {
    id: "q2",
    text: "Does your partner own a gun or have easy access to a weapon?",
    options: [
      { label: "No", score: 0 },
      { label: "Yes", score: 25 },
    ],
  },
  {
    id: "q3",
    text: "Has your partner ever tried to choke or strangle you?",
    options: [
      { label: "No", score: 0 },
      { label: "Yes", score: 30 },
    ],
  },
  {
    id: "q4",
    text: "Is your partner violently and constantly jealous of you?",
    options: [
      { label: "No", score: 0 },
      { label: "Yes", score: 10 },
    ],
  },
  {
    id: "q5",
    text: "Do you have children living in the household?",
    options: [
      { label: "No", score: 0 },
      { label: "Yes", score: 5 },
    ],
  },
]
