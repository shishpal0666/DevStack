import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  imageUrl: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setUser: (state, { payload }) => {
      state.id = payload.id;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.email = payload.email;
      state.imageUrl = payload.imageUrl;
    },
    removeUser: (state) => {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.email = null;
      state.imageUrl = null;
    },
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

export const setUserData = (user) => dispatch => {
  localStorage.setItem("blog-user", JSON.stringify(user));
  dispatch(setUser(user));
}

export const getUserData = () => dispatch => {
  const userData = localStorage.getItem("blog-user");
  dispatch(setUser(JSON.parse(userData)));
}

export const removeUserData = () => dispatch => {
  localStorage.removeItem("blog-user");
  dispatch(removeUser());
}
