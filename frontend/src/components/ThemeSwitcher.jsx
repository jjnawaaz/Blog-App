// src/components/ThemeSwitcher.js
import React from "react";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../redux/actions/userActions";

const ThemeSwitcher = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.user.theme);

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  React.useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  return (
    <Button onClick={toggleTheme}>
      Switch to {currentTheme === "light" ? "Dark" : "Light"} Mode
    </Button>
  );
};

export default ThemeSwitcher;
