import React from 'react'
import loadingImage from "../assets/Loading.gif"

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[100vh] w-full'>
        <img src={loadingImage} alt=""  className='sm:h-[500px] sm:w-[500px]'/>
    </div>
  )
}

export default Loading