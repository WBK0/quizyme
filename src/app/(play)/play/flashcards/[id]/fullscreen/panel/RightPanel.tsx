import Image from "next/image";
import all from './svg/all.svg'
import heart from './svg/heart.svg'
import heartfill from './svg/heart.fill.svg'
import { useContext } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import { toast } from "react-toastify";

const RightPanel = () => {
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
    <div className='flex gap-2 sm:gap-3 flex-1 justify-end'>
      <button
        type="button"
        onClick={() => handleFilter(filter === 'liked' ? 'all' : 'liked')}
      >
        <Image src={filter !== 'liked' ? heartfill : all} width={22} height={22} alt="Liked concepts" />
      </button>
      <button
        type="button"
        onClick={() => handleFilter(filter === 'unliked' ? 'all' : 'unliked')}
      >
        <Image src={filter !== 'unliked' ? heart : all} width={22} height={22} alt="Unliked concepts" />
      </button>
    </div>
  )
}

export default RightPanel;