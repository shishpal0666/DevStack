import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'

const WithNavbar = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default WithNavbar;
