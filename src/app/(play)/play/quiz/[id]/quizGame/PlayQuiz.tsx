"use client";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Question from "./Question";
import Spinner from "@/components/Loading/Spinner";
import Answers from "./Answers";
import GameData from "./GameData.types";
import AfterAnswer from "./afterAnswer/page";

const QuizGame = ({ id } : { id: string }) => {
  const [gameData, setGameData] = useState<GameData>();
  const [answered, setAnswered] = useState<{pointsGet: number, pointsTotal: number, questionsLeft: number} | null>(null);

  const nextQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/next`, {
      method: 'POST',
      cache: 'no-cache',
    });
    
    const data = await response.json();

    getQuestion();
  }

  const getQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    });
    
    const data = await response.json();

    if(data.errorId === 102){
      return nextQuestion();
    }

    setGameData(data.data);
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <div className="md:pt-14 pt-24 flex flex-col gap-16 min-h-screen justify-center pb-10">
      {
        gameData?.question
        ? 
          <>
            <Heading 
              gameData={gameData}
            />
            <Question 
              gameData={gameData}
            />
            <Answers 
              gameData={gameData}
              id={id}
              setAnswered={setAnswered}
            />
            {
              answered
              ? 
                <AfterAnswer 
                  getQuestion={getQuestion}
                  answered={answered}
                  setAnswered={setAnswered}
                />
              : 
                null
            }
          </>
        : 
          <div className="flex justify-center items-center h-screen absolute w-full left-0">
            <Spinner />
          </div>
      }
    </div>
  )
}

export default QuizGame;