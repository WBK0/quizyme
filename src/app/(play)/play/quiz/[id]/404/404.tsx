import Image from "next/image";
import logo from "@/public/logo.svg";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="absolute min-h-screen w-full flex flex-col justify-center top-0 gap-12">
      <Image 
        src={logo} 
        width={256} 
        height={256} 
        alt="Logo" 
        className="mx-auto"
      />
      <div className="max-w-lg mx-auto">
        <h1 className="font-black text-6xl text-center">404</h1>
        <p className="text-center pt-6 font-semibold text-xl">
          The quiz game you are looking for does not exist.
        </p>  
        <p className="text-center font-bold text-xl">Please check the URL and try again.</p>
      </div>
      <Link href="/" className="mx-auto">
        <button
          type="button"
          className="bg-black text-white px-12 py-3 rounded-full font-black shadow-small shadow-green duration-300 hover:scale-105"
        >
          Go to home
        </button>
      </Link>
    </div>
  )
}

export default NotFound;