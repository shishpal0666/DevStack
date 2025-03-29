import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useOutsideClick from '../../helpers/useOutsideClick';
import { removeUserData } from '../../redux/slices/authSlice';

const NavbarProfileDroddown = ({ closeProfileDropdown }) => {

  const dispatch = useDispatch();
  const { name, email } = useSelector((store) => store.auth.userData)
  const ref = useRef();
  const navigate = useNavigate();
  useOutsideClick(ref, () => {
    closeProfileDropdown();
  });

  const gotoIndexPage = () => {
    navigate("/", { replace: true });
  }

  const handleSignOut = () => {
    dispatch(removeUserData(gotoIndexPage));
  }

  return (
    <div ref={ref} className='w-auto block'>
      <section className='py-4 pl-5 pr-8 flex flex-col items-start justify-start text-[#585858] border-b-[1px] border-b-[#dddada]'>
        <span className='text-base mb-1'>{name}</span>
        <span className='text-sm'>{email}</span>
      </section>
      <ul className='py-4 pl-5 pr-8 flex flex-col items-start justify-center text-sm text-[#585858]'>
        <li className='flex items-center justify-start w-full'>
          <Link to="/my-blogs" className='py-2 pr-6 pl-1 w-full hover:text-black'>My Blogs</Link>
        </li>
        <li className='flex items-center justify-start w-full'>
          <Link to="/bookmarks" className='py-2 pr-6 pl-1 w-full hover:text-black'>Bookmarks</Link>
        </li>
        <li className='flex items-center justify-start w-full cursor-pointer'>
          <button className=' text-start py-2 pr-6 pl-1 w-full hover:text-black' onClick={handleSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </div>
  )
}

export default NavbarProfileDroddown;
