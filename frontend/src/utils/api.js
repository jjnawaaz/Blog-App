// src/api/api.js
import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust this URL according to your backend setup

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Example of GET request
export const getBlogs = () => api.get("/blogs");

// Example of POST request
export const createBlog = (blogData) => api.post("/blogs", blogData);

// Example of PUT request
export const updateBlog = (id, blogData) => api.put(`/blogs/${id}`, blogData);

// Example of DELETE request
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

// Example of GET request with parameters
export const getBlogsByCategory = (category) =>
  api.get(`/blogs/category/${category}`);

export default api;
