import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FollowButton = ({ userId } : { userId: string }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(true);

  const session = useSession();

  const getFollowing = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${userId}/isFollowing`);

    const json = await response.json();

    setIsFollowing(json.isFollowing);
    setIsSubmitting(false);
  }

  const handleFollow = async () => {
    try {
      if(isSubmitting){
        toast.error('Please wait a moment until your request.')  
        return;
      };
      setIsFollowing(!isFollowing);
      setIsSubmitting(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${userId}/follow`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const json = await response.json();
  
      if(!response.ok){
        throw new Error(json.message);
      }

      getFollowing();

    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
      getFollowing();
    }
  }

  useEffect(() => {
    getFollowing()
  }, [userId])

  return (
    <div className="w-full flex mt-6">
      <button
        type="button"
        className={`${isFollowing ? 'bg-white text-black hover:text-white hover:bg-black' : 'bg-black text-white hover:text-black hover:bg-white'} rounded-full mx-auto w-40 py-1 font-bold ring-2 ring-black hover:duration-300 cursor-pointer`}
        onClick={handleFollow}
        disabled={!session.data?.user}
      >
        {
          isFollowing ? 'UNFOLLOW' : 'FOLLOW'
        }
      </button>
    </div>
  )
}

export default FollowButton;