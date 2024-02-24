"use client";
import useUrlParams from "@/hooks/useUrlParams";
import Flashcards from "./Flashcards";
import Quizzes from "./Quizzes";
import Spinner from "@/components/Loading/Spinner";

const Content = () => {
  const { getParams } = useUrlParams();

  return (
    <div className="max-w-4xl mx-auto pt-12">
      {
        (() => {
          switch (getParams().type) {
            case 'quizzes':
              return <Quizzes />
            case 'flashcards':
              return <Flashcards />
            default:
              return (
                <div className="flex justify-center">
                  <Spinner />
                </div>  
              )     
          }
        })()
      }
    </div>
  )
}

export default Content;