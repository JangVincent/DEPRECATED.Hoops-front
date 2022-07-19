// This file for redux-toolkit slice
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: window.sessionStorage.getItem("hoops-token") ? true : false,
};

export const loggedInSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login: (state) => {
      state.value = true;
    },
    logout: (state) => {
      window.sessionStorage.removeItem("hoops-token");
      state.value = false;
    },
  },
});

export const { login, logout } = loggedInSlice.actions;
export default loggedInSlice.reducer;
