"use client";
import { useEffect, useState } from "react";
import Searchbar from "../Searchbar";
import Image from "next/image";
import { toast } from "react-toastify";
import Spinner from "../Loading/Spinner";
import EasySpinner from "../Loading/EasySpinner";

type Friends = {
  id: string;
  name: string;
  username: string;
  image: string;
}[] | null;

type ShareProps = {
  handleClose: () => void;
  type: 'flashcards' | 'quiz';
  studyId: string;
}

type IsSharing = {
  [id: string]: boolean;
}[]

const Share = ({ handleClose, type, studyId } : ShareProps) => {
  const [friends, setFriends] = useState<Friends>(null);
  const [isSharing, setIsSharing] = useState<IsSharing>([]);
  const [invited, setInvited] = useState<string[] | null>(null);

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

  const handleShare = async (inviteeId : string) => {
    if(isSharing.some((item) => item[inviteeId])){
      return;
    }

    try {
      setIsSharing(prev => [...prev, { [inviteeId]: true }]);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/friends/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          type: type,
          studyId: studyId,
          inviteeId: inviteeId
        })
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setInvited(prev => prev ? [...prev, inviteeId] : [inviteeId])
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message || 'An error occurred while trying to invite friends.');
    } finally{
      setIsSharing(prev => prev.filter(item => !item[inviteeId]));
    }
  }

  useEffect(() => {
    getFriends();
    getInvited();
  }, [])

  return (
    <div className="fixed w-full h-screen bg-black/50 top-0 left-0 z-50 flex justify-center items-center">
      <div className="bg-white w-full max-w-4xl rounded-2xl relative max-h-[600px] h-full px-2 sm:px-3">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-2 text-2xl font-black"
        >
          X
        </button>
        <div className="max-w-2xl mx-auto h-full flex flex-col pb-4">
          <h2 className="w-full text-center font-bold mt-10 text-2xl uppercase">Share to friends</h2>
          <div className="mt-8">
            <Searchbar />
          </div>
          <div className="overflow-y-auto scroll-sm pr-2 sm:pl-2 h-full flex flex-col gap-4 mt-6">
            {
              !friends || !invited ? 
                <div className="flex justify-center h-full items-center pb-12">
                  <Spinner />
                </div>
              :
                friends.length > 0 ? friends.map((friend) => (
                  <div className="flex w-full items-center" key={friend.id}>
                    <Image src={friend.image} alt="User photo" width={64} height={64} className="rounded-full h-16" />
                    <div className="flex flex-col justify-center ml-3">
                      <p className="font-bold text-sm sm:text-lg mr-2">{friend.name}</p>
                      <p className="font-light text-xs break-all mr-2">@{friend.username}</p>
                    </div>
                    <div className="flex-1 flex justify-end items-end gap-3 sm:gap-6 flex-col sm:flex-row">
                      {
                        <button 
                          onClick={() => handleShare(friend.id)} 
                          disabled={isSharing.some((item) => item[friend.id]) || invited.includes(friend.id)}
                          className={`w-28 sm:w-40 py-2.5 rounded-full font-bold ring-2 ring-black ${invited.includes(friend.id) ? 'bg-white' : 'bg-black'} ${invited.includes(friend.id) ? 'text-black' : 'text-white'} hover:scale-105 duration-300`}>
                            {
                              isSharing.some((item) => item[friend.id])
                              ? <EasySpinner />
                              : invited.includes(friend.id) ? 'Invited' : 'Share'
                            }
                        </button>
                      }
                    </div>
                  </div>
                ))
                : <p className="text-center font-bold text-xl mt-4">You don't have any friends in quizyme. <span className="block font-black text-base mt-1">To have a friend you both have to follow each other.</span></p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Share;