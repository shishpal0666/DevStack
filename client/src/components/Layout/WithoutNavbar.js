import React from 'react'
import { Outlet } from 'react-router-dom'

const WithoutNavbar = () => {
  return (
    <Outlet />
  )
}

export default WithoutNavbar;
