import { useEffect, useRef, useState } from "react";

type CardChangeAnimationProps = {
  cardRef: React.MutableRefObject<HTMLDivElement | null>,
  list: any[],
  animate: 'left' | 'right' | null,
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | null>>,
  card: number,
  animateText: 'concept' | 'definition',
  setAnimateText: React.Dispatch<React.SetStateAction<'concept' | 'definition'>>,
  animateRef: React.MutableRefObject<HTMLDivElement | null>
}

const CardChangeAnimation = ({ cardRef, list, animate, setAnimate, card, animateText, setAnimateText, animateRef } : CardChangeAnimationProps) => {
  const handleAnimate = (direction: 'left' | 'right') => {
    setTimeout(() => {
      animateRef.current?.classList.add('scale-105');
    }, 0)
    setTimeout(() => {
      if(direction === 'left') {
        animateRef.current?.classList.add('left-[-10rem]')
      }else{
        animateRef.current?.classList.add('left-40')
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
    if(animate)
      handleAnimate(animate);
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
              <p 
                className="font-bold text-white text-lg md:text-2xl text-center py-5 px-3"
              >
                {
                  animate === 'left' 
                    ? list[card - 1][animateText]
                    : list[card + 1][animateText]
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