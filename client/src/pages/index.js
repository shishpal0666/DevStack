import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from '../components/Layout/WithNavbar';
import LayoutWithoutNavbar from '../components/Layout/WithoutNavbar';
import LoadingComponent from '../components/LoadingComponent';
import { AnonymousRoute } from '../components/Routes/AnonymousRoute';
import { PrivateRoute } from '../components/Routes/PrivateRoute';

const AddBlog = lazy(() => import("./AddBlog"));
const Blog = lazy(() => import("./Blog"));
const Bookmarks = lazy(() => import("./Bookmarks"));
const EditBlog = lazy(() => import("./EditBlog"));
const LandingPage = lazy(() => import("./LandingPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const SearchedBlogs = lazy(() => import("./SearchedBlogs"));
const UserPublishedBlogsList = lazy(() => import("./UserPublishedBlogsList"));

const Pages = () => {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
          <Route path="/my-blogs" element={<PrivateRoute><UserPublishedBlogsList type={1}/></PrivateRoute>} />
          <Route path="/author/:id" element={<PrivateRoute><UserPublishedBlogsList type={2}/></PrivateRoute>} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/search" element={<SearchedBlogs type="search" />} />
          <Route path="/topic/:name" element={<SearchedBlogs type="topic" />} />
        </Route>
        <Route element={<LayoutWithoutNavbar />}> 
          <Route path="/login" element={<AnonymousRoute><LoginPage /></AnonymousRoute>} />
          <Route path="/add-blog" element={<PrivateRoute><AddBlog /></PrivateRoute> } />
          <Route path="/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute> } />
          {/* <PrivateRoute path="/add-blog" component={AddBlog} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/edit-blog" component={EditBlog} isAuthenticated={isAuthenticated} /> */}
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Pages;
