import { useEffect, useRef } from "react";
import Searchbar from "../Searchbar";
import Spinner from "../Loading/Spinner";
import FriendCard from "./FriendCard";

type ContentProps = {
  setInvited: React.Dispatch<React.SetStateAction<string[] | null>>;
  type: 'flashcards' | 'quiz';
  studyId: string;
  handleClose: () => void;
  friends: {
    id: string;
    name: string;
    image: string;
    username: string;
  }[] | null;
  invited: string[] | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  getFriends: (skip: number) => Promise<void>;
  loading: boolean;
  isAll: boolean;
}

const Content = ({ setInvited, type, studyId, handleClose, friends, invited, setSearch, search, getFriends, loading, isAll } : ContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(loading) return;
    if(isAll) return;

    const handleScroll = () => {
      if(containerRef.current){
        if(Math.ceil(containerRef.current.scrollTop + containerRef.current.clientHeight) >= containerRef.current.scrollHeight){
          getFriends(friends?.length || 0);
        }
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef.current, loading])

  return (
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
          <Searchbar 
            value={search}
            onChange={setSearch}
          />
        </div>
        <div className="overflow-y-auto scroll-sm pr-2 sm:pl-2 h-full flex flex-col gap-4 mt-6" ref={containerRef}>
          {
            !friends || !invited ? 
              <div className="flex justify-center h-full items-center pb-12">
                <Spinner />
              </div>
            :
              friends.length > 0 ? friends.map((friend) => (
                <>
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                    type={type}
                    studyId={studyId}
                    setInvited={setInvited}
                    invited={invited}
                  />
                </>
              ))
              : <p className="text-center font-bold text-xl mt-4">You don't have any friends in quizyme matching this search. <span className="block font-black text-base mt-1">To have a friend you both have to follow each other.</span></p>
          }
          {
            isAll
            ? <p className="text-center font-bold text-xl mt-4">
                You don't have any more friends to invite
              </p>
            : null
          }
        </div>
      </div>
    </div>
  )
}

export default Content;