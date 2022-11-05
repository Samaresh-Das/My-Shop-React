import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme";
import { viewSlice } from "./view";

const store = configureStore({
  reducer: {
    view: viewSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export default store;
