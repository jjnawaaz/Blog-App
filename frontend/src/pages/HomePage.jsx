// src/pages/HomePage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import { fetchBlogs } from "../redux/actions/blogActions";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.blogs); // Use state.blog.blogs

  useEffect(() => {
    dispatch(fetchBlogs()); // Fetch blogs when the component mounts
  }, [dispatch]);

  return (
    <div style={{ display: "flex" }}>
      {/* <Sidebar /> */}
      <div style={{ flex: 1 }}>
        <Header />
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default HomePage;
