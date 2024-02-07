import { useEffect, useRef } from "react";

type CardProps = {
  cardRef: React.MutableRefObject<HTMLDivElement | null>,
  animateRef: React.MutableRefObject<HTMLDivElement | null>,
  setAnimateText: React.Dispatch<React.SetStateAction<'concept' | 'definition'>>,
  flashcards: {
    concept: string,
    definition: string
  }[],
  card: number
}

const Card = ({ cardRef, animateRef, setAnimateText, flashcards, card } : CardProps) => {
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
  }, [card])

  const handleShowing = () => {
    if(cardRef.current) {
      cardRef.current.classList.toggle('rotate');
    }

    if(cardRef.current?.classList.contains('rotate')) {
      setAnimateText('definition');
    } else {
      setAnimateText('concept');
    }
  }

  return (
    <div 
      className='flip-card bg-transparent w-full aspect-video' 
      onClick={handleShowing}
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
            {flashcards[card].concept}
          </p>
        </div>
        <div 
          className='flip-card-back absolute flex justify-center items-center w-full h-fit py-5 px-3'
          ref={definitionRef}
        >
          <p 
            className="font-bold text-white text-lg md:text-2xl text-center"
          >
            {flashcards[card].definition}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card;