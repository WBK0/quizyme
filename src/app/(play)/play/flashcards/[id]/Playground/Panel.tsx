import Image from "next/image";
import play from './svg/play.svg';
import shuffle from './svg/shuffle.svg';
import leftarrow from './svg/leftarrow.svg';
import rightarrow from './svg/rightarrow.svg';
import fullscreen from './svg/fullscreen.svg';
import pause from './svg/pause.svg';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type PanelProps = {
  card: number,
  length: number
  setCard: React.Dispatch<React.SetStateAction<number>>,
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>,
  shuffleFlashcards: (seed : number) => void,
  flashcards: {
    concept: string,
    definition: string
  }[],
  disableShuffle: () => void,
  handleShowing: (byAutoPlay: boolean) => void,
  autoPlay: boolean,
  setAutoPlay: React.Dispatch<React.SetStateAction<boolean>>,
  cardRef: React.MutableRefObject<HTMLDivElement | null>
}

const Panel = ({ card, length, setCard, setAnimate, flashcards, shuffleFlashcards, disableShuffle, handleShowing, autoPlay, setAutoPlay, cardRef } : PanelProps) => {
  const [isShuffled, setIsShuffled] = useState(false);

  const handleCard = (method : 'increase' | 'decrease', byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to change the card manually')
      return;
    }

    if(method === 'increase') {
      if(card < flashcards.length - 1) {
        setCard((prev) => prev + 1)
        setAnimate('left');
      }
    } else {
      if(card > 0) {
        setCard(card - 1)
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

    shuffleFlashcards(Number((Math.random() * 1000).toFixed(0)));
  }

  const handlePlay = () => {
    if(cardRef.current?.classList.contains('rotate')) {
      if(card === flashcards.length - 1){
        handlePause();
        return;
      }
      handleCard('increase', true);
    }else{
      handleShowing(true);
    }
  }

  const handleStart = () => {
    toast.info('Auto play started', {
      hideProgressBar: true,
      autoClose: 1500
    });

    setAutoPlay(true);
  }

  const handlePause = () => {
    toast.info('Auto play paused', {
      hideProgressBar: true,
      autoClose: 1500
    });

    setAutoPlay(false);
  }

  useEffect(() => {
    if(!autoPlay) return;

    const interval = setInterval(() => {
      handlePlay();
    }, 5000)
    
    return () => clearInterval(interval);
  }, [autoPlay, card])


  return (
    <div className="px-3 flex justify-between py-2.5">
      <div className='flex gap-3 flex-1 justify-start'>
        <button
          type="button"
          onClick={() => autoPlay ? handlePause() : handleStart()}
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
          disabled={card === 0}
        >
          <Image src={leftarrow} width={18} height={18} alt="leftarrow" />
        </button>
        <p className='font-black text-lg'>{card + 1} / {length}</p>
        <button
          type="button"
          onClick={() => handleCard('increase', false)}
          disabled={card === length - 1}
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