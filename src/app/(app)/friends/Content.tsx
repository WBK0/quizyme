"use client";
import EasySpinner from "@/components/Loading/EasySpinner";
import Spinner from "@/components/Loading/Spinner";
import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/UserCard";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

type Users = {
  id: number;
  name: string;
  username: string;
  image: string;
  isFollowing: boolean;
}[] | null;

const Content = () => {
  const [users, setUsers] = useState<Users>(null);
  const [loading, setLoading] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null); 

  const step = 20;

  const getMoreUsers = async (skip: number) => {
    try {
      if(loading) return;
      if(isScrollEnd) return;

      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users?skip=${skip}&limit=${step}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setUsers((prev) => prev && prev.concat(json.data));

      if(json.data.length < step){
        setIsScrollEnd(true);
      }

      setLoading(false);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    }
  }

  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users?limit=${step}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      if(json.data.length < step){
        setIsScrollEnd(true);
      }

      setUsers(json.data);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if(mainRef.current && users){
        if(Number((mainRef.current.scrollTop + mainRef.current.clientHeight + 1).toFixed(0)) >= mainRef.current.scrollHeight){
          getMoreUsers(users.length)
        }
      }
    }

    if(mainRef.current && mainRef.current.scrollHeight <= mainRef.current.clientHeight && users){
      getMoreUsers(users.length)  
    }

    mainRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      mainRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [users, mainRef.current])

  useEffect(() => {
    getUsers();
  }, []);

  const handleFollow = async (id: number) => {
    try {
      setUsers((prev) => prev && prev.map((user: any) => {
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
        users ? 
        <div className="overflow-y-auto scroll-sm sm:px-2.5 pr-2 h-[620px]" ref={mainRef}>
          {users.map((user: any) => (
            <UserCard
              key={user.id}
              username={user.username}
              name={user.name}
              image={user.image}
              isFollowing={user.isFollowing}
              handleFollow={() => handleFollow(user.id)}
            />
          ))}
      
          {
            isScrollEnd ?
              <h6 className="uppercase font-black mt-24 text-center max-w-xl text-xl mx-auto">
                We couldn't find any more accounts matching your search 
              </h6> 
            : <div className="w-full flex justify-center mt-4 pb-2">
                <EasySpinner size={8} />
              </div>
          }
            
        </div>
        : <div className="w-full flex justify-center pt-24">
            <Spinner />
          </div>
      }

          
    </div>
  )
}

export default Content;