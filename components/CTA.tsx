'use client';

const CTA = () => {
  return (
    <section className='container py-10 md:py-16'>
      <h1 className='mb-10 text-center text-2xl font-bold text-darkText md:mb-12 md:text-4xl'>
        Sign up now and get started!
      </h1>
      <form
        className='flex flex-col items-center justify-center gap-4'
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type='text' placeholder='Email' className='rounded' />
        <input type='password' placeholder='Password' className='rounded' />
        <button className='mt-4 rounded-md bg-darkGreen py-2 px-8 font-semibold text-lightSkinLighter'>
          Sign Up!
        </button>
      </form>
    </section>
  );
};
export default CTA;
