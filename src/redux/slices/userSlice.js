import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  users: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setUsers } = userSlice.actions;

export default userSlice.reducer;
