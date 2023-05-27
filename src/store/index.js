import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import uiSlice from "./uislice";

const store = configureStore({
  reducer: { auth: authReducer, ui: uiSlice.reducer },
});

export default store;
