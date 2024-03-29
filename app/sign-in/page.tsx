'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CTA from '@/components/CTA';

import Image from 'next/image';
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

import { AiFillGoogleCircle } from 'react-icons/ai';
import HeaderImage from '@/assets/signin.webp';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isMember, setIsMember] = useState(true);

  const [user, loading] = useAuthState(auth);

  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };
  const EmailLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const addUserToDb = async () => {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
      });
    };
    if (user) {
      addUserToDb();
      router.push('/app');
    }
  }, [user]);

  return (
    <section className='container flex flex-col items-center justify-center gap-4 py-10 md:py-16'>
      <h1 className='text-center text-xl font-bold text-darkText md:text-4xl'>
        You are one step away from reaching your goals!
      </h1>
      <p>
        You can sign in with you e-mail and password or use any provider listed
        below.
      </p>
      <form
        className='flex flex-col items-center justify-center gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          EmailLogin();
        }}
      >
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
          Sign In!
        </button>
      </form>
      <p className='-my-2'>or</p>
      <button
        onClick={GoogleLogin}
        className='flex max-w-max items-center justify-center gap-2 rounded-md bg-darkGreen py-2 px-8 text-lightSkinLighter'
      >
        <AiFillGoogleCircle className='h-6 w-6' /> <p>Sign in with Google</p>
      </button>
      <p>
        {"Don't have account, "}
        <span
          className='cursor-pointer font-bold underline'
          onClick={() => setIsMember(false)}
        >
          sign up!
        </span>
      </p>
      {!isMember && <CTA />}
      <div className='relative h-80 w-full overflow-hidden rounded-md md:h-96'>
        <Image
          src={HeaderImage}
          alt='CTA Image'
          fill
          className='object-cover saturate-0'
        />
        <div className='absolute h-full w-full bg-darkGreen opacity-60'></div>
      </div>
    </section>
  );
};
export default SignIn;
