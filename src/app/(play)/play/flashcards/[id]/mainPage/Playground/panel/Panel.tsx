import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { handlePlay } from "./autoPlay";
import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import RightPanel from "./RightPanel";
import { updateGameData } from "@/providers/play-flashcards/updateGameData";
import { useSession } from "next-auth/react";

const Panel = () => {
  const { actualCard, flashcards, autoPlay, setAutoPlay, flipCard, cardRef, setActualCard, setAnimate, id, setIsEnded } = useContext(GameContext);
  const { data: session } = useSession();

  const handleCard = (method : 'increase' | 'decrease', byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to change the card manually')
      return;
    }

    if(method === 'increase') {
      if(actualCard < flashcards.length - 1) {
        setActualCard((prev) => prev + 1)
        setAnimate('left');
        updateGameData({ id, actualFlashcard: actualCard + 1, session})
      }
    } else {
      if(actualCard > 0) {
        setActualCard((prev) => prev - 1);
        setAnimate('right');
        updateGameData({ id, actualFlashcard: actualCard - 1, session})
      }
    }
  }
  
  useEffect(() => {
    if(!autoPlay) return;

    const interval = setInterval(() => {
      handlePlay({ setAutoPlay, cardRef, actualCard, flashcards, handleCard, flipCard, fullscreen: false, setIsEnded, id, session });
    }, 5000)
    
    return () => clearInterval(interval);
  }, [autoPlay, actualCard])

  return (
    <div className="px-3 flex justify-between py-2.5">
      <LeftPanel />
      <MiddlePanel
        handleCard={handleCard}
      />
      <RightPanel />
    </div>
  )
}

export default Panel;