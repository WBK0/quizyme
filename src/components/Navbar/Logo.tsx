import Image from "next/image";
import logo from '../../public/logo.svg'
import Link from "next/link";

const Logo = () => {
  return (
    <Link className="flex-1" href="/">
      <Image src={logo} height={48} width={48} alt="Website logo" />
    </Link>
  )
}
export default Logo;