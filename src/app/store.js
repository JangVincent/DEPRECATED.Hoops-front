// This file for Redux Store

import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "../auth/loggedInSlice";

export const store = configureStore({
  reducer: {
    loggedIn: loggedInReducer,
  },
});
