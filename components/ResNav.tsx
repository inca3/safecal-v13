'use client';

import { menu } from './Nav';

import Link from 'next/link';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResNav: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <ul
      className={`${
        isOpen ? 'top-0' : '-top-full'
      } absolute left-0 z-10 flex w-full flex-col items-center gap-10 bg-lightSkin px-4 py-8 uppercase text-darkText transition-all duration-500 ease-in-out lg:hidden`}
    >
      <li className='opacity-0'></li>
      {menu.map((item, i) => (
        <li
          key={item.name + 1}
          className='w-full border-b border-b-darkSkin text-center'
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
      <li>
        <Link
          href={'/sign-in'}
          className='rounded-md bg-darkGreen px-4 py-2 text-lightSkinLighter'
        >
          Sign In
        </Link>
      </li>
    </ul>
  );
};
export default ResNav;
