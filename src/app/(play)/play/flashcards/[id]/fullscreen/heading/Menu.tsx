import { useContext, useState } from "react";
import Image from "next/image";
import flashcardsIcon from "./flashcards.svg";
import arrowDown from './arrowDown.svg';
import quiz from "./quiz.svg";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { GameContext } from "@/providers/play-flashcards/GameProvider";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { id } = useContext(GameContext)

  const router = useRouter();

  const handleMenu = () => {
    setShowMenu((prev) => !prev);
  }

  const handleQuiz = () => {
    setShowMenu(false);

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
    <div className="grow sm:flex-1 order-1 flex items-center">
      <div className="relative">
        <div className="flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6">
          <Image src={flashcardsIcon} width={38} height={38} alt="Flashcards icon" />
          <p className="font-extrabold">Flashcards</p>
          <button
            type="button"
            onClick={handleMenu}
          >
            <Image src={arrowDown} width={14} height={14} alt="Arrow down" className="z-10" />
          </button>
        </div>
        {
          showMenu ?
          // <div className="absolute top-9 left-0 bg-white w-full rounded-lg shadow-xl p-3 sm:pl-6">
            <button
              type="button"
              className="absolute top-9 left-0 bg-white w-full rounded-lg shadow-xl p-3 sm:pl-6 flex items-center gap-2 sm:gap-3"
              onClick={handleQuiz}
            >
              <Image src={quiz} width={38} height={38} alt="Flashcards icon" />
              <span className="font-extrabold">Go quiz</span>
            </button>
          // </div>
          : null
        }
      </div>
    </div>
  )
}

export default Menu;