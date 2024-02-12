import { toast } from "react-toastify";
import { Flashcards } from "./GameProvider";

type FilterFlashcards = {
  filter: string;
  flashcardsSet: Flashcards;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
  likedIds: string[];
  setActualCard: React.Dispatch<React.SetStateAction<number>>;
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'liked' | 'unliked'>>;
  skipChangeActualCard: boolean;
  actualCard: number;
  autoPlay: boolean;
}

export const filterFlashcards = ({ filter, flashcardsSet, setFlashcards, likedIds, setActualCard, setFilter, skipChangeActualCard, actualCard, autoPlay } : FilterFlashcards) => {
  if(autoPlay){
    toast.update('changeFilter',{
      render: "Please pause the auto play to change the card manually",
      type: 'error',
    });

    return 'error';
  }
  
  if(filter === 'liked') {
    flashcardsSet = flashcardsSet.filter(flashcard => likedIds.includes(flashcard.id));

    if(flashcardsSet.length === 0){
      toast.update('changeFilter', {
        render: "You don't have any liked flashcards",
        type: 'error',
      });

      setFilter('all')
      return;
    }

    if(actualCard + 1 > flashcardsSet.length){
      setActualCard(flashcardsSet.length - 1)
    }

    if(!skipChangeActualCard){
      setActualCard(0)
    }

    setFlashcards([...flashcardsSet])
  }else if(filter === 'unliked') {
    flashcardsSet = flashcardsSet.filter(flashcard => !likedIds.includes(flashcard.id));
    
    if(flashcardsSet.length === 0){

      toast.update('changeFilter', {
        render: "You don't have any unliked flashcards",
        type: 'error',
      });

      setFilter('all')
      return;
    }

    if(actualCard + 1 > flashcardsSet.length){
      setActualCard(flashcardsSet.length - 1)
    }

    if(!skipChangeActualCard){
      setActualCard(0)
    }

    setFlashcards([...flashcardsSet])
  }else if(filter === 'all') {
    if(!skipChangeActualCard){
      setActualCard(0)
    }

    setFlashcards([...flashcardsSet])
  }
}