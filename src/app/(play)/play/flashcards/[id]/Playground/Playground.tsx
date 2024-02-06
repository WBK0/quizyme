"use client";
import { useEffect, useRef, useState } from 'react';
import Panel from './Panel';
import CardChangeAnimation from './CardChangeAnimation';
import Card from './Card';

type PlaygroundProps = {
  list: {
    concept: string,
    definition: string
  }[]
}

const Playground = ({ list } : PlaygroundProps) => {
  const [card, setCard] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState<'left' | 'right' | null>(null);
  const [animateText, setAnimateText] = useState<'concept' | 'definition'>('concept');
  const animateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(cardRef.current?.classList.contains('rotate')) {
      cardRef.current?.classList.add('skip-rotate-animation');
      cardRef.current?.classList.remove('rotate');

      setTimeout(() => {
        cardRef.current?.classList.remove('skip-rotate-animation');
      }, 100)
    }
  }, [card])  

  return (
    <>
      <CardChangeAnimation 
        cardRef={cardRef}
        animateRef={animateRef}
        list={list}
        animate={animate}
        setAnimate={setAnimate}
        card={card}
        animateText={animateText}
        setAnimateText={setAnimateText}
      />
      <Card
        cardRef={cardRef}
        animateRef={animateRef}
        setAnimateText={setAnimateText}
        list={list}
        card={card}
      />
      <Panel 
        card={card}
        length={list.length}
        setCard={setCard}
        setAnimate={setAnimate}
        list={list}
      />
    </>
  )
}

export default Playground;