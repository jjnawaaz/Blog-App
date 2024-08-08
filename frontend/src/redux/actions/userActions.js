import axios from "axios";

// Login User Action
export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("http://127.0.0.1:3000/api/auth/login", {
      email,
      password,
    });
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

    // Save user info to localStorage
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message); // Log the error for debugging
    dispatch({
      type: "USER_LOGIN_FAILURE",
      payload: error.response?.data?.msg || error.message,
    });
  }
};

// User Registration Action
export const registerUser = (name, email, password) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/auth/register",
      {
        name,
        email,
        password,
      }
    );
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: response.data });

    // Automatically log in the user after registration
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });

    // Save user info to localStorage
    localStorage.setItem("userInfo", JSON.stringify(response.data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Check if User Exists
export const checkUserExists = (email) => async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/auth/checkUserExists?email=${email}`
    );
    return response.data.exists; // Expecting { exists: true/false }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
};

// User Logout Action
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_LOGOUT" });
};

export const fetchUserInfoFromToken = (token) => async (dispatch) => {
  try {
    const response = await fetch("/api/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "SET_USER_INFO", payload: data });
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
};
