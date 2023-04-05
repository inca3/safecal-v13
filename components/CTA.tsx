'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useRouter } from 'next/navigation';

import { auth } from '@/utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

const CTA = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signUpUser = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      router.push('/app');
    } catch (error) {
      console.log(error);
    }
  };
  if (user)
    return (
      <div className='my-10 flex w-full flex-col items-center justify-center pb-10'>
        <h1 className='mb-10 text-center text-2xl font-bold text-darkText md:mb-12 md:text-4xl'>
          You are ready to go {user?.displayName?.split(' ')[0]}!
        </h1>
        <Link
          href={'/app'}
          className='mt-4 rounded-md bg-darkGreen py-2 px-8 text-lightSkinLighter'
        >
          Go to App
        </Link>
      </div>
    );
  return (
    <section className='container py-10 md:py-16'>
      <h1 className='mb-10 text-center text-2xl font-bold text-darkText md:mb-12 md:text-4xl'>
        Sign up now and get started!
      </h1>
      <form
        className='flex flex-col items-center justify-center gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          signUpUser();
        }}
      >
        <input
          type='text'
          placeholder='Name'
          className='rounded'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email'
          className='rounded'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='rounded'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='mt-4 rounded-md bg-darkGreen py-2 px-8 text-lightSkinLighter'>
          Sign Up!
        </button>
        <p>or</p>
        <Link
          href={'/sign-in'}
          className='flex max-w-max items-center justify-center gap-2 rounded-md bg-darkGreen px-8 py-2 text-lightSkinLighter'
        >
          <AiFillGoogleCircle className='h-6 w-6' /> <p>Sign in with Google</p>
        </Link>
      </form>
      <p className='mt-6 w-full text-center'>
        Already a member?{' '}
        <Link href={'/sign-in'} className='font-semibold underline'>
          Sign In!
        </Link>
      </p>
    </section>
  );
};
export default CTA;
