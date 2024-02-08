"use client";
import Image from "next/image";
import heart from './heart.svg';
import heartfill from './heartfill.svg';
import { useContext, useEffect, useState } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { updateGameData } from "@/providers/play-flashcards/updateGameData";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const ConceptList = () => {
  const { flashcards, id, gameLikedIds } = useContext(GameContext);
  const [likedIds, setLikedIds] = useState<string[]>(gameLikedIds || []);

  const session = useSession();

  const handleLike = (cardId : string) => {
    if(!session.data){
      toast.error('Please sign in to like the flashcards');
      return;
    }

    if(likedIds.includes(cardId)) {
      setLikedIds((prev) => prev.filter((item) => item !== cardId))
    } else {
      setLikedIds((prev) => [...prev, cardId])
    }
  }

  useEffect(() => {
    updateGameData({ id, likedIds });
  }, [likedIds])

  return (
    <div className="px-3 h-full">
      <h3 className="font-black text-xl mb-12">
        List of concepts in this set
      </h3>
      <div className="flex flex-col gap-2">
        {
          flashcards.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row justify-between py-2.5 bg-yellow rounded-2xl px-4 h-full">
              <div className="font-bold text-lg w-full sm:w-1/2 md:w-2/6 py-2 sm:py-0 border-b-3 sm:border-b-0 sm:border-r-3 border-black flex items-center pr-0 sm:pr-2">
                <span>{item.concept}</span>
              </div>
              <div className="font-medium text-md w-full sm:w-1/2 md:w-4/6 sm:pl-2 py-2 md:py-0 flex items-center justify-between flex-wrap md:flex-nowrap">
                <p className="w-fit pr-3 sm:pl-2 py-2 sm:py-0">{item.definition}</p>
                <button
                  type="button"
                  className="w-8 h-8 ml-auto"
                  onClick={() => handleLike(item.id)}
                >
                  <Image 
                    src={likedIds.includes(item.id) ? heartfill : heart} 
                    alt="Heart icon" 
                    width={32} height={32} 
                  />
                </button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
export default ConceptList