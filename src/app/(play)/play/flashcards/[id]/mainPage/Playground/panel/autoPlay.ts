import { updateGameData } from "@/providers/play-flashcards/updateGameData";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

type HandlePlayProps = {
  cardRef: React.MutableRefObject<HTMLDivElement | null>;
  actualCard: number;
  flashcards: { id: string, concept: string, definition: string }[];
  handleCard: (method: 'increase' | 'decrease', byAutoPlay: boolean) => void;
  flipCard: (byAutoPlay: boolean) => void;
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  fullscreen?: boolean;
  setIsEnded: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  session: Session | null;
}

type HandleStartProps = {
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
  actualCard: number;
  flashcards: { id: string, concept: string, definition: string }[];
}

type HandlePauseProps = {
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handlePlay = ({ cardRef, actualCard, flashcards, handleCard, flipCard, setAutoPlay, fullscreen = false, setIsEnded, id, session } : HandlePlayProps) => {  
  if(cardRef.current?.classList.contains('rotate')) {
    if(actualCard === flashcards.length - 1){
      if(fullscreen){
        setIsEnded(true);
        updateGameData({id, isEnded: true, session });
      }

      handlePause({ setAutoPlay });
      return;
    }
    handleCard('increase', true);
  }else{
    flipCard(true);
  }
}

export const handleStart = ({ setAutoPlay, actualCard, flashcards } : HandleStartProps) => {
  if(actualCard + 1 === flashcards.length){
    toast.error(`You can't start the auto play from the last card`);
    return;
  }

  toast.info('Auto play started', {
    hideProgressBar: true,
    autoClose: 1500
  });

  setAutoPlay(true);
}

export const handlePause = ({ setAutoPlay } : HandlePauseProps) => {
  toast.info('Auto play paused', {
    hideProgressBar: true,
    autoClose: 1500
  });

  setAutoPlay(false);
}