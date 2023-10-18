import Actions from "./Actions";
import Content from "./Content";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <div className="h-16 container mx-auto flex items-center px-3">
      <Logo />
      <Content />
      <Actions />
    </div>
  )
}
export default Navbar;