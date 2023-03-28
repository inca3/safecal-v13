import Image from 'next/image';
import Link from 'next/link';

import LogoLight from '@/assets/logo-inverse.png';

const footerMenu = [
  {
    title: 'Features',
    href: '/features',
    subtitles: ['Calorie Counter', 'Water Tracker', 'Exercise Tracker'],
  },
  { title: 'Blog', href: '/blog', subtitles: ['Latest Posts', 'Archive'] },
  {
    title: 'Contact',
    href: '/',
    subtitles: ['hello@safecal.com', 'Türkali mh. No: 24, Beşiktaş/İstanbul'],
  },
];

interface Props {
  item: {
    title: string;
    href: string;
    subtitles: string[];
  };
}

const FooterItem: React.FC<Props> = ({ item }) => {
  return (
    <ul className='hidden md:flex md:flex-col md:gap-2'>
      <Link href={item.href} className='mb-4 font-bold'>
        {item.title}
      </Link>
      {item.subtitles.map((sub) => (
        <li key={sub} className='hidden lg:inline'>
          {sub}
        </li>
      ))}
    </ul>
  );
};

const Footer = () => {
  return (
    <footer className='bg-darkGreen py-10 text-lightSkinLighter '>
      <div className='container grid grid-cols-1 justify-between md:grid-cols-4'>
        <Image src={LogoLight} alt='logo' />
        {footerMenu.map((item) => (
          <FooterItem key={item.title} item={item} />
        ))}
      </div>
      <p className='container mt-4 text-sm md:mt-10'>copyright © SafeCal</p>
    </footer>
  );
};
export default Footer;
