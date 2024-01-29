import Button from "./Button"
import Image from "next/image"

type UserCardProps = {
  image: string;
  username: string;
  name: string;
  isFollowing?: boolean;
  handleFollow: () => void;
}

const UserCard = ({ image, name, username, isFollowing, handleFollow } : UserCardProps) => {
  return (
    <div className="flex w-full mt-6">
      <Image src={image} alt="User photo" width={64} height={64} className="rounded-full" />
      <div className="flex flex-col justify-center ml-3">
        <p className="font-bold text-sm sm:text-lg mr-2">{name}</p>
        <p className="font-light text-xs break-all mr-2">@{username}</p>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <button className={`w-28 sm:w-40 py-2.5 rounded-full font-bold ring-2 ring-black ${isFollowing ? 'bg-white text-black' : 'bg-black text-white'} hover:scale-105 duration-300`} onClick={handleFollow}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  )
}

export default UserCard;