"use client";
import { createContext, useEffect, useRef, useState } from "react";
import { disableShuffle, enableShuffle } from "./shuffle";
import { flipCard } from "./flipCard";
import { filterFlashcards } from "./filterFlashcards";
import { toast } from "react-toastify";

export type Flashcards = {
  id: string;
  concept: string;
  definition: string;
}[];

interface GameFlashcardsProvider {
  children: React.ReactNode;
  flashcardsSet: Flashcards;
  id: string;
  flashcardsGameData: {
    id: string;
    shuffleSalt: number;
    actualFlashcard: number;
    likedIds: string[];
  }
}

export const GameContext = createContext({
  flashcards: [] as Flashcards,
  actualCard: 0 as number,
  setActualCard: (() => {}) as React.Dispatch<React.SetStateAction<number>>,
  animate: null as 'left' | 'right' | 'shuffle' | null,
  setAnimate: (() => {}) as React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>,
  disableShuffle: (() => {}) as () => void,
  enableShuffle: (() => {}) as (seed: number) => void,
  flipCard: (() => {}) as (byAutoPlay: boolean) => void,
  cardRef: null as unknown as React.MutableRefObject<HTMLDivElement | null>,
  animateRef: null as unknown as React.MutableRefObject<HTMLDivElement | null>,
  autoPlay: false as boolean,
  setAutoPlay: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  animateText: 'concept' as 'concept' | 'definition',
  setAnimateText: (() => {}) as React.Dispatch<React.SetStateAction<'concept' | 'definition'>>,
  isShuffled: false as boolean,
  setIsShuffled: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  id: '' as string,
  filter: 'all' as 'all' | 'liked' | 'unliked',
  setFilter: (() => {}) as React.Dispatch<React.SetStateAction<'all' | 'liked' | 'unliked'>>,
  flashcardsSet: [] as Flashcards,
  likedIds: [] as string[],
  setLikedIds: (() => {}) as React.Dispatch<React.SetStateAction<string[]>>,
  filterFlashcards: (() => {}) as (filter: 'liked' | 'unliked' | 'all') => void | string,
});

export default function GameProvider({ children, flashcardsSet, id, flashcardsGameData }: GameFlashcardsProvider) {
  const [actualCard, setActualCard] = useState(flashcardsGameData?.actualFlashcard || 0);
  const [flashcards, setFlashcards] = useState([...flashcardsSet] || []);
  const [animate, setAnimate] = useState<'left' | 'right' | 'shuffle' | null>(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [animateText, setAnimateText] = useState<'concept' | 'definition'>('concept');
  const [isShuffled, setIsShuffled] = useState(flashcardsGameData?.shuffleSalt > 0 ? true : false);
  const [filter, setFilter] = useState<'all' | 'liked' | 'unliked'>('all');
  const [likedIds, setLikedIds] = useState<string[]>(flashcardsGameData?.likedIds || []);
  const cardRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(cardRef.current?.classList.contains('rotate')) {
      cardRef.current?.classList.add('skip-rotate-animation');
      cardRef.current?.classList.remove('rotate');
      setTimeout(() => {
        cardRef.current?.classList.remove('skip-rotate-animation');
      }, 100)
    }
  }, [actualCard]) 

  useEffect(() => {
    if(filter === 'liked' || filter === 'unliked'){

      if(filter === 'liked' && likedIds.length === 0){
        toast.error(`You don't have any liked flashcards, setting filter to 'all'`);
      }else if(filter === 'unliked' && flashcardsSet.length - likedIds.length === 0){
        toast.error(`You don't have any unliked flashcards, setting filter to 'all'`);
      }

      filterFlashcards({ flashcardsSet, filter, setFlashcards, likedIds, setActualCard, setFilter, skipChangeActualCard: true, actualCard, autoPlay: false})
    }
  }, [likedIds])

  useEffect(() => {
    if(flashcardsGameData?.shuffleSalt > 0){
      enableShuffle(flashcardsGameData.shuffleSalt, { setAnimate, flashcards, setFlashcards, id });
    }
  }, [flashcardsGameData])

  return (
    <GameContext.Provider
      value={{
        flashcards,
        actualCard,
        setActualCard,
        animate,
        setAnimate: setAnimate,
        disableShuffle: () => disableShuffle({ setAnimate, setFlashcards, flashcardsSet, id, likedIds, filter}),
        enableShuffle: (seed: number) => enableShuffle(seed, { setAnimate, flashcards, setFlashcards, id }),
        flipCard: (byAutoPlay: boolean) => flipCard(byAutoPlay, { autoPlay, cardRef, setAnimateText }),
        cardRef: cardRef,
        animateRef: animateRef,
        autoPlay,
        setAutoPlay,
        animateText,
        setAnimateText,
        setIsShuffled,
        isShuffled,
        id: id,
        filter: filter,
        setFilter: setFilter,
        flashcardsSet,
        likedIds: likedIds,
        setLikedIds: setLikedIds,
        filterFlashcards: (filter: 'liked' | 'unliked' | 'all') => filterFlashcards({ flashcardsSet, filter, setFlashcards, likedIds, setActualCard, setFilter, skipChangeActualCard: false, actualCard, autoPlay})
      }}
    >
      {children}
    </GameContext.Provider>
  );
}