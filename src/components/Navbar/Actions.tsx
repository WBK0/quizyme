import Image from "next/image";
import bell from '../../public/bell.svg';
import person from '../../public/person.svg';

const Actions = () => {
  return (
    <div className="flex gap-3 flex-1 justify-end hidden md:flex">
      <Image src={bell} height={20} alt="Notifications center" className="cursor-pointer" />
      <Image src={person} height={20} alt="User profile" className="cursor-pointer" />
    </div>
  )
}
export default Actions;