import Image from "next/image";
import logo from '@/public/logo.svg';
import Link from "next/link";
import github from '@/public/github.svg';
import linkedin from '@/public/linkedin.svg';

const Footer = () => {
  return (
    <div className="mt-40 flex items-center flex-col container mx-auto px-3">
      <Image src={logo} alt="Logo" width={100} height={100} />
      <h6 className="font-bold text-gray-500 mt-6 text-center">
        Quizyme is an educational project dedicated to expanding knowledge and promoting learning. Join us in our quest for knowledge!
      </h6>
      <div className="pt-5 pb-6 flex gap-5">
        <Link href="https://github.com/WBK0" target="_blank" className="hover:scale-110 duration-300">
          <Image src={github} alt="Github logo" width={40} height={40} />
        </Link>
        <Link href="https://www.linkedin.com/in/bart%C5%82omiej-ostojski-625b83246/" target="_blank" className="hover:scale-110 duration-300">
          <Image src={linkedin} alt="Github logo" width={40} height={40} />
        </Link>  
      </div>
    </div>
  )
}
export default Footer;