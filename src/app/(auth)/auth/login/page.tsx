import Image from "next/image";
import logo from '@/public/logo.svg';
import google from '@/public/google.svg';
import github from '@/public/github.svg';
import Link from "next/link";

const Login = () => {
  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4">
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Login</h1>
      <div className="mt-4">
        <button className="bg-white text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mb-3 font-bold relative h-10">
          <i className="absolute left-5 top-1">
            <Image src={google} width={32} height={32} alt="google" />
          </i>
          <span>Login with Google</span>
        </button>
        <button className="bg-white text-black rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full font-bold relative h-10">
          <i className="absolute left-5 top-1">
            <Image src={github} width={32} height={32} alt="google" />
          </i>
          <span>Login with Github</span>
        </button>
      </div>
      <h2 className="text-center font-black my-2">OR</h2>
      <div className="flex flex-col gap-5">
        <input 
          type="text"
          placeholder="Email"
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-lightblue"
        />
        <input 
          type="password"
          placeholder="Password"
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-lightblue"
        />
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white"
        >
          Login
        </button>
      </div>
      <Link 
        href="/auth/register"
        className="text-center font-bold text-sm text-gray-500 hover:text-black"
      >
        Don't have an account? Register!
      </Link>
    </div>
  )
}
export default Login;