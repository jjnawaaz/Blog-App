// src/components/ThemeSwitcher.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { toggleTheme } from "../redux/actions/themeActions";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode); // Use darkMode

  return (
    <IconButton onClick={() => dispatch(toggleTheme())}>
      {darkMode ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
};

export default ThemeSwitcher;
