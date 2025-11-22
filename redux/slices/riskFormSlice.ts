import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface RiskFormState {
  currentStep: number
  answers: Record<string, number>
  totalScore: number
  isSubmitting: boolean
  result: "low" | "high" | "critical" | null
  isComplete: boolean
}

const initialState: RiskFormState = {
  currentStep: 0,
  answers: {},
  totalScore: 0,
  isSubmitting: false,
  result: null,
  isComplete: false,
}

const riskFormSlice = createSlice({
  name: "riskForm",
  initialState,
  reducers: {
    setAnswer: (state, action: PayloadAction<{ questionId: string; score: number }>) => {
      state.answers[action.payload.questionId] = action.payload.score
    },
    nextStep: (state) => {
      state.currentStep += 1
    },
    prevStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1)
    },
    resetForm: () => initialState,
    calculateResult: (state) => {
      const total = Object.values(state.answers).reduce((a, b) => a + b, 0)
      state.totalScore = total
      state.isComplete = true

      if (total <= 40) state.result = "low"
      else if (total <= 80) state.result = "high"
      else state.result = "critical"
    },
  },
})

export const { setAnswer, nextStep, prevStep, resetForm, calculateResult } = riskFormSlice.actions
export default riskFormSlice.reducer
