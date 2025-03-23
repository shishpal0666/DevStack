import axiosInstance from "./Api";
import { removeUser } from "./slices/authSlice";

export const checkTokenExpirationMiddleware= ({ dispatch, getState }) => (next) => async (action) => {
  try {
    const response = await axiosInstance.get("/auth/checkstatus");
    console.log(response);
    if (response.status === 401 || response.status === 400){
      localStorage.removeItem("blog-user");
      dispatch(removeUser());
      next(action);
    }
    else{
      next(action);
    }
  } catch (error) {
    console.log(error);
    next(action);
  }
};