import { getServerSession } from "next-auth";
import Actions from "./Actions";
import Content from "./Content";
import Logo from "./Logo";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="px-3 fixed w-full bg-white z-30">
      <div className="container flex mx-auto h-16 items-center">
        <Logo />
        <Content />
        <Actions session={session} />
      </div>
    </div>
  )
}
export default Navbar;