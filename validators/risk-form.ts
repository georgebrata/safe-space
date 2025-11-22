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
    text: "A crescut violența fizică în frecvență sau severitate în ultimele 6 luni?",
    options: [
      { label: "Nu", score: 0 },
      { label: "Da", score: 20 },
    ],
  },
  {
    id: "q2",
    text: "Partenerul tău deține o armă sau are acces ușor la o armă?",
    options: [
      { label: "Nu", score: 0 },
      { label: "Da", score: 25 },
    ],
  },
  {
    id: "q3",
    text: "A încercat vreodată partenerul tău să te sugrum sau să te strângă de gât?",
    options: [
      { label: "Nu", score: 0 },
      { label: "Da", score: 30 },
    ],
  },
  {
    id: "q4",
    text: "Este partenerul tău violent și constant gelos pe tine?",
    options: [
      { label: "Nu", score: 0 },
      { label: "Da", score: 10 },
    ],
  },
  {
    id: "q5",
    text: "Ai copii care locuiesc în gospodărie?",
    options: [
      { label: "Nu", score: 0 },
      { label: "Da", score: 5 },
    ],
  },
]
