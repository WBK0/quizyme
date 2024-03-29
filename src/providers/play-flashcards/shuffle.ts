import { useSession } from "next-auth/react";
import { Flashcards } from "./GameProvider";
import { updateGameData } from "./updateGameData";
import { Session } from "next-auth";

type DisableShuffleProps = {
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
  flashcardsSet: Flashcards;
  id: string;
  filter: string;
  likedIds: string[];
  setIsShuffled: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}

type EnableShuffleProps = {
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>;
  flashcards: Flashcards;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
  id: string;
  setIsShuffled: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}

export const disableShuffle = ({ setAnimate, setFlashcards, flashcardsSet, id, filter, likedIds, setIsShuffled, session } : DisableShuffleProps) => {
  setAnimate('shuffle');

  if(filter === 'liked') {
    flashcardsSet = flashcardsSet.filter(flashcard => likedIds.includes(flashcard.id));
  }else if(filter === 'unliked') {
    flashcardsSet = flashcardsSet.filter(flashcard => !likedIds.includes(flashcard.id));
  }

  setFlashcards([...flashcardsSet]);
  updateGameData({ id, shuffleSalt: 0, session });
  setIsShuffled(false);
}

export const enableShuffle = (seed : number, { setAnimate, flashcards, setFlashcards, id, setIsShuffled, session } : EnableShuffleProps) => {
  setAnimate('shuffle');

  function customRandom(seed : number) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  let flashcardsTEMP = [...flashcards];

  let currentIndex = flashcards.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(customRandom(seed) * currentIndex);
    currentIndex--;

    temporaryValue = flashcardsTEMP[currentIndex];
    flashcardsTEMP[currentIndex] = flashcardsTEMP[randomIndex];
    flashcardsTEMP[randomIndex] = temporaryValue;
  }

  setFlashcards([...flashcardsTEMP]);

  updateGameData({ id, shuffleSalt: seed, session })

  setIsShuffled(true);
}