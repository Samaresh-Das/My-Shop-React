import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "light" },
  reducers: {
    dark(state, action) {
      if (action.payload === "dark") {
        state.theme = "dark";
      }
      return;
    },
    light(state, action) {
      if (action.payload === "light") {
        state.theme = "light";
      }
      return;
    },
  },
});

export const themeActions = themeSlice.actions;
