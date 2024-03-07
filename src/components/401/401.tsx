import Image from "next/image";
import Link from "next/link";
import logo from '@/public/logo.svg';

const Unauthorized = () => {
  return (
    <div className="absolute min-h-screen w-full flex flex-col justify-center top-0 gap-12 left-0">
      <Image 
        src={logo} 
        width={256} 
        height={256} 
        alt="Logo" 
        className="mx-auto"
      />
      <div className="max-w-lg mx-auto">
        <h1 className="font-black text-6xl text-center">Unauthorized</h1>
        <p className="text-center pt-6 font-semibold text-xl">
          You are not authorized to access this page.
        </p>  
        <p className="text-center font-bold text-xl mt-3">
          Please login or change account and try again.
        </p>
      </div>
      <Link href={'/auth/login'} className="mx-auto">
        <button
          type="button"
          className="bg-black text-white px-12 py-3 rounded-full font-black shadow-small shadow-green duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Go to sign in
        </button>
      </Link>
    </div>
  )
}

export default Unauthorized;