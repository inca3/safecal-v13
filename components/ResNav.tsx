'use client';

import { menu } from './Nav';
import { auth } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

import Link from 'next/link';

interface Props {
  isOpen: boolean;
  isUser: any;
  closeMenu: Function;
}

const ResNav: React.FC<Props> = ({ isOpen, isUser, closeMenu }) => {
  const router = useRouter();
  const logOut = () => {
    auth.signOut();
    router.push('/');
    closeMenu();
  };
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
          <Link href={item.href} onClick={() => closeMenu()}>
            {item.name}
          </Link>
        </li>
      ))}
      <li className='w-full border-b border-b-darkSkin text-center'>
        <Link href={'/app'} className='' onClick={() => closeMenu()}>
          {isUser ? 'App' : 'Go to app'}
        </Link>
      </li>
      {isUser && (
        <li className='w-full border-b border-b-darkSkin text-center'>
          <button onClick={logOut}>SIGN OUT</button>
        </li>
      )}
    </ul>
  );
};
export default ResNav;
