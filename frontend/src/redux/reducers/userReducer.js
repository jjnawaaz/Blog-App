const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
    case "USER_REGISTER_REQUEST":
      return { ...state, loading: true, error: null };

    case "USER_LOGIN_SUCCESS":
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        error: null,
      };

    case "USER_LOGIN_FAILURE":
    case "USER_REGISTER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "USER_LOGOUT":
      return { ...state, userInfo: null, error: null };

    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}
