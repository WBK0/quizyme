"use client";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Question from "./Question";
import Spinner from "@/components/Loading/Spinner";
import Answers from "./Answers";
import GameData from "./GameData.types";
import AfterAnswer from "./afterAnswer/page";
import Finished from "./finished/page";

const QuizGame = ({ id } : { id: string }) => {
  const [gameData, setGameData] = useState<GameData>();
  const [answered, setAnswered] = useState<{pointsGet: number, pointsTotal: number, questionsLeft: number} | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [stopTimer, setStopTimer] = useState(false);

  const nextQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/next`, {
      method: 'POST',
      cache: 'no-cache',
    });
    
    if(response.ok){
      getQuestion();
    }
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

    setIsFinished(data?.isFinished)
    setGameData(data.data);
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <>
      {
        gameData?.question
        ? 
          <div className="md:pt-14 pt-24 flex flex-col gap-16 min-h-screen justify-center pb-10">
            <Heading 
              gameData={gameData}
              stopTimer={stopTimer}
            />
            <Question 
              gameData={gameData}
            />
            <Answers 
              gameData={gameData}
              id={id}
              setAnswered={setAnswered}
              setStopTimer={setStopTimer}
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
          </div>
        : 
          isFinished
          ? 
            <Finished
              
            />
          :
            <div className="flex justify-center items-center h-screen absolute w-full left-0">
              <Spinner />
            </div>
      }
    </>
  )
}

export default QuizGame;