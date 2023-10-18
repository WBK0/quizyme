import Actions from "./Actions";
import Content from "./Content";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="px-3 fixed w-full bg-white z-20">
      <div className="container flex mx-auto h-16 items-center">
        <Logo />
        <Content />
        <Actions />
      </div>
    </div>
  )
}
export default Navbar;