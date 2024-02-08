import Image from "next/image";
import leftarrow from './svg/leftarrow.svg';
import rightarrow from './svg/rightarrow.svg';
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext } from "react";

type MiddlePanelProps = {
  handleCard: (method: 'increase' | 'decrease', byAutoPlay: boolean) => void;
}

const MiddlePanel = ({ handleCard } : MiddlePanelProps) => {
  const { actualCard, flashcards } = useContext(GameContext);
  
  return (
    <div className='flex gap-3 sm:gap-6 grow justify-center'>
      <button
        type="button"
        onClick={() => handleCard('decrease', false)}
        disabled={actualCard === 0}
      >
        <Image src={leftarrow} width={18} height={18} alt="leftarrow" />
      </button>
      <p className='font-black text-lg'>{actualCard + 1} / {flashcards.length}</p>
      <button
        type="button"
        onClick={() => handleCard('increase', false)}
        disabled={actualCard === flashcards.length - 1}
      >
        <Image src={rightarrow} width={18} height={18} alt="rightarrow" />
      </button>
    </div>
  )
}

export default MiddlePanel;