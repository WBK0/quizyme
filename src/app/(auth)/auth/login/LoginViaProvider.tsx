"use client";
import Image from 'next/image';
import google from '@/public/google.svg';
import github from '@/public/github.svg';
import { signIn } from 'next-auth/react';

const LoginViaProvider = () => {
  return (
    <div className="mt-4">
      <button 
        className="bg-white text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mb-3 font-bold relative h-10"
        onClick={() => {signIn('google')}}
      >
        <i className="absolute left-5 top-1">
          <Image src={google} width={32} height={32} alt="google" />
        </i>
        <span>Login with Google</span>
      </button>
      <button 
        className="bg-white text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full font-bold relative h-10"
        onClick={() => {signIn('github')}}
      >
        <i className="absolute left-5 top-1">
          <Image src={github} width={32} height={32} alt="github" />
        </i>
        <span>Login with Github</span>
      </button>
    </div>
  )
}
export default LoginViaProvider;