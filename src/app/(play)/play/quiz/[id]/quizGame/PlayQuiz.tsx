"use client";
import { useEffect, useState } from "react";
import Heading from "./Heading";
import Question from "./Question";
import Spinner from "@/components/Loading/Spinner";

type GameData = {
  question: {
    image: string;
  }
}

const QuizGame = ({ id } : { id: string }) => {
  const [gameData, setGameData] = useState<GameData>();

  const getQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    });
    
    const data = await response.json();

    setGameData(data.data);
  }

  useEffect(() => {
    getQuestion()
  }, [])

  console.log(gameData)

  return (
    <div className="px-3 md:pt-14 pt-24 flex flex-wrap h-screen items-center">
      {
        gameData?.question
        ? 
          <>
            <Heading />
            <Question 
              gameData={gameData}
            />
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