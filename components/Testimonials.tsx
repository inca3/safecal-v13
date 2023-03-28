import Image from 'next/image';

import t1 from '@/assets/testimonials/testimonial1.png';
import t2 from '@/assets/testimonials/testimonial2.png';
import t3 from '@/assets/testimonials/testimonial3.png';
import starsImage from '@/assets/icons/star.png';

const testimonialList = [
  {
    id: 0,
    name: 'Name Surname',
    stars: [1, 2, 3, 4, 5],
    image: t1,
    comment:
      'Sed ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare iaculis. Maecenas non justo no...',
  },
  {
    id: 1,
    name: 'Name Surname',
    stars: [1, 2, 3, 4, 5],
    image: t2,
    comment:
      'Sed ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare iaculis. Maecenas non justo no...',
  },
  {
    id: 2,
    name: 'Name Surname',
    stars: [1, 2, 3, 4, 5],
    image: t3,
    comment:
      'Sed ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare iaculis. Maecenas non justo no...',
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
    <div className='flex flex-col items-center gap-6 px-4 text-center'>
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
        <p className='text-darkText'>{testimonial.comment}</p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className='container grid grid-cols-1 items-center justify-center gap-12 py-10 md:grid-cols-3 md:py-20'>
      <h1 className='text-center text-2xl font-bold text-darkText md:col-span-3 md:mb-12 md:text-4xl'>
        What people think
      </h1>
      {testimonialList.map((testimonial) => (
        <Testimonial key={testimonial.name} testimonial={testimonial} />
      ))}
    </section>
  );
};
export default Testimonials;
