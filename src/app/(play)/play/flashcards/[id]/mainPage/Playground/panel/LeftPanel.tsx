import Image from 'next/image';
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext } from "react";
import { toast } from "react-toastify";
import play from './svg/play.svg';
import shuffle from './svg/shuffle.svg';
import pause from './svg/pause.svg';
import { handlePause, handleStart } from './autoPlay';

const LeftPanel = () => {
  const { actualCard, flashcards, autoPlay, setAutoPlay, isShuffled, disableShuffle, setIsShuffled, enableShuffle } = useContext(GameContext);

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

  return (
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
  )
}

export default LeftPanel;