import LeftPanel from "./LeftPanel";
import MiddlePanel from "./MiddlePanel";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext, useEffect } from "react";
import { handlePlay } from "../../mainPage/Playground/panel/autoPlay";
import { toast } from "react-toastify";
import { updateGameData } from "@/providers/play-flashcards/updateGameData";
import RightPanel from "./RightPanel";

const Panel = () => {
  const { actualCard, flashcards, autoPlay, setActualCard, setAnimate, id, setAutoPlay, cardRef, flipCard } = useContext(GameContext)

  const handleCard = (method : 'increase' | 'decrease', byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to change the card manually')
      return;
    }

    if(method === 'increase') {
      if(actualCard < flashcards.length - 1) {
        setActualCard((prev) => prev + 1)
        setAnimate('left');
        updateGameData({ id, actualFlashcard: actualCard + 1})
      }
    } else {
      if(actualCard > 0) {
        setActualCard((prev) => prev - 1);
        setAnimate('right');
        updateGameData({ id, actualFlashcard: actualCard - 1})
      }
    }
  }
  
  useEffect(() => {
    if(!autoPlay) return;

    const interval = setInterval(() => {
      handlePlay({ setAutoPlay, cardRef, actualCard, flashcards, handleCard, flipCard });
    }, 5000)
    
    return () => clearInterval(interval);
  }, [autoPlay, actualCard])

  return (
    <div className="px-3 flex justify-between py-3.5 pb-24">
      <LeftPanel />
      <MiddlePanel />
      <RightPanel />
    </div>
  )
}

export default Panel;