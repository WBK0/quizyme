"use client";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

const Heading = ({ topic } : { topic: string }) => {
  const { setFilter, filter, filterFlashcards } = useContext(GameContext);

  const handleFilter = (filter: 'liked' | 'unliked' | 'all') => {
    toast.info(`Set learing mode to ${filter} concepts`, {
      hideProgressBar: true,
      autoClose: 1500,
      toastId: 'changeFilter'
    })

    setFilter(filter);
    filterFlashcards(filter);
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
        >
          Test
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