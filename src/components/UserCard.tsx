import Image from "next/image"
import EasySpinner from "./Loading/EasySpinner";
import Link from "next/link";

type UserCardProps = {
  image: string;
  username: string;
  name: string;
  isFollowing: boolean | null;
  handleFollow: () => void;
  handleShare?: () => void;
}

const UserCard = ({ image, name, username, isFollowing, handleFollow, handleShare } : UserCardProps) => {
  return (
    <div className="flex w-full mt-6 items-center">
      <Link href={`/profile/${username}`} className="flex">
        <Image src={image} alt="User photo" width={64} height={64} className="rounded-full h-16" />
        <div className="flex flex-col justify-center ml-3">
          <p className="font-bold text-sm sm:text-lg mr-2">{name}</p>
          <p className="font-light text-xs break-all mr-2">@{username}</p>
        </div>
      </Link>
      <div className="flex-1 flex justify-end items-end gap-3 sm:gap-6 flex-col sm:flex-row">
        {
          handleShare 
          ? <button onClick={handleShare} className="w-28 sm:w-40 py-2.5 rounded-full font-bold ring-2 ring-black bg-black text-white hover:scale-105 duration-300">Share</button>
          : null
        }
        <button 
          className={`w-28 sm:w-40 py-2.5 rounded-full font-bold ring-2 ring-black ${isFollowing ? 'bg-white text-black' : 'bg-black text-white'} hover:scale-105 duration-300`} 
          onClick={handleFollow}
        >
          {
            isFollowing === null ? <EasySpinner />
          :
            isFollowing ? 'Unfollow' : 'Follow'
          }
        </button>
      </div>
    </div>
  )
}

export default UserCard;