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
    </div>
  )
}

export default Answers;