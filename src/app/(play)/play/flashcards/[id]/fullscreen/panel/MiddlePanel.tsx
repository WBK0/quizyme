import Image from "next/image"
import leftarrow from './svg/leftArrow.svg'
import rightarrow from './svg/rightArrow.svg'
import { useContext } from "react"
import { GameContext } from "@/providers/play-flashcards/GameProvider"
import { updateGameData } from "@/providers/play-flashcards/updateGameData"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"

const MiddlePanel = () => {
  const { actualCard, flashcards, autoPlay, setActualCard, setAnimate, id, setIsEnded } = useContext(GameContext)
  
  const { data: session } = useSession();

  const handleCard = (method : 'increase' | 'decrease', byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to change the card manually')
      return;
    }

    if(method === 'increase') {
      console.log(actualCard, flashcards.length)

      if(actualCard < flashcards.length - 1) {

        setActualCard((prev) => prev + 1)
        setAnimate('left');
        updateGameData({ id, actualFlashcard: actualCard + 1, session})
      }
      else if(actualCard === flashcards.length - 1) {
        setIsEnded(true);
        updateGameData({ id, isEnded: true, session})
      }
    } else {
      if(actualCard > 0) {
        setActualCard((prev) => prev - 1);
        setAnimate('right');
        updateGameData({ id, actualFlashcard: actualCard - 1, session})
      }
    }
  }

  return (
    <div className='flex gap-3 sm:gap-12 grow justify-center'>
      <button
        type="button"
        onClick={() => handleCard('decrease', false)}
        disabled={actualCard === 0}
      >
        <Image src={leftarrow} width={18} height={18} alt="leftarrow" />
      </button>
      <button
        type="button"
        onClick={() => handleCard('increase', false)}
      >
        <Image src={rightarrow} width={18} height={18} alt="rightarrow" />
      </button>
    </div>
  )
}
export default MiddlePanel