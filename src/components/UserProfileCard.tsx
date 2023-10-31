import Image from "next/image";
import userPhoto from '@/public/userPhoto.svg';

type UserProps = {
  fullname: string;
  username: string;
}

const UserProfileCard = ({ fullname, username } : UserProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={userPhoto} alt="user image" width={96} height={96} />
      <p className="font-bold text-2xl mt-4 mb-2">{fullname}</p>
      <p className="text-sm font-semibold text-gray-400">@{username}</p>
    </div>
  )
}
export default UserProfileCard;