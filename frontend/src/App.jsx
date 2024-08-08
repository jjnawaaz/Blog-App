// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import darkTheme from "./themes/darkTheme";
import lightTheme from "./themes/lightTheme";
import LoginSignUpPage from "./pages/LoginSignupPage";
import UserPage from "./pages/UserPage";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";

const App = () => {
  const darkMode = useSelector((state) => state.theme.darkMode); // Use darkMode

  return (
    <Router>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/blog/:_id" element={<BlogDetailPage />} />
          <Route path="/edit-blog/:_id" element={<UpdateBlog />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/createblog" element={<CreateBlog />} />
          <Route path="/login" element={<LoginSignUpPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
