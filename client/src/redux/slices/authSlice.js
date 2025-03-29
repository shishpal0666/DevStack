import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  loading: false,
  error: { isError: false, message: '' },
  userData: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.loading = false;
      state.userData = { ...payload };
      state.error = { isError: false, message: '' };
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false;
      state.userData = {};
      state.error = { isError: true, message: payload };
    },
    removeUser: (state) => {
      state.userData = {}
    }
  },
});

export const { setLoading, getUserSuccess, getUserFailure, removeUser } = authSlice.actions;

export default authSlice.reducer;

export const signUpUserWithGoogle = (data, callback) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post('/auth/google', {
      data,
    });
    if (response.status === 201 || response.status === 200) {
      dispatch(getUserSuccess(response.data.result));
      localStorage.setItem("blog-user", JSON.stringify(response.data.result));
      toast.success('Sign up successfully done');

      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    dispatch(getUserFailure(error.response.data.message))
  }
}

export const signUpUser = (data, callback) => async (dispatch) => {
  const { firstName, lastName, email, password, confirmPassword } = data;
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      "/auth/signup",
      { firstName, lastName, email, password, confirmPassword },
    );
    if (response.status === 201) {
      dispatch(getUserSuccess(response.data.result));
      localStorage.setItem("blog-user", JSON.stringify(response.data.result));
      toast.success('Sign up successfully done');
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    dispatch(getUserFailure(error.response.data.message))
  }
};

export const loginUser = (data, callback) => async (dispatch) => {
  const { email, password } = data;
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      "/auth/signin",
      { email, password },
    );
    if (response.status === 200) {
      dispatch(getUserSuccess(response.data.result));
      localStorage.setItem("blog-user", JSON.stringify(response.data.result));
      toast.success("Logged in successfully")
      if (callback) {
        callback();
      }
    }
  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    dispatch(getUserFailure(error.response.data.message))
  }
};

// export const setUserData = (user) => dispatch => {
//   localStorage.setItem("blog-user", JSON.stringify(user));
//   dispatch(setUser(user));
// }

export const getUserData = () => dispatch => {
  const userData = localStorage.getItem("blog-user");
  dispatch(getUserSuccess(JSON.parse(userData)));
}

export const removeUserData = (callback) => async dispatch => {
  try {
    const response = await axios.get("/auth/signout");
    console.log(response);
    localStorage.removeItem("blog-user");
    dispatch(removeUser());
    if (callback) {
      callback();
    }

  } catch (error) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
  }
}
