import Image from "next/image";
import confirm from './confirm.svg';
import flashcardsIcon from './flashcards.svg';
import test from './test.svg';
import arrowLeft from './arrowLeft.svg';
import { useContext } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { updateGameData } from "@/providers/play-flashcards/updateGameData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const EndScreen = () => {
  const { flashcards, setActualCard, setIsEnded, id } = useContext(GameContext)

  const router = useRouter();

  const handlePreviousCard = () => {
    updateGameData({id, isEnded: false})
    setIsEnded(false)
  }

  const handleReset = () => {
    updateGameData({id, isEnded: false, actualFlashcard: 0})
    setIsEnded(false)
    setActualCard(0)
  }

  const handleStartQuiz = () => {
    toast.promise(
      async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz/create`, {
          method: 'POST',
          cache: 'no-cache',
        });

        const data = await response.json();

        if(!response.ok){
          throw new Error(data.error)
        }

        router.push(`/play/flashcards/quiz/${data.quizId}`)
      },
      {
        pending: 'Creating quiz from flashcards...',
        success: 'Quiz created! You will be soon redirected!',
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || 'An error occurred while creating quiz from flashcards' },
      }
    )
  }

  return (
    <div className="items-center flex flex-col md:h-screen w-full justify-center container mx-auto px-3">
      <div className="h-1/3 pt-28 md:pt-24">
        <h6
          className="text-center font-bold text-xl"
        >
          Biologia - rozkład komórek definicje
        </h6>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-6 md:gap-20 h-1/3 items-center pt-16 md:pt-0">
        <div className="flex items-center gap-6 flex-col md:flex-row">
          <Image src={confirm} width={100} height={100} alt="confirm" />
          <h2
            className="font-extrabold text-2xl text-center md:text-left"
          >
            Congratulations! You have completed learning a set of flashcards
          </h2>
        </div>
        <div className="flex flex-col gap-6">
          <button
            type="button"
            className="bg-black rounded-full py-6 text-white font-bold w-full text-lg lg:text-2xl duration-300 hover:scale-105"
            onClick={handleReset}
          >
            <span className="flex justify-center gap-4 items-center"><Image src={flashcardsIcon} height={32} alt="flashcards" className="h-6 md:h-8" /> LEARN ONE MORE TIME</span>
          </button>
          <button
            type="button"
            className="bg-black rounded-full py-6 text-white font-bold w-full text-lg lg:text-2xl duration-300 hover:scale-105"
            onClick={handleStartQuiz}
          >
            <span className="flex justify-center gap-4 items-center"><Image src={test} height={32} alt="test" className="h-6 md:h-8" /> TEST MY KNOWLEDGE</span>
          </button>
        </div>
      </div>
      <div className="h-1/3 w-full max-w-5xl mx-auto pt-12">
        <div className="flex justify-left w-full">
          <button 
            type="button"
            className="cursor-pointer flex items-center gap-2"
            onClick={handlePreviousCard}
          >
            <Image src={arrowLeft} width={20} alt="arrow left" /> 
            <p className="font-extrabold">Return to last flashcard</p>
          </button>
        </div> 
      </div>
    </div>
  )
}

export default EndScreen;