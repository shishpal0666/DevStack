import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import { useDispatch } from 'react-redux';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || '');
  
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    if(location.pathname !== '/search'){
      setSearchValue('');
    }
  },[location.pathname])
  
  // const tag = searchParams.get('tag');
  // const handleEnterKey = (e) => {
  //   if( e.key === 'Enter'){
  //     if(!tag){
  //       const query = {
  //         search: searchValue,
  //       }
  //       navigate({
  //         pathname: '/search',
  //         search: createSearchParams(query).toString()
  //       })
  //     }
  //     else{
  //       const query = {
  //         search: searchValue,
  //         tag: tag
  //       }
  //       navigate({
  //         pathname: '/search',
  //         search: createSearchParams(query).toString()
  //       })
  //     }
  //   }
  // }

  const handleEnterKey = (e) => {
    if(e.key === 'Enter'){
      searchValue !== ''
      ?
      navigate({
        pathname: '/search',
        search:  createSearchParams({search: searchValue}).toString(),
      })
      :
      navigate('/');
    }
  }

  return (
    <div className='relative h-auto w-auto mx-4 my-2'>
      <BiSearch className='absolute text-[#807d7d] top-[50%] left-0 translate-y-[-50%] translate-x-[50%]'/>
      <input
        className="pl-8 pr-2 py-2 bg-[#f7f5f5] outline-none rounded-full text-sm"
        type="text"
        placeholder="Search"
        onKeyDown={handleEnterKey}
        onChange={(e) => handleSearch(e)}
        value={searchValue}/>
    </div>
  )
}

export default SearchBar;
