import Image from "next/image";
import logo from '@/public/logo.svg';
import Link from "next/link";
import Form from "./Form";


const Register = () => {


  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4">
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Register</h1>
      <Form />
      <Link 
        href="/auth/login"
        className="text-center font-bold text-sm text-gray-500 hover:text-black"
      >
        Have an account? Login now!
      </Link>
    </div>
  )
}
export default Register;