import React from "react";
import { Link } from "react-router-dom";

const UnderDevelopment = () => {
  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="py-8 px-4 mx-auto lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-5xl tracking-tight font-extrabold lg:text-6xl text-primary-600 dark:text-primary-500">
            Coming Soon
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            We are working on it 🚀
          </p>
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
            Our team is working hard to bring you an amazing experience. Stay
            tuned for updates — it’ll be worth the wait!
          </p>
          <Link to={"/"}>
            <div className="inline-flex bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 duration-300">
              Back to HomePage
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UnderDevelopment;
