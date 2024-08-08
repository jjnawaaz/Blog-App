// src/pages/CategoryPage.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import { fetchBlogsByCategory } from "../redux/actions/blogActions";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.categoryBlogs);
  const loading = useSelector((state) => state.blogs.loading);

  useEffect(() => {
    dispatch(fetchBlogsByCategory(category)); // Fetch blogs by category
  }, [dispatch, category]);

  if (loading) {
    return <div>Loading...</div>; // Consider using a spinner or loader
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <Container>
          <BlogList blogs={blogs} />
        </Container>
      </div>
    </div>
  );
};

export default CategoryPage;
