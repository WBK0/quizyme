"use client";
import { useEffect, useState } from "react";
import Heading from "./Heading";

const QuizGame = ({ id } : { id: string }) => {
  const [gameData, setGameData] = useState();

  const getQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
      method: 'GET',
      cache: 'no-cache',
    });
    
    const data = await response.json();

    setGameData(data);
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <div className="px-3 py-3 relative">
      <Heading />
    </div>
  )
}
export default QuizGame;