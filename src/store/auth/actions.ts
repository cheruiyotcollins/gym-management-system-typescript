import { SET_AUTH, SET_IS_LOGGED_IN } from "./type";
import Api from "../../common/helpers/Api";

export const setAuth = (data) => {
  return {
    type: SET_AUTH,
    payload: data,
  };
};

export const setIsLoggedIn = (data) => {
  return {
    type: SET_IS_LOGGED_IN,
    payload: data,
  };
};

export const checkIfUserIsLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    dispatch(setIsLoggedIn(true));
  } else {
    dispatch(setIsLoggedIn(false));
  }
};

export const attemptLogin =
  (credentials, onSuccess, onError) => async (dispatch) => {
    try {
      const response = await Api.post("/users/auth/signin", credentials);
      console.log("Login Response:", response.data); // Debugging

      if (!response.data || !response.data.accessToken) {
        console.error("Access Token is missing in API response");
        return onError("Access Token is missing");
      }

      const user = {
        id: 1,
        username: credentials.username,
        email: `${credentials.username}@example.com`,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      };

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.data.accessToken); // ✅ Fix here

      console.log("Token stored:", localStorage.getItem("token")); // Debugging

      dispatch(
        setAuth({
          isLoggedIn: true,
          currentUser: user,
          token: response.data.accessToken, // ✅ Fix here
        })
      );

      onSuccess();
    } catch (err) {
      console.error("Login Error:", err);
      return onError(err);
    }
  };

export const attemptSignup =
  (userDetails, onSuccess, onError) => async (dispatch) => {
    try {
      const response = await Api.post("/users/auth/signup", userDetails);

      // Invoke the onSuccess callback to navigate to the login page
      onSuccess();
    } catch (err) {
      onError(err);
    }
  };

export const logOut = (onSuccess) => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  dispatch(
    setAuth({
      isLoggedIn: false,
      currentUser: null,
      token: null,
    })
  );
  onSuccess();
};
