import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const Header = () => {
  return (
    <div className='flex items-center flex-row w-full ml-auto mr-auto mt-[50px] h-[25px] max-w-[1080px]'>
      <StaticImage src='../images/logo.png' alt='Food Spin logo' />
      <div className='w-full flex flex-row gap-16 items-center justify-center'>
        <a className='text-sm sm:flex hidden'>Breakfast</a>
        <a className='text-sm sm:flex hidden'>Lunch</a>
        <a className='text-sm sm:flex hidden'>Dinner</a>
      </div>
      <div className='relative self-center'>
        <span className='bg-[#FF922C] absolute bottom-0 right-0 h-[6px] w-[6px] rounded-[50%]'></span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-[18px] h-[21px]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
