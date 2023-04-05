'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

import t1 from '@/assets/testimonials/testimonial1.png';
import t2 from '@/assets/testimonials/testimonial2.png';
import t3 from '@/assets/testimonials/testimonial3.png';
import starsImage from '@/assets/icons/star.png';

const testimonialList = [
  {
    id: 0,
    name: 'John Smith',
    stars: [1, 2, 3, 4, 5],
    image: t1,
    comment:
      "This app has been a lifesaver for me. It's so easy to track my calories, water intake, and exercises. The comprehensive food database and user-friendly interface make it easy to stay on top of my health goals.",
  },
  {
    id: 1,
    name: 'Sarah Johnson',
    stars: [1, 2, 3, 4, 5],
    image: t2,
    comment:
      "I've tried several calorie tracking apps before, but this one is by far the best. I love how it also tracks my water intake and exercises. It keeps me accountable and motivated throughout the day.",
  },
  {
    id: 2,
    name: 'Emily Rodriguez',
    stars: [1, 2, 3, 4, 5],
    image: t3,
    comment:
      "This app has been a game changer for me. It's not just about counting calories, but also about tracking my water intake and exercises. The reminders and progress charts keep me motivated and on track towards my health goals.",
  },
];
interface Props {
  testimonial: {
    id: number;
    name: string;
    stars: number[];
    image: any;
    comment: string;
  };
}

const Testimonial: React.FC<Props> = ({ testimonial }) => {
  return (
    <div className='flex min-w-full snap-center flex-col items-center gap-6 px-20 text-center md:px-4 lg:static lg:min-w-0'>
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        className='w-24 md:w-28 '
      />
      <div className='flex'>
        {testimonial.stars.map((star, i) => (
          <Image
            key={testimonial.name + i}
            src={starsImage}
            alt={testimonial.name}
          />
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-lg font-bold text-darkGreen'>{testimonial.name}</h1>
        <p className='text-darkText md:max-w-lg'>{testimonial.comment}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [scrollState, setScrollState] = useState<number | any>(0);
  const scroller = useRef<HTMLDivElement>(null);
  return (
    <section className='container py-10 md:py-20'>
      <h1 className='mb-10 text-center text-2xl font-bold text-darkText md:mb-16 md:text-4xl'>
        What people think
      </h1>
      <div className='relative'>
        <div
          ref={scroller}
          className='flex snap-x snap-mandatory items-center gap-12 overflow-x-auto scroll-smooth lg:justify-center lg:overflow-x-auto'
          onScroll={(e) => setScrollState(scroller.current?.scrollLeft)}
          id='testimonials'
        >
          {testimonialList.map((testimonial) => (
            <Testimonial
              key={testimonial.name + testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
        <IoIosArrowBack
          className={`absolute top-1/2 left-6 h-6 w-6 cursor-pointer rounded-full bg-lightSkinLighter transition-all duration-300 lg:hidden ${
            scrollState < 100 && 'pointer-events-none cursor-default opacity-0'
          }`}
          onClick={() => scroller.current?.scrollTo(scrollState - 400, 0)}
        />
        <IoIosArrowForward
          className={`absolute top-1/2 right-6 h-6 w-6 cursor-pointer rounded-full bg-lightSkinLighter transition-all duration-300 lg:hidden ${
            scrollState > 800 && 'pointer-events-none cursor-default opacity-0'
          }`}
          onClick={() => scroller.current?.scrollTo(scrollState + 400, 0)}
        />
      </div>
    </section>
  );
};
export default Testimonials;
