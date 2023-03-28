import Link from 'next/link';

interface navItem {
  name: string;
  href: string;
}

export const menu: navItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Blog', href: '/blog' },
];

const Nav = () => {
  return (
    <ul className='hidden gap-20 place-self-center uppercase lg:flex'>
      {menu.map((item) => (
        <li
          key={item.name}
          className='border-b-2 border-b-transparent transition-all hover:border-b-darkSkin'
        >
          <Link href={item.href}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
};
export default Nav;
