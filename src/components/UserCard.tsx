import Button from "./Button"
import Image from "next/image"

type UserCardProps = {
  image: string;
  username: string;
  name: string;
  isFollowing?: boolean;
}

const UserCard = ({ image, name, username, isFollowing } : UserCardProps) => {
  console.log(image)
  return (
    <div className="flex w-full mt-6">
      <Image src={image} alt="User photo" width={64} height={64} className="rounded-full" />
      <div className="flex flex-col justify-center ml-3">
        <p className="font-bold text-sm sm:text-lg">{name}</p>
        <p className="font-light text-xs">@{username}</p>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <div className="flex justify-end w-28 sm:w-56">
          <Button variant={isFollowing ? 'light' : 'dark'} disablePadding={true}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>  
      </div>
    </div>
  )
}

export default UserCard;