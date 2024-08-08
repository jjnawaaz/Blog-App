// src/redux/reducers/blogReducer.js

const initialState = {
  blogs: [],
  currentBlog: null,
  categoryBlogs: [],
  userBlogs: [], // Add this line to manage user's blogs
  loading: false,
};

export default function blogReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_BLOGS_REQUEST":
    case "FETCH_BLOGS_BY_CATEGORY_REQUEST":
    case "FETCH_BLOG_BY_ID_REQUEST":
    case "FETCH_USER_BLOGS_REQUEST":
      return { ...state, loading: true };
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
          blog.id === action.payload.id ? action.payload : blog
        ),
      };
    case "FETCH_BLOGS_FAILURE":
    case "FETCH_BLOG_BY_ID_FAILURE":
    case "FETCH_BLOGS_BY_CATEGORY_FAILURE":
    case "FETCH_USER_BLOGS_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
}
