"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Content from "./Content";

type ShareProps = {
  handleClose: () => void;
  type: 'flashcards' | 'quiz';
  studyId: string;
}

type Friends = {
  id: string;
  name: string;
  image: string;
  username: string;
}[] | null;

const Share = ({ handleClose, type, studyId } : ShareProps) => {
  const [invited, setInvited] = useState<string[] | null>(null);
  const [friends, setFriends] = useState<Friends>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);

  const step = 10;

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        handleClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
          handleClose();
        }
      });
    }
  }, [])

  const getInvited = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/friends/invited/${studyId}`);

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setInvited(json.data);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message || 'An error occurred while trying to get the data.');
    }
  }

  const getFriends = async (skip: number) => {
    setLoading(true);
    if(search !== ''){
      setIsSearched(true);
    }else{
      setIsSearched(false);
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/friends?skip=${skip}&limit=${step}&search=${search}`);

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      if(skip === 0){
        setFriends(json.data);
      }else{
        setFriends((prev) => prev && [...prev, ...json.data])
      }

      if(json.data.length < step){
        setIsAll(true);
      }
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message || 'An error occurred while trying to get the data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFriends(0);
    getInvited();
  }, [])

  useEffect(() => {
    if(!friends) return;

    const timeout = setTimeout(() => {
      setFriends(null);
      setIsAll(false);
      getFriends(0)
    }, 700)

    return () => {
      clearTimeout(timeout);
    }
  }, [search])

  return (
    <div className="fixed w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center">
      <Content
        setInvited={setInvited}
        type={type}
        studyId={studyId}
        handleClose={handleClose}
        friends={friends}
        invited={invited}
        search={search}
        setSearch={setSearch}
        getFriends={getFriends}
        loading={loading}
        isAll={isAll}
        isSearched={isSearched}
      />
    </div>
  )
}

export default Share;