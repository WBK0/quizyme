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

  const getFriends = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/friends`);

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setFriends(json.data);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message || 'An error occurred while trying to get the data.');
    }
  }

  useEffect(() => {
    getFriends();
    getInvited();
  }, [])

  return (
    <div className="fixed w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center">
      <Content
        setInvited={setInvited}
        type={type}
        studyId={studyId}
        handleClose={handleClose}
        friends={friends}
        invited={invited}
      />
    </div>
  )
}

export default Share;