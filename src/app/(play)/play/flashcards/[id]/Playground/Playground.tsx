"use client";
import { useEffect, useRef, useState } from 'react';
import Panel from './Panel';

const list = [
  {
    concept: "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMake Concept 1 Concept 1 Concept 1 Concept 1 Concept 1 Concept 1 Concept 1",
    definition: "Definition 1",
  },
  {
    concept: "Concept 2",
    definition: "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus PageMake",
  },
  {
    concept: "Concept 3",
    definition: "Definition 3",
  }
]

const Playground = () => {
  const [card, setCard] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLDivElement>(null);
  const definitionRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null);
  const animateRef = useRef<HTMLDivElement>(null);

  const handleAnimate = (direction: 'left' | 'right') => {
    setAnimate(direction);

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
    }, 550)
  }

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

  const handleShowing = () => {
    if(cardRef.current) {
      cardRef.current.classList.toggle('rotate');
    }
  }

  const handleCard = (method : 'increase' | 'decrease') => {
    if(method === 'increase') {
      if(card < list.length - 1) {
        setCard(card + 1)
        handleAnimate('left');
      }
    } else {
      if(card > 0) {
        setCard(card - 1)
        handleAnimate('right');
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
                    ? list[card - 1][cardRef.current?.classList.contains('rotate') ? 'definition' : 'concept']
                    : list[card + 1][cardRef.current?.classList.contains('rotate') ? 'definition' : 'concept']
                }
              </p>
            </div>
          </div>
        : null
      }
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
              {list[card].concept}
            </p>
          </div>
          <div 
            className='flip-card-back absolute flex justify-center items-center w-full h-fit py-5 px-3'
            ref={definitionRef}
          >
            <p 
              className="font-bold text-white text-lg md:text-2xl text-center"
            >
              {list[card].definition}
            </p>
          </div>
        </div>
      </div>
      <Panel 
        card={card}
        length={list.length}
        handleCard={handleCard}
      />
    </>
  )
}

export default Playground;