'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

import { auth } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Nav from './Nav';
import ResNav from './ResNav';

import Logo from '@/assets/logo.png';
import { HiOutlineMenuAlt4 } from 'react-icons/hi';
import { IoCloseSharp } from 'react-icons/io5';

import alternatePP from '@/assets/pp.png';

const Navbar = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const menuButton = useRef<HTMLDivElement>(null);

  const openMenu = (event: React.MouseEvent) => {
    setIsOpen((prevState) => (prevState == true ? false : true));
    event.currentTarget.classList.toggle('rotate-90');
  };

  const closeMenu = () => {
    setIsOpen(false);
    menuButton.current?.classList.toggle('rotate-90');
  };

  const logOut = () => {
    auth.signOut();
    router.push('/');
  };

  return (
    <nav className='container grid grid-cols-2 items-center justify-between py-6 lg:grid-cols-3'>
      <Link href={'/'}>
        <Image src={Logo} alt='logo' className='' />
      </Link>
      <Nav />
      <ResNav isOpen={isOpen} closeMenu={closeMenu} isUser={user} />
      <div className='hidden gap-2 place-self-end lg:flex lg:items-center lg:justify-center'>
        <Link
          href={'/sign-in'}
          className=' rounded-md bg-darkGreen py-2 px-8 font-semibold text-lightSkinLighter '
        >
          Go to app
        </Link>
        <ProfileMenu user={user} logOut={logOut} />
      </div>
      <div
        className='z-20 w-8 cursor-pointer place-self-end text-darkGreen transition-all duration-500 lg:hidden'
        ref={menuButton}
        onClick={(e) => {
          openMenu(e);
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

const ProfileMenu: React.FC<any> = ({ user, logOut }) => {
  if (!user) return <></>;
  return (
    <div className='relative'>
      <Image
        src={user?.photoURL || alternatePP}
        alt='profile'
        height={32}
        width={32}
        className='cursor-pointer rounded-full border-2 border-darkGreen object-cover'
      />
      <input
        type='checkbox'
        name='profile'
        id=''
        className='peer absolute top-0 right-0 h-8 w-8 cursor-pointer opacity-0'
      />
      <ul className='absolute top-full right-0 z-20 my-4 hidden w-40 flex-col gap-2 rounded bg-darkGreen px-4 py-4 text-lightSkinLighter peer-checked:flex [&>]:underline '>
        <li>{user?.displayName}</li>
        <li className='cursor-pointer' onClick={logOut}>
          Sign Out
        </li>
      </ul>
    </div>
  );
};
