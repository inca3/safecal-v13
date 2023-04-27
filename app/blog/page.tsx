import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remarkHtml from 'remark-html';
import { remark } from 'remark';

import Link from 'next/link';
import Image from 'next/image';

import { format } from 'date-fns';

const postsDirectory = path.join(process.cwd(), 'blog/posts');

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((filename, i) => {
    const fullPath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf-8');
    const matterResult = matter(fileContents);
    const blogPost: BlogPost = {
      id: matterResult.data.id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      image: matterResult.data?.image,
      slug: filename.replace('.md', ''),
      sum: matterResult.data?.sum,
    };
    return blogPost;
  });
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostData(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');
  const matterResult = matter(fileContents);
  const proccesedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = proccesedContent.toString();
  const blogPostWithHTML: BlogPost & { contentHtml: string } = {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    id: matterResult.data.id,
    image: matterResult.data.image,
    contentHtml,
  };
  return blogPostWithHTML;
}

const BlogPosts = () => {
  const posts = getSortedPostsData();
  return (
    <section className='container py-10 md:py-20'>
      <h1 className='text-center text-2xl font-bold text-darkText md:mb-12 md:text-4xl'>
        Blog
      </h1>
      <h2 className='my-4 text-lg font-bold text-darkText md:my-8 md:text-2xl'>
        Latest Post
      </h2>
      <LatestPost latestPost={posts[0]} />
      <h2 className='my-4 text-lg font-bold text-darkText md:my-8 md:text-2xl'>
        Posts you may like
      </h2>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};
export default BlogPosts;

type PostProps = { post: BlogPost };
const SinglePost = ({ post }: PostProps) => {
  const { title, date, image, sum, slug } = post;
  return (
    <Link
      href={`/blog/post/${slug}`}
      className='flex flex-col gap-4 overflow-hidden rounded-md bg-lightSkin shadow-lg'
    >
      <div className='relative h-60 w-full overflow-hidden'>
        <Image src={image} alt={title} fill className='object-cover' />
        <p className='absolute top-4 right-4 rounded bg-lightSkin px-2 py-1 text-sm text-darkGreen'>
          {format(new Date(date), 'dd MMMM yyyy')}
        </p>
      </div>
      <div className='p-4'>
        <h1 className='my-2 text-lg font-bold text-darkText'>{title}</h1>
        <p>{sum}</p>
      </div>
    </Link>
  );
};

type LatestPostProps = { latestPost: BlogPost };
const LatestPost = ({ latestPost }: LatestPostProps) => {
  const { image, title, sum, date, slug } = latestPost;
  return (
    <Link
      href={`/blog/post/${slug}`}
      className='grid grid-cols-1 gap-10 overflow-hidden rounded-md bg-darkGreen p-10 md:grid-cols-2 md:items-center md:gap-14 md:p-20'
    >
      <div className='relative h-80'>
        <Image
          src={image}
          alt={title}
          fill
          className='rounded-md object-cover shadow-blogImage shadow-lightSkinLighter md:w-full md:max-w-none'
        />
      </div>
      <div className='flex flex-col gap-4 text-lightSkinLighter'>
        <p className='text-sm'>{format(new Date(date), 'dd MMMM yyyy')}</p>
        <h1 className='text-lg font-bold'>{title}</h1>
        <p>{sum}</p>
        <p className='text-sm font-bold'>See More &nbsp; {'>'}</p>
      </div>
    </Link>
  );
};
