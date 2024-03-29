"use client";
import Share from "@/components/ShareModal/Share";
import UserCard from "@/components/UserCard";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type CreatorProps = {
  user: {
    id: string;
    image: any;
    name: string;
    username: string;
  },
  type: 'flashcards' | 'quiz',
  studyId: string;
  session: Session | null;
}

const Creator = ({ user, type, studyId, session } : CreatorProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [shareModal, setShareModal] = useState<boolean>(false);

  const handleShare = () => {
    if(!session){
      toast.error('You need to be logged in to share the study.');
      return;
    }
    
    setShareModal(true);
  }

  const handleFollow = async () => {
    try {
      if(!session){
        toast.error('You need to be logged in to follow a user.');
        return;
      }

      if(session?.user?.id === user.id){
        toast.error('You cannot follow yourself.');
        return;
      }

      if(isFollowing === null){
        return;
      }

      setIsFollowing(null);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${user.id}/follow`, {
        method: 'PATCH'
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      setIsFollowing(data.message === 'Unfollowed' ? false : true);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message || 'An error occurred while trying to follow the user.');

      getFollowStatus();
    }
  }

  const getFollowStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${user.id}/isFollowing`)
      const data = await response.json();

      setIsFollowing(data.isFollowing);
    } catch (error) {
      setIsFollowing(false);
    }
  }

  useEffect(() => {
    getFollowStatus();
  }, [])

  return (
    <div className="flex mt-16 mx-auto max-w-3xl justify-between flex-col sm:flex-row">
      <UserCard
        image={user.image}
        username={user.username}
        name={user.name}
        isFollowing={isFollowing}
        handleFollow={handleFollow}
        handleShare={handleShare}
      />
      {
        shareModal
        ? <Share 
            handleClose={() => setShareModal(false)}
            type={type}
            studyId={studyId}
          />
        : null
      }
    </div>
  )
}
export default Creator;