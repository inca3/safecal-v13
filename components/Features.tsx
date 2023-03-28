import Image from 'next/image';

import Cutlery from '@/assets/icons/cutlery.png';
import Water from '@/assets/icons/water.png';
import Dumbell from '@/assets/icons/dumbbell.png';

const featuresList = [
  {
    id: 0,
    image: Cutlery,
    order: 0,
    title: 'Calorie Counter',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare
    iaculis. Maecenas non justo non sem suscipit suscipit.`,
  },
  {
    id: 1,
    image: Water,
    order: 'last',
    title: 'Water Tracker',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare
    iaculis. Maecenas non justo non sem suscipit suscipit.`,
  },
  {
    id: 2,
    image: Dumbell,
    order: 0,
    title: 'Exercise Tracker',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare
    iaculis. Maecenas non justo non sem suscipit suscipit.`,
  },
];

interface Props {
  feature: {
    id: number;
    image: any;
    order: number | string;
    title: string;
    content: string;
  };
}

const Feature: React.FC<Props> = ({ feature }) => {
  return (
    <div className='flex flex-col items-center gap-6 px-4 text-center'>
      <Image src={feature.image} alt={feature.title} className='w-14 md:w-20' />
      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-bold text-darkGreen'>{feature.title}</h1>
        <p className='text-darkText'>{feature.content}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className='container grid grid-cols-1 items-center justify-center gap-12 py-10 md:grid-cols-3 md:py-20'>
      <h1 className='text-center text-2xl font-bold text-darkText md:col-span-3  md:mb-12 md:text-4xl'>
        Features
      </h1>
      {featuresList.map((feature) => (
        <Feature key={feature.title} feature={feature} />
      ))}
    </section>
  );
};
export default Features;
