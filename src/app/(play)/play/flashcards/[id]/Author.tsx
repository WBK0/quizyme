"use client";
import UserCard from "@/components/UserCard";

type AuthorProps = {
  user: {
    image: string,
    name: string,
    username: string
  }
}

const Author = ({ user } : AuthorProps) => {
  return (
    <div className="mt-20">
      <UserCard 
        image={user.image}
        name={user.name}
        username={user.username}
        isFollowing={true}
        handleFollow={() => {console.log('Followed')}}
        handleShare={() => {console.log('Shared')}}
      />
    </div>
  )
}

export default Author;