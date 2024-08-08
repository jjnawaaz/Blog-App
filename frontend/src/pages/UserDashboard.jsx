// src/pages/UserDashboard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";
import {
  fetchUserBlogs,
  createBlog,
  updateBlog,
} from "../redux/actions/blogActions";
import Header from "../components/Header";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.userBlogs);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchUserBlogs()); // Fetch user's blogs
  }, [dispatch]);

  const handleSave = (blog) => {
    if (editingBlog) {
      // Update existing blog
      dispatch(updateBlog(blog));
    } else {
      // Create new blog
      dispatch(createBlog(blog));
    }
    setEditingBlog(null);
  };

  return (
    <div>
      <Header />
      <BlogForm blog={editingBlog} onSubmit={handleSave} />
      <BlogList blogs={blogs} />
    </div>
  );
};

export default UserDashboard;
