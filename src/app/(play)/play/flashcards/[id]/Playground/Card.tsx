import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext, useEffect, useRef } from "react";

const Card = () => {
  const { cardRef, animateRef, flipCard, flashcards, actualCard } = useContext(GameContext)

  const conceptRef = useRef<HTMLDivElement>(null);
  const definitionRef = useRef<HTMLDivElement>(null);
  
  const calculateHeight = () => {
    if(!cardRef.current || !conceptRef.current || !definitionRef.current || !window) return;

    cardRef.current.style.height = 
      Number(conceptRef.current?.offsetHeight) > Number(definitionRef.current?.offsetHeight) 
      ? Number(conceptRef.current?.offsetHeight) > Number(cardRef.current?.offsetWidth) * (window.innerWidth < 640 ? 1 : 0.5625)
        ? conceptRef.current?.offsetHeight + 'px'
        : window.innerWidth < 640
          ? Number(cardRef.current?.offsetWidth) + "px"
          : Number(cardRef.current?.offsetWidth) * 0.5625 + "px"
      : Number(definitionRef.current?.offsetHeight) > Number(cardRef.current?.offsetWidth) * (window.innerWidth < 640 ? 1 : 0.5625)
        ? definitionRef.current?.offsetHeight + 'px'
        : window.innerWidth < 640
          ? Number(cardRef.current?.offsetWidth) + "px"
          : Number(cardRef.current?.offsetWidth) * 0.5625 + "px"

      if(animateRef.current){
        if(animateRef.current.clientHeight < cardRef.current.clientHeight) {
          animateRef.current.style.height = cardRef.current.style.height;
          animateRef.current.style.width = cardRef.current.style.width;
        }
      }
  }

  useEffect(() => {
    window.addEventListener('resize', calculateHeight);

    calculateHeight();

    return () => {
      window.removeEventListener('resize', calculateHeight);
    }
  }, [])

  useEffect(() => {
    calculateHeight();
  }, [actualCard])

  return (
    <div 
      className='flip-card bg-transparent w-full aspect-video' 
      onClick={() => flipCard(false)}
      ref={cardRef}
    >
      <div 
        className="bg-green rounded-2xl cursor-pointer flip-card-inner relative w-full h-full flex items-center justify-center" 
      >
        <div 
          className='flip-card-front absolute flex justify-center items-center w-full h-fit py-5 px-3'
          ref={conceptRef}
        >
          <p 
            className="font-bold text-white text-lg md:text-2xl text-center"
          >
            {flashcards[actualCard].concept}
          </p>
        </div>
        <div 
          className='flip-card-back absolute flex justify-center items-center w-full h-fit py-5 px-3'
          ref={definitionRef}
        >
          <p 
            className="font-bold text-white text-lg md:text-2xl text-center"
          >
            {flashcards[actualCard].definition}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card;