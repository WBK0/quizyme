"use client";
import Image from "next/image";
import flashcardsIcon from "./flashcards.svg";
import arrowDown from './arrowDown.svg';
import { useContext, useState } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import useUrlParams from "@/hooks/useUrlParams";
import EasySpinner from "@/components/Loading/EasySpinner";

const Heading = () => {
  const [loading, setLoading] = useState(false);
  const { actualCard, flashcards } = useContext(GameContext);

  const { changeParam } = useUrlParams()

  const handleQuit = () => {
    setLoading(true);
    changeParam('fullscreen', 'false');
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between px-3 sm:px-6 py-2 flex-wrap sm:flex-nowrap">
        <div className="flex-1 flex items-center gap-2 sm:gap-3 order-1">
          <Image src={flashcardsIcon} width={38} height={38} alt="Flashcards icon" />
          <p className="font-extrabold">Flashcards</p>
          <Image src={arrowDown} width={14} height={14} alt="Arrow down" />
        </div>
        <div className="flex justify-center items-center order-last sm:order-2 mt-2 sm:mt-0 w-full sm:w-fit">
          <p className="font-black text-lg">{actualCard + 1} / {flashcards.length}</p>
        </div>
        <div className="flex-1 flex justify-end order-3">
          <button 
            className="bg-red rounded-full py-1.5 sm:py-2 w-24 sm:w-32 text-white font-bold duration-300 hover:scale-105"
            onClick={handleQuit}
          >
            {
              !loading 
                ? 'QUIT'
                : <EasySpinner />
            }
          </button>
        </div>
      </div>
      <div className="h-1 bg-blue duration-500" style={{width: (actualCard) * 100 / (flashcards.length - 1) + "%"}} />
    </div>
  )
}
export default Heading