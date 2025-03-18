import React from 'react'

const PositionBottom = () => {
  return (
    <section className="mt-12 py-8 antialiased">
        <div className="mx-auto grid max-w-screen-xl px-4 pb-8 md:grid-cols-12 lg:gap-12 xl:gap-0">
        <div className="content-center justify-self-start md:col-span-7 md:text-start">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight dark:text-white md:max-w-2xl md:text-5xl xl:text-6xl">Season Special!<br />Up to 100% OFF!</h1>
            <p className="max-w-2xl text-gray-500 md:mb-12 md:text-lg mb-3 lg:mb-5 lg:text-xl">Premium Stats at Unbeatable Prices. Limited Time Only!</p>
        </div>
        <div className="md:col-span-5 md:mt-0 md:flex">
            <img className="" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/girl-shopping-list.svg" alt="sports analytics" />
        </div>
        </div>
  </section>
  )
}

export default PositionBottom;