import { toast } from "react-toastify";

type FlipCardProps = {
  autoPlay: boolean;
  cardRef: React.MutableRefObject<HTMLDivElement | null>;
  setAnimateText: React.Dispatch<React.SetStateAction<"concept" | "definition">>;
};

export const flipCard = (byAutoPlay: boolean, { autoPlay, cardRef, setAnimateText } : FlipCardProps) => {
  if(autoPlay && !byAutoPlay){
    toast.error('Please pause the auto play to reverse flashcard manually', {
      toastId: 'flipCard',
    })
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