import React from 'react';
import promoPlayer from '@/assets/Images/promo-player.jpg';

const Promo = () => {
  return (
    <section className="bg-white py-6 antialiased dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl rounded-xl dark:bg-gray-800 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
        <div className="lg:col-span-5">
          <a href="#">
            <img
              className="mb-4 w-[90%] dark:hidden sm:h-96 sm:w-96 rounded-lg xl:w-full"
              src={promoPlayer}
              alt="Football player"
            />
          </a>
        </div>
        <div className="me-auto place-self-center lg:col-span-7">
          <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            Score Big with Exclusive Football Deals! <br />
            Save $50 on Your Next Purchase.
          </h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Gear up for the season with our limited-time offer. Get your favorite football jerseys, boots, and accessories at unbeatable prices. Don't miss out—shop now and elevate your game!
          </p>
        
        </div>
      </div>
    </section>
  );
};

export default Promo;