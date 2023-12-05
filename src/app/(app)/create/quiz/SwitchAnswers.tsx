import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import AnswerQuiz from "./answers/AnswerQuiz";
import { useContext } from "react";


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
            default:
              null
          }
        })()
      } 
    </>
  )
}

export default SwitchAnswers;