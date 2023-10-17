import Image from "next/image";
import logo from '../../public/logo.svg'

const Logo = () => {
  return (
    <div className="flex-1">
      <Image src={logo} height={48} width={48} alt="Website logo" />
    </div>
  )
}
export default Logo;