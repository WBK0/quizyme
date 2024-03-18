"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";
import logo from '@/public/logo.svg';
import { useRouter } from "next/navigation";

const Callback = () => {
  const { update, status, data } = useSession();
  const router = useRouter();

  const refreshToken = async () => {
    if(data){
      setTimeout(async () => {
        await update();
        if(data?.user?.isComplete){
          router.replace('/');
        }
      }, 500);
    }
  }

  useEffect(() => {
    refreshToken();
  }, [status]);

  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4 items-center">
      <div className="animate-bounce">
        <Image src={logo} width={150} height={150} alt="logo" 
          className="my-4"
        />
      </div>      
      <h1 className="font-black text-4xl text-center">Welcome in our family!</h1>
      <p className="text-center text-sm mt-6 font-bold">
        Please wait while we are saving all your data and configuration your account!
      </p>
      <p className="text-center text-sm font-bold">
        You will be redirected to the homepage in a few seconds...
      </p>
    </div>
  )
}
export default Callback;