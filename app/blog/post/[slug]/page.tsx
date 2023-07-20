import { getPostData, getSortedPostsData } from '@/app/blog/page';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';

import Image from 'next/image';
import Link from 'next/link';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const posts = getSortedPostsData();
  const { slug } = params;
  const post = posts.find((post) => post.slug === slug);

  if (!post)
    return {
      title: 'Post Not Found',
    };

  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const posts = getSortedPostsData();
  const { slug } = params;
  console.log(slug);

  if (!posts.find((post) => post.slug === slug)) {
    return notFound();
  }

  const { title, date, image, contentHtml } = await getPostData(slug);
  return (
    <article className='prose max-w-4xl mx-auto my-10 px-4 lg:my-20'>
      <Link
        href={'/blog'}
        className=' rounded bg-darkGreen py-2 px-4 text-lightSkinLighter decoration-transparent'
      >
        Go Back
      </Link>
      <p className='text-right'>{format(new Date(date), 'dd MMMM yyyy')}</p>
      <h1>{title}</h1>
      <div className='relative h-[400px] overflow-hidden'>
        <Image
          src={image}
          alt={title}
          fill
          className='max-w-none object-cover'
        />
      </div>
      <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
