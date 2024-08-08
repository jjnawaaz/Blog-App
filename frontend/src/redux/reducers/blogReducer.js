const initialState = {
  blogs: [],
  currentBlog: null,
  categoryBlogs: [],
  userBlogs: [], // Manages user's blogs
  loading: false,
  error: null, // Optional: Added for error handling
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BLOGS_REQUEST":
    case "FETCH_BLOGS_BY_CATEGORY_REQUEST":
    case "FETCH_BLOG_BY_ID_REQUEST":
    case "FETCH_USER_BLOGS_REQUEST":
    case "DELETE_BLOG_REQUEST": // Handle delete request loading state
      return { ...state, loading: true, error: null }; // Added error reset on request

    case "FETCH_BLOGS_SUCCESS":
      return { ...state, loading: false, blogs: action.payload };

    case "FETCH_BLOG_BY_ID_SUCCESS":
      return { ...state, loading: false, currentBlog: action.payload };

    case "FETCH_BLOGS_BY_CATEGORY_SUCCESS":
      return { ...state, loading: false, categoryBlogs: action.payload };

    case "FETCH_USER_BLOGS_SUCCESS":
      return { ...state, loading: false, userBlogs: action.payload };

    case "CREATE_BLOG_SUCCESS":
      return { ...state, userBlogs: [...state.userBlogs, action.payload] };

    case "UPDATE_BLOG_SUCCESS":
      return {
        ...state,
        userBlogs: state.userBlogs.map((blog) =>
          blog._id === action.payload._id ? action.payload : blog
        ),
      };

    case "DELETE_BLOG_SUCCESS":
      return {
        ...state,
        loading: false,
        userBlogs: state.userBlogs.filter(
          (blog) => blog._id !== action.payload
        ), // Remove deleted blog from userBlogs
      };

    case "FETCH_BLOGS_FAILURE":
    case "FETCH_BLOG_BY_ID_FAILURE":
    case "FETCH_BLOGS_BY_CATEGORY_FAILURE":
    case "FETCH_USER_BLOGS_FAILURE":
    case "DELETE_BLOG_FAILURE": // Handle delete failure
      return { ...state, loading: false, error: action.payload }; // Set error payload

    default:
      return state;
  }
}
