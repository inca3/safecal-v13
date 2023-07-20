import Image from 'next/image';
import Link from 'next/link';
import HeaderImage from '@/assets/header-img.jpg';

const Header = () => {
  return (
    <header className='relative h-[640px] w-full overflow-hidden'>
      <Image
        src={HeaderImage}
        alt={'header'}
        className='shadow-header h-full w-full object-cover object-center saturate-0 md:object-center'
        loading='eager'
      />
      <div className='absolute top-0 left-0 h-full w-full bg-darkGreen bg-opacity-80 text-lightSkin'>
        <div className='container flex h-full w-full flex-col items-center justify-center gap-10 text-center'>
          <h1 className='max-w-[14ch] text-6xl font-bold md:text-8xl'>
            YOU ARE WHAT YOU EAT!
          </h1>
          <p className='max-w-[42ch] text-lg md:text-xl'>
            Keep track of your meal daily, know what you eat and reach your
            goals faster and stronger.
          </p>
          <Link
            href={'/app'}
            className='rounded-md bg-lightSkinLighter py-2 px-8 font-semibold text-darkGreen'
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
