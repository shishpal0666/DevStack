import { createSlice } from '@reduxjs/toolkit';
import axios from '../Api';

const initialState = {  
  loading: false,
  error: {isError: false, message: ''},
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
      state.userData = payload;
      state.error = {isError: false, message: ''};
    },
    getUserFailure: (state, { payload }) => {
      state.loading = false;
      state.error = {isError: true, message: payload};
    },
  },
});

export const { setLoading, getUserSuccess, getUserFailure } = authSlice.actions;

export default authSlice.reducer;

export const signUpUserWithGoogle = (data) => async (dispatch) => {
   try {
    dispatch(setLoading(true));
    const response = await axios.post('/auth/google', {
      data,
    });
    if (response.status === 201 || response.status === 200) {
      console.log(response.data);
      dispatch(getUserSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getUserFailure("ndjn"))
  }
}

export const signUpUser = (data) => async (dispatch) => {
  const { firstName, lastName, email, password, confirmPassword } = data;
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      "/auth/signup",
      {  firstName, lastName, email, password, confirmPassword },
    );
    if (response.status === 201) {
      dispatch(getUserSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getUserFailure("ndjn"))
  }
};

export const loginUser = (data) => async (dispatch) => {
  const { email, password } = data;
  try {
    dispatch(setLoading(true));

    const response = await axios.post(
      "/auth/signin",
      { email, password },
    );
    if (response.status === 200) {
      dispatch(getUserSuccess(response.data));
    }
  } catch (error) {
    console.log(error);
    dispatch(getUserFailure())
  }
};