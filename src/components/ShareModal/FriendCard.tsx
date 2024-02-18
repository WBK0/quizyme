import Image from "next/image";
import EasySpinner from "../Loading/EasySpinner";
import { toast } from "react-toastify";
import { useState } from "react";

type IsSharing = {
  [id: string]: boolean;
}[]

type FriendCardProps = {
  friend: {
    id: string;
    name: string;
    image: string;
    username: string;
  };
  type: 'flashcards' | 'quiz';
  studyId: string;
  setInvited: React.Dispatch<React.SetStateAction<string[] | null>>;
  invited: string[] | null;
}

const FriendCard = ({ friend, type, studyId, setInvited, invited } : FriendCardProps) => {
  const [isSharing, setIsSharing] = useState<IsSharing>([]);

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

  return (
    <div className="flex w-full items-center">
      <Image src={friend.image} alt="User photo" width={64} height={64} className="rounded-full h-16" />
      <div className="flex flex-col justify-center ml-3">
        <p className="font-bold text-sm sm:text-lg mr-2">{friend.name}</p>
        <p className="font-light text-xs break-all mr-2">@{friend.username}</p>
      </div>
      <div className="flex-1 flex justify-end items-end gap-3 sm:gap-6 flex-col sm:flex-row">
        {
          invited && 
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
  )
}

export default FriendCard;