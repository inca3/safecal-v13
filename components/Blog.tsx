import Image from 'next/image';
import Link from 'next/link';
import { getSortedPostsData } from '@/app/blog/page';

const posts = getSortedPostsData();
const latestPost = posts[0];

type PostProps = { post: BlogPost };

const BlogPost: React.FC<PostProps> = ({ post }) => {
  return (
    <div className='grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-10'>
      <div className='relative h-80 w-full'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className='max-h-80 w-full rounded-md object-cover shadow-blogImage shadow-lightSkinLighter md:w-full md:max-w-none'
        />
      </div>
      <div className='flex flex-col gap-4 text-lightSkinLighter'>
        <h1 className='text-lg font-bold'>{post.title}</h1>
        <p>{post.sum}</p>
        <Link href={`/blog/post/${post.slug}`} className='text-sm font-bold'>
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
      <div className='container px-16'>
        <BlogPost post={latestPost} />
      </div>
      {/* <div className='mt-8 flex w-full items-center justify-center gap-2 md:mt-12'>
        <div className='h-2 w-2 rounded-full bg-white'></div>
        <div className='h-2 w-2 rounded-full bg-white/50'></div>
        <div className='h-2 w-2 rounded-full bg-white/50'></div>
      </div> */}
    </section>
  );
};
export default Blog;
