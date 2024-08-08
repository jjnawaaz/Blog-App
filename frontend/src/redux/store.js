import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index"; // Ensure the path is correct

const isDevelopment = true; // Set this to false in production

const store = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
});

export default store;
