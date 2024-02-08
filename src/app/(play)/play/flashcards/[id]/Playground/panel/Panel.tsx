import Image from "next/image";
import play from './svg/play.svg';
import shuffle from './svg/shuffle.svg';
import leftarrow from './svg/leftarrow.svg';
import rightarrow from './svg/rightarrow.svg';
import fullscreen from './svg/fullscreen.svg';
import pause from './svg/pause.svg';
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { handlePlay, handleStart, handlePause } from "./autoPlay";

const Panel = () => {
  const { actualCard, flashcards, autoPlay, setAutoPlay, setAnimate, setActualCard, setIsShuffled, isShuffled, disableShuffle, enableShuffle, flipCard, cardRef } = useContext(GameContext);

  const handleCard = (method : 'increase' | 'decrease', byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to change the card manually')
      return;
    }

    if(method === 'increase') {
      if(actualCard < flashcards.length - 1) {
        setActualCard((prev) => prev + 1)
        setAnimate('left');
      }
    } else {
      if(actualCard > 0) {
        setActualCard((prev) => prev - 1)
        setAnimate('right');
      }
    }
  }
  
  const handleShuffle = () => {
    if(autoPlay){
      toast.error('Please pause the auto play to shuffle the flashcards')
      return;
    }

    if(isShuffled) {
      setIsShuffled(false);

      disableShuffle();

      toast.info('Disable shuffling', {
        hideProgressBar: true,
        autoClose: 1500
      });
      return;
    }

    toast.info('Enable shuffling', {
      hideProgressBar: true,
      autoClose: 1500
    });

    setIsShuffled(true);

    enableShuffle(Number((Math.random() * 1000).toFixed(0)));
  }

  useEffect(() => {
    if(!autoPlay) return;

    const interval = setInterval(() => {
      handlePlay({ setAutoPlay, cardRef, actualCard, flashcards, handleCard, flipCard });
    }, 5000)
    
    return () => clearInterval(interval);
  }, [autoPlay, actualCard])

  return (
    <div className="px-3 flex justify-between py-2.5">
      <div className='flex gap-3 flex-1 justify-start'>
        <button
          type="button"
          onClick={() => autoPlay ? handlePause({ setAutoPlay }) : handleStart({ setAutoPlay, flashcards, actualCard })}
        >
          {
            autoPlay
            ? <Image src={pause} width={14} alt="pause" />
            : <Image src={play} width={14} alt="play" />
          }
        </button>
        <button
          type="button"
          onClick={() => handleShuffle()}
        >
          <Image src={shuffle} width={18} height={18} alt="shuffle" />
        </button>
      </div>
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
      <div className='flex gap-2 flex-1 justify-end'>
        <button>
          <Image src={fullscreen} width={18} height={18} alt="fullscreen" />
        </button>
      </div>
    </div>
  )
}

export default Panel;