import Image from "next/image";
import logo from '@/public/logo.svg';
import Link from "next/link";
import Form from "./Form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoginViaProvider from "./LoginViaProvider";
import ErrorOnLogin from "./ErrorOnLogin";

const Login = async ({ searchParams } : { searchParams: { error?: string, callbackUrl?: string }}) => {
  const session = await getServerSession(authOptions);

  if(session?.user){
    redirect('/');
  }

  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4">
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Login</h1>
      <LoginViaProvider />
      <h2 className="text-center font-black my-2">OR</h2>
      <Form 
        callbackUrl={searchParams?.callbackUrl}
      />
      <Link 
        href="/auth/register"
        className="text-center font-bold text-sm text-gray-500 hover:text-black"
      >
        Do not have an account? Register!
      </Link>
      {
        searchParams.error
        ? <ErrorOnLogin error={searchParams.error} />
        : null
      }
    </div>
  )
}
export default Login;