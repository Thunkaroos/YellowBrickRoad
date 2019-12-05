import axios from "axios";

const GET_USER = "GET_USER";
const LOGOUT_USER = "LOGOUT_USER";

const getUser = user => ({
  type: GET_USER,
  user
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const auth = (email, password, method) => {
  return async dispatch => {
    let res;
    try {

      res = await axios.post(`https://ar-guides.herokuapp.com/auth/${method}`, {
        email,
        password
      });
    } catch (authError) {
      return dispatch(getUser({ error: authError }));
    }

    try {
      dispatch(getUser(res.data));
    } catch (dispatchOrHistoryErr) {
      console.error(dispatchOrHistoryErr);
    }
  };
};

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case GET_USER:
      return { user: action.user };
    case LOGOUT_USER:
      return { user: {} };
    default:
      return user;
  }
};

export default userReducer;
