"use client"
import Share from "@/components/ShareModal/Share";
import UserCard from "@/components/UserCard";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type AuthorProps = {
  user: {
    id: string,
    image: string,
    name: string,
    username: string
  }
}

const Author = ({ user } : AuthorProps) => {
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const session = useSession();

  const { id } = useContext(GameContext);

  useEffect(() => {
    getFollowStatus();
  }, [])

  const getFollowStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${user.id}/isFollowing`)
      const data = await response.json();

      setIsFollowing(data.isFollowing);
    } catch (error) {
      setIsFollowing(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleClose = () => {
    setShowModal(() => !showModal);
  }

  const handleShare = () => {
    setShowModal(() => !showModal);
  }

  const handleFollow = async () => {
    try {
      if(isSubmitting){
        throw new Error('Please wait a moment before following again.');
      };

      if(session.data?.user?.id === user.id){
        toast.error('You cannot follow yourself.');
        return;
      }

      setIsFollowing(following => !following)
      setIsSubmitting(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${user.id}/follow`, {
        method: 'PATCH'
      })
  
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

    } catch (error: unknown) {
      setIsFollowing(following => !following)
      if(error instanceof Error)
        toast.error(error.message);
    } finally {
      getFollowStatus();
    }
  }

  return (
    <div className="mt-20 pb-24">
      <UserCard 
        image={user.image}
        name={user.name}
        username={user.username}
        isFollowing={isFollowing}
        handleFollow={handleFollow}
        handleShare={handleShare}
      />
      {
        showModal 
        ? <Share 
            handleClose={handleClose}
            type="flashcards"
            studyId={id}
          />
        : null
      }
    </div>
  )
}

export default Author;