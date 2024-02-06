"use client";
import { useEffect, useRef, useState } from 'react';
import Panel from './Panel';
import CardChangeAnimation from './CardChangeAnimation';
import Card from './Card';

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