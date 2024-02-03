"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ActionButtonsProps = {
  type: string;
  id: string;
}

const ActionButtons = ({ type, id } : ActionButtonsProps) => {

  const router = useRouter();

  const handleGoQuiz = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/create`, {
        method: 'POST',
        body: JSON.stringify({
          quizId: id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });
  
      const json = await response.json();
  
      if(!response.ok){
        throw new Error(json.message);
      }

      router.push(`/play/quiz/${json.gameId}`);

    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
    }
  }

  return (
    <div className="fixed bottom-3 inset-x-0 flex items-center justify-center gap-2 sm:gap-4 px-2 max-w-md mx-auto">
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-md shadow-small shadow-lightblue hover:shadow-none"
        onClick={
          type === 'quiz' 
          ? handleGoQuiz 
          : () => {}
        }
      >
        GO {type === 'quiz' ? 'QUIZ' : 'LEARN'}
      </button>
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-xs shadow-small shadow-yellow hover:shadow-none"
      >
        ADD TO WISHLIST
      </button>
    </div>
  )
}
export default ActionButtons;