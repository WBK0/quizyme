import Spinner from "@/components/Loading/Spinner";
import Searchbar from "@/components/Searchbar";
import UserCard from "@/components/UserCard";
import userPhoto1 from '@/public/userPhoto1.png';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import updateFollowers from "./updateFollowers";

type FollowingModalProps = {
  handleCloseModal: () => void;
  variant: 'following' | 'followers';
  userId: string;
}

type UserData = {
  id: string;
  name: string;
  username: string;
  image: string;
  isFollowing: boolean;
  userId: string;
}[] | null;

const FollowingModal = ({ handleCloseModal, variant, userId } : FollowingModalProps) => {
  const [data, setData] = useState<UserData>(null);
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
  const session = useSession();

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/follows/${userId}`);

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setData(json.data[variant]);
    } catch (error) {
      toast.error('An error occurred while trying to get the data.', {
        toastId: 'followingModalError'
      })
      handleCloseModal();
    }
    setIsSubmitting(null);
  }

  const handleFollow = async (userId : string) => {
    try {
      if(isSubmitting === userId){
        throw new Error('Please wait a moment until your request.')
      }
      setIsSubmitting(userId);

      if(!session.data?.user.id){
        throw new Error('You must be logged in to follow someone.')
      }else if(session.data?.user.id === userId){
        throw new Error('You cannot follow yourself.')
      }

      setData(prevState => {
        if(prevState){
          return prevState.map(user => {
            if(user.userId === userId){
              return {
                ...user,
                isFollowing: !user.isFollowing
              }
            }
            return user;
          })
        }
        return null;
      })

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
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
    }
    updateFollowers();
    getData();
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-4xl h-full max-h-[600px] relative rounded-2xl">
          <button className="absolute right-3 top-3 text-2xl font-black" onClick={handleCloseModal}>X</button>
          <div className="flex flex-col pt-10 items-center h-full px-3">
            <h2 className="font-bold text-center text-2xl uppercase">{variant}</h2>
            <div className="mt-8 max-w-2xl w-full">
              <Searchbar />
            </div>
            {
              data 
              ? <div className="overflow-y-auto w-full mb-6 mt-6 pr-3 scroll-sm">
                  <div className="max-w-2xl mx-auto">  
                    {
                      data.length > 0 ?
                        data.map((user, index) => (
                          <UserCard 
                            key={index} 
                            image={user.image} 
                            name={user.name}
                            username={user.username} 
                            isFollowing={user.isFollowing} 
                            handleFollow={() => handleFollow(user.userId)}
                          />
                        ))
                      : <h2 className="text-center font-bold text-xl mt-4">
                          {variant === 'following' ? 'This user is not following anyone yet.' : 'This user has no followers yet.'}
                        </h2>
                    }   
                  </div>
                </div>
              : <div className="flex justify-center items-center w-full h-full pb-12">
                  <Spinner />
                </div>
            }   
          </div> 
        </div>
      </div>
    </div>
  )
}
export default FollowingModal;