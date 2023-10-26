import Button from "@/components/Button";
import Image from "next/image";

type CreatorProps = {
  user: {
    image: any;
    fullname: string;
    username: string;
  }
}

const Creator = ({ user } : CreatorProps) => {
  return (
    <div className="flex mt-16 mx-auto max-w-2xl justify-between flex-col sm:flex-row">
      <div className="flex gap-4 items-center">
        <Image src={user.image} alt='user image' width={50} height={50} className="rounded-full" />
        <div className="flex flex-col">
          <p className="font-bold">{user.fullname}</p>
          <p className="text-gray-300 text-sm">@{user.username}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-5 sm:mt-0">
        <button className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md sm:px-12">
          SHARE
        </button>
        <button className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md sm:px-12">
          Follow
        </button>
      </div>
    </div>
  )
}
export default Creator;