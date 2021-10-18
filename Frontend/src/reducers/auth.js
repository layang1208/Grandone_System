import * as actions from "../constants/actionTypes";

const tokenKey = "profile";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actions.AUTH:
      localStorage.setItem(tokenKey, JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case actions.LOGOUT:
      localStorage.removeItem(tokenKey);
      return { ...state, authData: null };
    case actions.GETJWT:
      return localStorage.getItem(tokenKey);
    default:
      return state;
  }
};

export default authReducer;
