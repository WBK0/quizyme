"use client";
import { ToastContent, toast } from "react-toastify";

const StartButton = ({ id } : { id : string}) => {

  const handleStart = async () => {
    toast.promise(
      async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/start`, {
          method: 'POST',
          cache: 'no-cache',
        });
  
        const quiz = await response.json();
        if (!response.ok) {
          throw new Error(quiz.message || 'Something went wrong');
        }
      },
      {
        pending: 'Starting quiz...',
        success: 'Quiz started!',
        error: {
          render: ({ data }: { data?: { message: string } }) => data?.message || 'Something went wrong',
        },
      }
    );
  };
  
  

  return (
    <button
      type="button"
      className="bg-black hover:scale-105 duration-300 text-white font-bold py-3 w-56 rounded-full shadow-small shadow-lightblue"
      onClick={handleStart}
    >
      START
    </button>
  )
}
export default StartButton;