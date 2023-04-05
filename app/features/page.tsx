import Image from 'next/image';

import { featuresList } from '@/components/Features';
import { Feature as FeatureInterface } from '@/components/Features';

const Feature: React.FC<FeatureInterface> = ({ feature }) => {
  return (
    <div className='grid grid-cols-1 items-center justify-center gap-x-10 gap-y-6 md:grid-cols-2'>
      <div
        className={`flex max-w-md flex-col gap-4 ${
          feature.id == 1 && 'md:order-last'
        }`}
      >
        <h1 className='text-lg font-bold text-darkGreen'>{feature.title}</h1>
        <p>{feature.content}</p>
      </div>
      <Image src={feature.bgImage} alt={feature.title} />
    </div>
  );
};

const FeaturesHome = () => {
  return (
    <section className='container flex max-w-max flex-col gap-16 py-10 md:py-16'>
      <h1 className='text-center text-xl font-bold text-darkText md:col-span-2 md:mb-10 md:text-3xl'>
        Features
      </h1>
      {featuresList.map((feature) => (
        <Feature key={feature.id + 10} feature={feature} />
      ))}
    </section>
  );
};
export default FeaturesHome;
