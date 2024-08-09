import axios from "axios";

// Base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Fetch all blogs
export const fetchBlogs = () => async (dispatch) => {
  dispatch({ type: "FETCH_BLOGS_REQUEST" });

  try {
    const response = await fetch(`${API_URL}/api/blogs/`);
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
    const response = await axios.get(`${API_URL}/api/blogs/${id}`);
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
    const response = await axios.get(
      `${API_URL}/api/blogs/category/${category}`
    );
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
    const response = await axios.get(`${API_URL}/api/blogs/user`, {
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
    const response = await axios.post(`${API_URL}/api/blogs`, blog, {
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
    const response = await axios.put(`${API_URL}/api/blogs/${id}`, blog, {
      headers: {
        "x-auth-token": token, // Set the token in the headers
      },
    });
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

  try {
    dispatch({ type: "DELETE_BLOG_REQUEST" });

    await axios.delete(`${API_URL}/api/blogs/${id}`, {
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
