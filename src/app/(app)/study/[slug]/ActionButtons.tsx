"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type ActionButtonsProps = {
  type: string;
  id: string;
}

const ActionButtons = ({ type, id } : ActionButtonsProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const getFavoriteStatus = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${id}/isLiked`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setIsFavorite(json.isLiked);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFavoriteStatus();
  }, [])

  const handleGoLearn = () => {
    router.push(`/play/flashcards/${id}`);
  }

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

  const handleFavorites = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setIsFavorite(!isFavorite);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-3 inset-x-0 flex items-center justify-center gap-2 sm:gap-4 px-2 max-w-md mx-auto">
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-normal shadow-small shadow-lightblue hover:shadow-none"
        onClick={
          type === 'quiz' 
          ? handleGoQuiz 
          : handleGoLearn
        }
      >
        GO {type === 'quiz' ? 'QUIZ' : 'LEARN'}
      </button>
      <button 
        className="border-2 border-transparent bg-black text-white hover:bg-white hover:text-black hover:border-black duration-300 h-12 w-full rounded-full font-bold text-normal shadow-small shadow-yellow hover:shadow-none group"
        onClick={handleFavorites}
        disabled={loading}
      >
        {
          loading ?
          <div
            className={`inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-white group-hover:border-black border-r-transparent group-hover:border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
          </div>
          : isFavorite ?
              <span>UNFAVORITE</span>
            : <span>FAVORITE</span>
        }
      </button>
    </div>
  )
}
export default ActionButtons;