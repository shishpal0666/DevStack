import React from 'react'
import { Route, Routes } from 'react-router-dom';
import LayoutWithNavbar from '../components/Layout/WithNavbar';
import LayoutWithoutNavbar from '../components/Layout/WithoutNavbar';
import { PrivateRoute } from '../components/PrivateRoute';
import AddBlog from './AddBlog';
import Blog from './Blog';
import EditBlog from './EditBlog';
import LandingPage from './LandingPage';
import LoginPage from './LoginPage';

const Pages = () => {
  return (
      <Routes>
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:id" element={<Blog />} />
        </Route>
        <Route element={<LayoutWithoutNavbar />}> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-blog" element={<PrivateRoute><AddBlog /></PrivateRoute> } />
          <Route path="/edit-blog/:id" element={<PrivateRoute><EditBlog /></PrivateRoute> } />
        </Route>
    </Routes>
  )
}

export default Pages