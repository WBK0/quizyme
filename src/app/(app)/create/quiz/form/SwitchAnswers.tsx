import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import AnswerQuiz from "../answers/AnswerQuiz";
import { useContext } from "react";
import AnswerBoolean from "../answers/AnswerBoolean";
import AnswerMultiple from "../answers/AnswerMultiple";
import AnswerPuzzle from "../answers/AnswerPuzzle";


const SwitchAnswers = () => {
  const { watch } = useContext(UseFormContext);

  return (
    <>
      <h3 className="font-bold text-lg">
        Answers
      </h3>
     {
        (() => {
          switch (watch("responseType")) {
            case 'Quiz':
              return(
                <AnswerQuiz />
              )
            case 'True / False':
              return(
                <AnswerBoolean />
              )
            case 'Multiple choice':
              return(
                <AnswerMultiple />
              )
            case 'Puzzle':
              return(
                <AnswerPuzzle />
              )
            default:
              null
          }
        })()
      } 
    </>
  )
}

export default SwitchAnswers;