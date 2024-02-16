"use client";
import { toast } from "react-toastify";
import updateQuizData from "./updateQuizData";

const StartButton = ({ id, type } : { id : string, type: 'quiz' | 'flashcards' }) => {

  console.log(type)

  const handleStart = async () => {
    toast.promise(
      async () => {
        let response;
        if (type === 'quiz') {
          response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/start`, {
            method: 'POST',
            cache: 'no-cache',
          });
        } else {
          response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz/start`, {
            method: 'POST',
            cache: 'no-cache',
          });
        }
  
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

        updateQuizData({ type});
      },
      {
        pending: 'Starting quiz...',
        error: {
          render: ({ data }: { data?: { message: string } }) => data?.message || 'Something went wrong',
        },
      }
    );
  };

  return (
    <button
      type="button"
      className="bg-black hover:scale-105 duration-300 text-white font-bold py-3 w-60 rounded-full shadow-small shadow-lightblue"
      onClick={handleStart}
    >
      START
    </button>
  )
}
export default StartButton;