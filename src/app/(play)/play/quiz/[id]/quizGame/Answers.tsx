import { useEffect, useState } from "react";
import GameData from "./GameData.types";
import Puzzle from "./answers/Puzzle";
import Quiz from "./answers/Quiz";
import Multiplechoice from "./answers/Multiplechoice";
import TrueFalse from "./answers/TrueFalse";

const Answers = ({ gameData } : {gameData: GameData}) => {
  const [answers, setAnswers] = useState<GameData['question']['answers']>(gameData.question.answers);
  
  return (
    <div className="w-full h-full flex flex-col gap-10">
      {
        gameData?.question?.type === 'Puzzle'
        ? <Puzzle answers={answers} setAnswers={setAnswers}/>
        : gameData?.question?.type === 'Quiz'
        ? <Quiz answers={answers}/>
        : gameData?.question?.type === 'Multiple choice'
        ? <Multiplechoice answers={answers} setAnswers={setAnswers}/>
        : gameData?.question?.type === 'True / False'
        ? <TrueFalse answers={answers}/>
        : null
      }
    </div>
  )
}

export default Answers;