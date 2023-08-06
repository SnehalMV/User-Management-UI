import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: {
    userList: []
  },
  reducers: {
    getUsers: (state, action) => {
      state.userList = action.payload
    },
  }
})

export const { getUsers } = allUsersSlice.actions
export default allUsersSlice.reducer