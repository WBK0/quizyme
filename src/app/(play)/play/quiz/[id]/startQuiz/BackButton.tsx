"use client";
import { useRouter } from "next/navigation";

const BackButton = ({ quizSlug, type } : { quizSlug : string, type?: 'quiz' | 'flashcards' }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/study/${quizSlug}`);
  }

  return (
    <button
      type="button"
      className="bg-black hover:scale-105 duration-300 text-white font-bold py-3 w-56 rounded-full shadow-small shadow-red"
      onClick={handleRedirect}
    >
      BACK TO {type === 'quiz' ? 'QUIZ' : 'FLASHCARDS'}
    </button>
  )
}
export default BackButton;