import { createSlice } from "@reduxjs/toolkit";

const initialState = { view: "grid" };
export const viewSlice = createSlice({
  name: "view",
  initialState: initialState,
  reducers: {
    list(state, action) {
      if (action.payload === "list") {
        state.view = "list";
      }
      return;
    },
    grid(state, action) {
      if (action.payload === "grid") {
        state.view = "grid";
      }
      return;
    },
  },
});

export const viewActions = viewSlice.actions;
