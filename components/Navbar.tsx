'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Nav from './Nav';
import ResNav from './ResNav';

import Logo from '@/assets/logo.png';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='container grid grid-cols-2 items-center justify-between py-6 lg:grid-cols-3'>
      <Link href={'/'}>
        <Image src={Logo} alt='logo' className='' />
      </Link>
      <Nav />
      <ResNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <Link
        href={'/sign-in'}
        className='hidden place-self-end rounded-md bg-darkGreen py-2 px-8 font-semibold text-lightSkinLighter lg:inline'
      >
        Go to app
      </Link>
      <div
        className='z-20 w-8 cursor-pointer place-self-end text-darkGreen transition-all duration-500 lg:hidden'
        onClick={(e) => {
          setIsOpen((prevState) => (prevState == true ? false : true));
          e.currentTarget.classList.toggle('rotate-90');
        }}
      >
        {isOpen ? (
          <IoCloseSharp className='h-full w-full' />
        ) : (
          <HiOutlineMenuAlt4 className='h-full w-full' />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
