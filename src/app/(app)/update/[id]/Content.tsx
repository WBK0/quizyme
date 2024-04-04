"use client";
import { useEffect, useState } from "react";
import ConfirmPage from "./ConfirmPage/ConfirmPage";
import UpdatePage from "./UpdatePage/UpdatePage";
import UpdateFlashcards from "./UpdateFlashcards/UpdateFlashcards";
import UpdateQuiz from "./UpdateQuiz/UpdateQuiz";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUrlParams from "@/hooks/useUrlParams";
import Spinner from "@/components/Loading/Spinner";

type ContentProps = {
  data: {
    image: string;
    title: string;
    length: number;
    topic: string;
    type: 'quiz' | 'flashcards';
  },
  id: string;
}

type Question = {
  question: string;
  time: number;
  points: number;
  type: string;
  image: string;
  answers: {
    answer: string;
    isCorrect: boolean;
    color: string;
  }[]
}

const Content = ({ data, id } : ContentProps) => {
  const [view, setView] = useState<number>(0);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [value, setValue] = useLocalStorage('update-form', {});
  const { changeParam } = useUrlParams();

  const getStudyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/update/${id}`)
      
      const json = await response.json();

      const colors = ['blue', 'red', 'green', 'yellow']

      setValue({
        ...value,
        id: id,
        type: json.data.type,
        mainImage: json.data.image,
        topic: json.data.topic,
        description: json.data.description,
        collection: json.data.collection.name,
        visibility: json.data.visibility,
        points: json.data.pointsMethod || null,
        tags: json.data.tags,
        questions: json.data.questions && json.data.questions.map((question : Question) => {
          return {
            question: question.question,
            answerTime: question.time,
            answerPoints: question.points,
            responseType: question.type,
            image: question.image,
            answers: question.answers.map((answer, index) => {
              return {
                answer: answer.answer,
                ...(answer.isCorrect !== null && { isCorrect: answer.isCorrect}),
                color: colors[index % 4]
              } 
            })
          }
        }),
        flashcards: json.data.flashcards
      })

      changeParam('type', json.type);

      setLoading(false);
    } catch (error) { 
      console.log('error', error);
    }
  }

  const handleConfirm = () => {
    getStudyData();
  }

  useEffect(() => {
    if(loading === false){
      setView(1);
    }
  }, [loading])

  return (
    <>
      {
        loading ? (
          <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center">
            <Spinner />
          </div>
        )
        :
          (() => {
            switch (view) {
              case 0:
                return(
                  <ConfirmPage 
                    data={data}
                    handleConfirm={handleConfirm}
                  />
                )
              case 1:
                return(
                  <UpdatePage
                    setView={setView}
                  />
                )
              case 2:
                return(
                  <UpdateFlashcards
                    setView={setView}
                    id={id}
                  />
                )
              case 3: 
                return(
                  <UpdateQuiz
                    setView={setView}
                    id={id}
                  />
                )
              default:
                break;
            }
          })()
      }
    </>
  )
}

export default Content;