import Image from "next/image";
import Code from "./Code";
import logo from '@/public/logo.svg';
import Content from "./Content";

const PasswordChange = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Image src={logo} alt="logo" width={150} height={150}/>
      <Content />
    </div>
  )
}

export default PasswordChange;