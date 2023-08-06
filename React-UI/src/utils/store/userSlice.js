import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name:"user",
  initialState:{
    username:'',
    email:'',
    image:'',
    success:false
  },
  reducers:{
    login:(state, action) => {
      const {user, success} = action.payload
      state.username = user.username
      state.email = user.email
      state.image = user.image
      state.success = success
    },
    logout:(state, action) => {
      state.username = ''
      state.email = ''
      state.image = ''
      state.success = action.payload
    }
  }
})

export const {login, logout} = userSlice.actions
export default userSlice.reducer