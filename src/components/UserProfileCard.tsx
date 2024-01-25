import Image from "next/image";

type UserProps = {
  name: string;
  username: string;
  image: string;
}

const UserProfileCard = ({ name, username, image } : UserProps) => {
  return (
    <div className="flex flex-col items-center">
      <Image src={image} alt="user image" width={96} height={96} className="rounded-full"/>
      <p className="font-bold text-2xl mt-4 mb-2">{name}</p>
      <p className="text-sm font-semibold text-gray-400">@{username}</p>
    </div>
  )
}
export default UserProfileCard;