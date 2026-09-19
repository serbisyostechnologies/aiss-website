import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  plan: null,
  usage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser: (state, action) => {
      state.profile = action.payload;
    },
    setUserPlan: (state, action) => {
      state.plan = action.payload;
    },
    updateUserPlan: (state, action) => {
      if (state.plan) {
        Object.assign(state.plan, action.payload);
      }
    },
    setUserUsage: (state, action) => {
      state.usage = action.payload;
    },
    updateUserUsage: (state, action) => {
      if (state.usage) {
        Object.assign(state.usage, action.payload);
      }
    },
    updateUser: (state, action) => {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
    clearUser: () => initialState,
  },
});

export const { setUser, updateUser, clearUser, setUserPlan, updateUserPlan, setUserUsage, updateUserUsage } =
  userSlice.actions;

export default userSlice.reducer;