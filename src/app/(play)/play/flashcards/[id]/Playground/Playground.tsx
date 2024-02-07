"use client";
import { useEffect, useRef, useState } from 'react';
import Panel from './Panel';
import CardChangeAnimation from './CardChangeAnimation';
import Card from './Card';
import { toast } from 'react-toastify';

type PlaygroundProps = {
  flashcardsData: {
    concept: string,
    definition: string
  }[]
}

const Playground = ({ flashcardsData } : PlaygroundProps) => {
  const [card, setCard] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState<'left' | 'right' | 'shuffle' | null>(null);
  const [animateText, setAnimateText] = useState<'concept' | 'definition'>('concept');
  const animateRef = useRef<HTMLDivElement>(null);
  const [flashcards, setFlashcards] = useState([...flashcardsData]);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    if(cardRef.current?.classList.contains('rotate')) {
      cardRef.current?.classList.add('skip-rotate-animation');
      cardRef.current?.classList.remove('rotate');
      setTimeout(() => {
        cardRef.current?.classList.remove('skip-rotate-animation');
      }, 100)
    }
  }, [card]) 
  
  const handleShowing = (byAutoPlay: boolean) => {
    if(autoPlay && !byAutoPlay){
      toast.error('Please pause the auto play to reverse flashcard manually')
      return;
    }

    if(cardRef.current) {
      cardRef.current.classList.toggle('rotate');
    }

    if(cardRef.current?.classList.contains('rotate')) {
      setAnimateText('definition');
    } else {
      setAnimateText('concept');
    }
  }
  
  const disableShuffle = () => {
    setAnimate('shuffle');

    setFlashcards([...flashcardsData]);
  }

  const shuffleFlashcards = (seed : number) => {
    setAnimate('shuffle');

    function customRandom(seed : number) {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    }

    let currentIndex = flashcards.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(customRandom(seed) * currentIndex);
      currentIndex--;

      temporaryValue = flashcards[currentIndex];
      flashcards[currentIndex] = flashcards[randomIndex];
      flashcards[randomIndex] = temporaryValue;
    }
  }

  return (
    <>
      <CardChangeAnimation 
        cardRef={cardRef}
        animateRef={animateRef}
        flashcards={flashcards}
        animate={animate}
        setAnimate={setAnimate}
        card={card}
        animateText={animateText}
        setAnimateText={setAnimateText}
      />
      <Card
        cardRef={cardRef}
        animateRef={animateRef}
        handleShowing={handleShowing}
        flashcards={flashcards}
        card={card}
      />
      <Panel 
        card={card}
        length={flashcards.length}
        setCard={setCard}
        setAnimate={setAnimate}
        flashcards={flashcards}
        shuffleFlashcards={shuffleFlashcards}
        disableShuffle={disableShuffle}
        handleShowing={handleShowing}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        cardRef={cardRef}
      />
    </>
  )
}

export default Playground;