import Image from 'next/image';

import Cutlery from '@/assets/icons/cutlery.png';
import Water from '@/assets/icons/water.png';
import Dumbbell from '@/assets/icons/dumbbell.png';

import CutleryBG from '@/assets/features/f1.png';
import WaterBG from '@/assets/features/f2.png';
import DumbbellBG from '@/assets/features/f3.png';

export const featuresList = [
  {
    id: 0,
    image: Cutlery,
    bgImage: CutleryBG,
    order: 'first',
    title: 'Calorie Counter',
    content: `As you log your meals throughout the day, the app will keep track of your remaining calories for the day. This can help you make informed choices about what to eat and prevent overeating.`,
  },
  {
    id: 1,
    image: Water,
    bgImage: WaterBG,
    order: 'last',
    title: 'Water Tracker',
    content: `As you input how much water you drink throughout the day, the app will keep track of your progress towards your daily goal. You can see how much water you've consumed and how much you have left to reach your goal.`,
  },
  {
    id: 2,
    image: Dumbbell,
    bgImage: DumbbellBG,
    order: 'first',
    title: 'Exercise Tracker',
    content: `As you log your workouts, the app will provide real-time feedback on your progress. You can see how many calories you've burned, how long you've worked out, and other key metrics.t.`,
  },
];

export interface Feature {
  feature: {
    id: number;
    image: any;
    bgImage: any;
    order: number | string;
    title: string;
    content: string;
  };
}

const Feature: React.FC<Feature> = ({ feature }) => {
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
