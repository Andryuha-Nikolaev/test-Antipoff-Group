import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
  users: [],
  showAll: false,
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
    setShowAll(state, action) {
      state.showAll = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, setUsers, setShowAll } = userSlice.actions;

export default userSlice.reducer;
