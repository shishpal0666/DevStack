import React, { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
  }

  return (
    <div className='relative h-auto w-auto mx-4 my-2'>
      <BiSearch className='absolute text-[#807d7d] top-[50%] left-0 translate-y-[-50%] translate-x-[50%]'/>
      <input
        className="pl-8 pr-2 py-2 bg-[#f7f5f5] outline-none rounded-full text-sm"
        type="text"
        placeholder="Search"
        onChange={(e) => handleSearch(e.target.value)}
        value={search}/>
    </div>
  )
}

export default SearchBar;
