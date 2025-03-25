import React from 'react'

const LoadingComponent = () => {
  return (
    <div className='fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] '>
      <div className=' w-10 h-10 border-4 border-solid border-[#f0eded] border-t-[#7a7878] rounded-full animate-spin'></div>
    </div>
  )
}

export default LoadingComponent;
