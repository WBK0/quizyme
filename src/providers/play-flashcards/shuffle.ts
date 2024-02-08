import { Flashcards } from "./GameProvider";

type DisableShuffleProps = {
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
  flashcardsSet: Flashcards;
}

type EnableShuffleProps = {
  setAnimate: React.Dispatch<React.SetStateAction<'left' | 'right' | 'shuffle' | null>>;
  flashcards: Flashcards;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
}

export const disableShuffle = ({ setAnimate, setFlashcards, flashcardsSet } : any) => {
  setAnimate('shuffle');

  setFlashcards([...flashcardsSet]);
}

export const enableShuffle = (seed : number, { setAnimate, flashcards, setFlashcards } : any) => {
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
}