import Image from "next/image";
import play from './svg/play.svg';
import shuffle from './svg/shuffle.svg';
import leftarrow from './svg/leftarrow.svg';
import rightarrow from './svg/rightarrow.svg';
import fullscreen from './svg/fullscreen.svg';
import { toast } from "react-toastify";
import { useState } from "react";

type PanelProps = {
  card: number,
  length: number
  setCard: React.Dispatch<React.SetStateAction<number>>,
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>,
  shuffleFlashcards: (seed : number) => void,
  flashcards: {
    concept: string,
    definition: string
  }[]
  disableShuffle: () => void
}

const Panel = ({ card, length, setCard, setAnimate, flashcards, shuffleFlashcards, disableShuffle } : PanelProps) => {
  const [isShuffled, setIsShuffled] = useState(false);

  const handleCard = (method : 'increase' | 'decrease') => {
    if(method === 'increase') {
      if(card < flashcards.length - 1) {
        setCard(card + 1)
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

    shuffleFlashcards(11);
  }

  return (
    <div className="px-3 flex justify-between py-2.5">
      <div className='flex gap-3 flex-1 justify-start'>
        <button>
          <Image src={play} width={14} alt="play" />
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
          onClick={() => handleCard('decrease')}
          disabled={card === 0}
        >
          <Image src={leftarrow} width={18} height={18} alt="leftarrow" />
        </button>
        <p className='font-black text-lg'>{card + 1} / {length}</p>
        <button
          type="button"
          onClick={() => handleCard('increase')}
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