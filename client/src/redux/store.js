import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { checkTokenExpirationMiddleware } from './checkForTokenExpiry';
import blogReducer from './slices/blogsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    blog: blogReducer,
  },
  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(checkTokenExpirationMiddleware),
});
