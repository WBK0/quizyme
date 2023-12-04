import { UseFormWatch } from "react-hook-form";
import AnswerQuiz from "./AnswerQuiz";
import { FormInputs } from "./types/Form.types";

type SwitchAnswersProps = {
  answers: {
    answer: string;
    isCorrect: boolean;
  }[];
  setAnswers: (value: any) => void;
  watch: UseFormWatch<FormInputs>;
}

const SwitchAnswers = ({ fields, register, watch, append, remove, update } : SwitchAnswersProps) => {
  return (
    <>
     {
        (() => {
          switch (watch("responseType")) {
            case 'Quiz':
              return(
                <AnswerQuiz 
                  fields={fields}
                  append={append}
                  register={register}
                  remove={remove}
                  update={update}
                  watch={watch}
                />
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