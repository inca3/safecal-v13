import Image from 'next/image';
import Link from 'next/link';

import postImage from '@/assets/blog/blog-post-1.jpg';

const samplePost = {
  id: 0,
  title: 'Why you need to work out?',
  sum: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare iaculis. Maecenas non justo non sem suscipit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper condimentum nulla vitae porttitor. Morbi lobortis ornare iaculis. Maecenas non justo no...`,
  body: 'post body',
  image: postImage,
  href: '/',
};

interface Post {
  post: {
    id: number;
    title: string;
    sum: string;
    body: string;
    image: any;
    href: string;
  };
}

const BlogPost: React.FC<Post> = ({ post }) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center'>
      <Image
        src={post.image}
        alt={post.title}
        className='max-h-80 w-full rounded-md object-cover shadow-blogImage shadow-lightSkinLighter md:w-full md:max-w-none'
      />
      <div className='flex flex-col gap-4 text-lightSkinLighter'>
        <h1 className='text-lg font-bold'>{post.title}</h1>
        <p>{post.sum}</p>
        <Link href={post.href} className='text-sm font-bold'>
          See More &nbsp; {'>'}
        </Link>
      </div>
    </div>
  );
};

const Blog = () => {
  return (
    <section className='bg-darkGreen py-10 md:py-20'>
      <h1 className='mb-10 text-center text-2xl font-bold text-lightSkinLighter md:mb-12 md:text-4xl'>
        Blog
      </h1>
      <div className='container'>
        <BlogPost post={samplePost} />
      </div>
    </section>
  );
};
export default Blog;
