import { createSlice } from '@reduxjs/toolkit';

const initialState = {  
  loading: false,
  errors: null,
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
      state.errors = false;
    },
    getUserFailure: (state) => {
      state.loading = false;
      state.errors = true;
    },
  },
});

export const { setLoading, getUserSuccess, getUserFailure } = authSlice.actions;

export default authSlice.reducer;

export const signUpUserWithGoogle = (data) => async (dispatch) => {
   try {
    dispatch(setLoading());

    // const response = await axios.post(
    //   "users/registration",
    //   formatSignUpApiData(data)
    // );
    if (response.data.message === "Account created successfully") {
      const message = "Account Created";
      dispatch(getUserSuccess(response.data));
      if (callback) callback();
    }
  } catch (error) {
    if (error.response.data.error === "record not unique") {
      const message2 = "User already exist";
      dispatch(getAccountFailure());
    }
  }
}

export const signUpUser = (data, callback) => async (dispatch) => {
  try {

  } catch (error) {

  }
};

export const loginUser = (data, callback) => async (dispatch) => {
  try {

  } catch (error) {

  }
};