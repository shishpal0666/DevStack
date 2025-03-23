import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getUserSuccess } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { getBookmarkedBlogs } from "./redux/slices/blogsSlice";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userData = localStorage.getItem("blog-user");
    dispatch(getUserSuccess(JSON.parse(userData)));
    dispatch(getBookmarkedBlogs());
  },[])

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
      <div className="w-full relative">
        <Router>
          <Pages />
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
