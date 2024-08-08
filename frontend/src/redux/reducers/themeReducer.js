// src/redux/reducers/themeReducer.js
import { TOGGLE_THEME } from "../actions/themeActions";

const initialState = {
  darkMode: false, // Default to light mode
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default themeReducer; // Ensure this line is present
