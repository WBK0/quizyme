import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import AnswerQuiz from "./AnswerQuiz";
import { useContext } from "react";


const SwitchAnswers = () => {
  const { watch } = useContext(UseFormContext);

  return (
    <>
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