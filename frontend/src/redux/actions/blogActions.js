// src/redux/actions/blogActions.js
import axios from "axios";

// Fetch all blogs
export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: "FETCH_BLOGS_REQUEST" });

  try {
    const response = await fetch("http://127.0.0.1:3000/api/blogs/"); // Adjust to your API endpoint
    const data = await response.json();
    dispatch({ type: "FETCH_BLOGS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_BLOGS_FAILURE", payload: error.message });
  }
};

// Fetch blog by ID
export const fetchBlogById = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_BLOG_BY_ID_REQUEST" });
  try {
    const response = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`);
    dispatch({ type: "FETCH_BLOG_BY_ID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_BLOG_BY_ID_FAILURE" });
    console.error(error);
  }
};

// Fetch blogs by category
export const fetchBlogsByCategory = (category) => async (dispatch) => {
  dispatch({ type: "FETCH_BLOGS_BY_CATEGORY_REQUEST" });
  try {
    const response = await axios.get(`/api/blogs/category/${category}`);
    dispatch({
      type: "FETCH_BLOGS_BY_CATEGORY_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: "FETCH_BLOGS_BY_CATEGORY_FAILURE" });
    console.error(error);
  }
};

// Fetch user blogs
export const fetchUserBlogs = () => async (dispatch) => {
  dispatch({ type: "FETCH_USER_BLOGS_REQUEST" });
  try {
    const response = await axios.get("/api/user/blogs");
    dispatch({ type: "FETCH_USER_BLOGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_BLOGS_FAILURE" });
    console.error(error);
  }
};

// Create a new blog
export const createBlog = (blog) => async (dispatch) => {
  try {
    const response = await axios.post("/api/blogs", blog);
    dispatch({ type: "CREATE_BLOG_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

// Update an existing blog
export const updateBlog = (blog) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/blogs/${blog.id}`, blog);
    dispatch({ type: "UPDATE_BLOG_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};
