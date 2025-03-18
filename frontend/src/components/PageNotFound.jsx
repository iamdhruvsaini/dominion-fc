import React from 'react'
import errorImage from '@/assets/Images/404-error.svg' 

const PageNotFound = () => {
  return (
    <section className='flex flex-col items-center justify-center h-screen space-y-2'>
        <img src={errorImage} alt="" className='h-[50%] sm:h-[60%]' />
        <h2 className='text-xl sm:text-4xl font-bold text-blue-700'>404 Not Found</h2>
        <h1 className='text-xl sm:text-2xl font-bold'>Whoops! That page doesn’t exist.</h1>
    </section>

  )
}

export default PageNotFound