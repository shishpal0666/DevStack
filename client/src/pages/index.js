import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from '../components/Layout/WithNavbar';
import LayoutWithoutNavbar from '../components/Layout/WithoutNavbar';
import { PrivateRoute } from '../components/PrivateRoute';
import AddBlog from './AddBlog';
import Blog from './Blog';
import Bookmarks from './Bookmarks';
import EditBlog from './EditBlog';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';
import SearchedBlogs from './SearchedBlogs';
import UserPublishedBlogsList from './UserPublishedBlogsList';

const Pages = () => {
  return (
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/bookmarks" element={<PrivateRoute><Bookmarks /></PrivateRoute>} />
          <Route path="/my-blogs" element={<PrivateRoute><UserPublishedBlogsList /></PrivateRoute>} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/tag/:name" element={<SearchedBlogs />} />
        </Route>
        <Route element={<LayoutWithoutNavbar />}> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-blog" element={<PrivateRoute><AddBlog /></PrivateRoute> } />
          <Route path="/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute> } />
          {/* <PrivateRoute path="/add-blog" component={AddBlog} isAuthenticated={isAuthenticated} />
          <PrivateRoute path="/edit-blog" component={EditBlog} isAuthenticated={isAuthenticated} /> */}
        </Route>
    </Routes>
  )
}

export default Pages;
