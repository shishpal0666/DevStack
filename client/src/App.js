import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import Pages from "./pages";
import { getUserSuccess } from "./redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { getPopularTopicsList, getAllBlogs, getBookmarkedBlogsId } from "./redux/slices/blogsSlice";
import { ToastContainer } from "react-toastify";

// Lazy-load GoogleOAuthProvider to defer the 84KB Google Sign-In SDK
const GoogleOAuthProvider = React.lazy(() =>
  import('@react-oauth/google').then(module => ({
    default: module.GoogleOAuthProvider
  }))
);

function App() {
  const dispatch = useDispatch();
  const userData = localStorage.getItem("blog-user");
  const [oauthReady, setOauthReady] = useState(false);
  // const {email} = useSelector((store) => store.auth.userData);
  
  useEffect(() => {
    dispatch(getUserSuccess(JSON.parse(userData)));
    dispatch(getPopularTopicsList());
    dispatch(getBookmarkedBlogsId());
    dispatch(getAllBlogs());
  }, [dispatch, userData]);

  // Defer Google OAuth SDK loading until after initial paint
  useEffect(() => {
    const timer = requestIdleCallback 
      ? requestIdleCallback(() => setOauthReady(true))
      : setTimeout(() => setOauthReady(true), 100);
    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(timer);
      } else {
        clearTimeout(timer);
      }
    };
  }, []);

  const content = (
    <div className="w-full relative">
      <ToastContainer 
        autoClose={2000}
        theme="colored"
        hideProgressBar={true}
        newestOnTop
      />
      <Router>
        <Pages />
      </Router>
    </div>
  );

  return oauthReady ? (
    <React.Suspense fallback={content}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_PUBLIC_GOOGLE_API_TOKEN}>
        {content}
      </GoogleOAuthProvider>
    </React.Suspense>
  ) : (
    content
  );
}

export default App;
