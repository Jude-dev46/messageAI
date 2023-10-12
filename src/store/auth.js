import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logOut(state) {
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
