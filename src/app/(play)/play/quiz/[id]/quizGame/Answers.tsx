import { useEffect, useState } from "react";
import GameData from "./GameData.types";
import Puzzle from "./answers/Puzzle";

const Answers = ({ gameData } : {gameData: GameData}) => {
  const [answers, setAnswers] = useState<GameData['question']['answers']>(gameData.question.answers);
  
  return (
    <div className="w-full h-full flex flex-col gap-10">
      {
        gameData?.question?.type === 'Puzzle'
        ? <Puzzle answers={answers} setAnswers={setAnswers}/>
        : null
      }
      <button
        type="button"
        className="bg-black text-white px-16 rounded-full py-2.5 font-bold w-fit mx-auto hover:bg-white hover:text-black duration-300 hover:ring-2 hover:ring-black"
      >
        SUBMIT
      </button>
    </div>
  )
}

export default Answers;