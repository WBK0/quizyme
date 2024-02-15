"use client";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const Heading = ({ topic } : { topic: string }) => {
  const { setFilter, filter, filterFlashcards, id } = useContext(GameContext);

  const router = useRouter();

  const handleFilter = (filter: 'liked' | 'unliked' | 'all') => {
    toast.info(`Set learing mode to ${filter} concepts`, {
      hideProgressBar: true,
      autoClose: 1500,
      toastId: 'changeFilter'
    })

    setFilter(filter);
    filterFlashcards(filter);
  }

  const handleQuiz = () => {
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
        success: 'Quiz created!',
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || 'An error occurred while creating quiz from flashcards' },
      }
    )
  }

  return (
    <div className="flex flex-col px-3">
      <h2 className="font-bold text-lg">{topic}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8 gap-4 xl:gap-6">
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl w-full py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
        >
          Flashcards
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green w-full rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
          onClick={handleQuiz}
        >
          Go quiz
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
          onClick={() => {
            (filter === 'liked' ? handleFilter('all') : handleFilter('liked'))
          }}
        >
          Learn {filter !== 'liked' ? 'only liked' : 'all concepts'}
        </button>
        <button
          className="bg-black text-white shadow-small shadow-green rounded-2xl py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
          onClick={() => {
            filter === 'unliked' ? handleFilter('all') : handleFilter('unliked')
          }}
        >
          Learn {filter !== 'unliked' ? 'only unliked' : 'all concepts'}
        </button>
      </div>
    </div>
  )
}

export default Heading;