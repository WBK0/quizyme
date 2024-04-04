"use client";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Search from "./Search";
import Users from "./Users";
import { Session } from "next-auth";

type Users = {
  id: string;
  name: string;
  username: string;
  image: string;
  isFollowing: boolean | null;
}[] | null;

const Content = ({ session } : { session: Session | null }) => {
  const [users, setUsers] = useState<Users>(null);
  const [loading, setLoading] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');

  const step = 20;

  const getUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users?limit=${step}&search=${search}`, {
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
    } finally {
      setDisplay(true);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if(!display){
      return;
    }
    const timeout = setTimeout(() => {
      setUsers(null);
      getUsers();
    }, 700)

    return () => {
      clearTimeout(timeout);
    }
  }, [search])

  return (
    <div className="w-full">
      <Search search={search} setSearch={setSearch} />
      <h2 className="font-black text-2xl w-full text-left mt-14 mb-2">You may know</h2>
      {
        users ? 
          <Users 
            users={users} 
            setUsers={setUsers} 
            setLoading={setLoading} 
            loading={loading} 
            step={step} 
            search={search}
            isScrollEnd={isScrollEnd}
            setIsScrollEnd={setIsScrollEnd}
            session={session}
          />
        : <div className="w-full flex justify-center pt-24">
            <Spinner />
          </div>
      }    
    </div>
  )
}

export default Content;