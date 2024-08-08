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

// Fetch blogs by user ID
export const fetchBlogsByUserId = () => async (dispatch) => {
  dispatch({ type: "FETCH_BLOGS_REQUEST" });

  try {
    // Retrieve and parse userInfo from local storage
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      throw new Error("No user info found in local storage");
    }

    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.token;
    // Ensure token exists
    if (!token) {
      throw new Error("No token found in user info");
    }

    // Make the API request with the token in the headers
    const response = await axios.get(`http://127.0.0.1:3000/api/blogs/user`, {
      headers: {
        "x-auth-token": token, // Set the token in the headers
      },
    });

    dispatch({ type: "FETCH_USER_BLOGS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_USER_BLOGS_FAILURE", payload: error.message });
  }
};

// Create a new blog
export const createBlog = (blog) => async (dispatch) => {
  try {
    // Retrieve and parse userInfo from local storage
    const userInfoString = localStorage.getItem("userInfo");
    if (!userInfoString) {
      throw new Error("No user info found in local storage");
    }

    const userInfo = JSON.parse(userInfoString);
    const token = userInfo.token;
    // Ensure token exists
    if (!token) {
      throw new Error("No token found in user info");
    }

    // Make the API request with the token in the headers
    const response = await axios.post("http://127.0.0.1:3000/api/blogs", blog, {
      headers: {
        "x-auth-token": token, // Set the token in the headers
      },
    });

    dispatch({ type: "CREATE_BLOG_SUCCESS", payload: response.data });
  } catch (error) {
    console.error("Error creating blog:", error);
    dispatch({ type: "CREATE_BLOG_FAILURE", payload: error.message }); // Optional: handle failure
  }
};

// Update an existing blog
export const updateBlog = (id, blog) => async (dispatch) => {
  // Retrieve and parse userInfo from local storage
  const userInfoString = localStorage.getItem("userInfo");
  if (!userInfoString) {
    throw new Error("No user info found in local storage");
  }

  const userInfo = JSON.parse(userInfoString);
  const token = userInfo.token;
  // Ensure token exists
  if (!token) {
    throw new Error("No token found in user info");
  }

  try {
    const response = await axios.put(
      `http://127.0.0.1:3000/api/blogs/${id}`,
      blog,
      {
        headers: {
          "x-auth-token": token, // Set the token in the headers
        },
      }
    );
    dispatch({ type: "UPDATE_BLOG_SUCCESS", payload: response.data });
  } catch (error) {
    console.error(error);
  }
};

// Delete blog by ID
export const deleteBlog = (id) => async (dispatch) => {
  // Retrieve and parse userInfo from local storage
  const userInfoString = localStorage.getItem("userInfo");
  if (!userInfoString) {
    throw new Error("No user info found in local storage");
  }

  const userInfo = JSON.parse(userInfoString);
  const token = userInfo.token;
  // Ensure token exists
  if (!token) {
    throw new Error("No token found in user info");
  }
  console.log("Inside delete action");
  try {
    dispatch({ type: "DELETE_BLOG_REQUEST" });

    await axios.delete(`http://127.0.0.1:3000/api/blogs/${id}`, {
      headers: {
        "x-auth-token": token, // Set the token in the headers
      },
    });
    dispatch({ type: "DELETE_BLOG_SUCCESS", payload: id });
  } catch (error) {
    dispatch({
      type: "DELETE_BLOG_FAILURE",
      payload: error.response?.data.message || error.message,
    });
  }
};
