"use client";
import { useRouter } from "next/navigation";

const Buttons = () => {
  const router = useRouter();

  const handleConfirm = () => {
    if(confirm('All players will lost their progress if you update this study. Are you sure?')){
      console.log('confirmed')
    }
  }

  return (
    <div className="flex gap-4 py-4">
      <button 
        className="bg-black text-white font-bold w-44 py-2.5 shadow-small shadow-green rounded-full hover:scale-105 duration-300"
        onClick={handleConfirm}
      >
        Update
      </button>
      <button 
        className="bg-black text-white font-bold w-44 py-2.5 shadow-small shadow-red rounded-full hover:scale-105 duration-300"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </div>
  )
}

export default Buttons;