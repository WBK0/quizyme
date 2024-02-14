import Image from "next/image";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext, useEffect } from "react";
import heart from './heart.svg';
import heartfill from './heartfill.svg';

const CardChangeAnimation = ({ likeButton = false } : { likeButton?: boolean }) => {
  const { cardRef, flashcards, animate, setAnimate, actualCard, animateText, setAnimateText, animateRef, likedIds } = useContext(GameContext);
  
  const handleAnimate = (direction: 'left' | 'right' | 'shuffle') => {
    setTimeout(() => {
      animateRef.current?.classList.add('scale-105');
    }, 0)
    setTimeout(() => {
      if(direction === 'left') {
        animateRef.current?.classList.add('left-[-10rem]')
      }else if(direction === 'right') {
        animateRef.current?.classList.add('left-40')
      } else {
        animateRef.current?.classList.add('top-40')
      }

      animateRef.current?.classList.remove('duration-300')
      animateRef.current?.classList.add('duration-500')
    }, 300)
    setTimeout(() => {
      animateRef.current?.classList.add('opacity-0')
    }, 300)
    setTimeout(() => {
      setAnimate(null);
      setAnimateText('concept');
    }, 550)
  }

  useEffect(() => {
    if(animate){
      handleAnimate(animate);
    } 
  }, [animate])

  return (
    <>
      {
        animate ?
          <div 
            className='w-full absolute left-0 top-0 z-50 duration-300' 
            ref={animateRef}
            style={{
              height: cardRef.current?.style.height,
              width: cardRef.current?.clientWidth + 'px'
            }}
          >
            <div 
              className="bg-green rounded-2xl cursor-pointer flip-card-inner relative w-full h-full flex items-center justify-center" 
            > 
            {
              likeButton ?
                <button className="absolute flip-card-front right-3 top-3">
                  <Image src={likedIds.some(value => value === flashcards[actualCard + (animate === 'left' ? -1 : 1)]?.id) ? heartfill : heart} width={32} height={32} alt="Like button" />
                </button>
              : null
            }
            
              <p 
                className="font-bold text-white text-lg md:text-2xl text-center py-5 px-3"
              >
                {
                  animate === 'shuffle' ? 'Shuffling...'
                  :
                    animate === 'left' 
                      ? flashcards[actualCard - 1][animateText]
                      : flashcards[actualCard + 1][animateText]
                }
              </p>
            </div>
          </div>
        : null
      }
    </>
  )
}

export default CardChangeAnimation;