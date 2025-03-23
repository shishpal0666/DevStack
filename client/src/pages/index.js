import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from '../components/Layout/WithNavbar';
import LayoutWithoutNavbar from '../components/Layout/WithoutNavbar';
import { AnonymousRoute } from '../components/Routes/AnonymousRoute';
import { PrivateRoute } from '../components/Routes/PrivateRoute';
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
  )
}

export default Pages;
