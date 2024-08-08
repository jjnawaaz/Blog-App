// src/redux/reducers/index.js
import { combineReducers } from "redux";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";

const rootReducer = combineReducers({
  blog: blogReducer,
  user: userReducer,
  theme: themeReducer, // Add themeReducer here
});

export default rootReducer;
