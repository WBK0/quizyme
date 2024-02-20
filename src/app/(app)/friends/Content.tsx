"use client";
import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/UserCard";
import { useState } from "react";
import { toast } from "react-toastify";

const Content = ({ data } : { data: any }) => {
  const [users, setUsers] = useState<any>(data);

  const handleFollow = async (id: number) => {
    try {
      setUsers(users.map((user: any) => {
        if(user.id === id){
          return {
            ...user,
            isFollowing: !user.isFollowing
          }
        }
        return user;
      }));

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${id}/follow`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
  
      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    } 
  }

  return (
    <div className="w-full">
      <Searchbar />
      <h2 className="font-black text-2xl w-full text-left mt-14 mb-2">You may know</h2>
      {
        users.map((user: any) => (
          <UserCard
            key={user.id}
            username={user.username}
            name={user.name}
            image={user.image}
            isFollowing={user.isFollowing}
            handleFollow={() => handleFollow(user.id)}
          />
        ))
      }

      <h6 className="uppercase font-black mt-24 text-center max-w-xl text-xl mx-auto">
        We couldn't find any more accounts matching your search 
      </h6>      
    </div>
  )
}

export default Content;