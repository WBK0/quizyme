"use client";
import UserCard from "@/components/UserCard";

const Author = () => {
  return (
    <div className="mt-20">
      <UserCard 
        image="http://localhost:3100/defaultPicture.png"
        name="John Doe"
        username="johndoe"
        isFollowing={true}
        handleFollow={() => {console.log('Followed')}}
        handleShare={() => {console.log('Shared')}}
      />
    </div>
  )
}

export default Author;