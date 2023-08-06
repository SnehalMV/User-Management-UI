import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    status: false
  },
  reducers: {
    login: (state) => {
      state.status = true
    },
    logout: (state) => {
      state.status = false
    }
  }
})

export const { login, logout } = adminSlice.actions
export default adminSlice.reducer