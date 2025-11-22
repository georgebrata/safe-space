import { createSlice } from "@reduxjs/toolkit"

interface CamouflageState {
  isActive: boolean
}

const initialState: CamouflageState = {
  isActive: false,
}

export const camouflageSlice = createSlice({
  name: "camouflage",
  initialState,
  reducers: {
    toggleCamouflage: (state) => {
      state.isActive = !state.isActive
    },
  },
})

export const { toggleCamouflage } = camouflageSlice.actions
export default camouflageSlice.reducer

