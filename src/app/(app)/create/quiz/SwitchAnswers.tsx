import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormRegister, UseFormWatch } from "react-hook-form";
import AnswerQuiz from "./AnswerQuiz";
import { FormInputs } from "./types/Form.types";

type SwitchAnswersProps = {
  watch: UseFormWatch<FormInputs>;
  fields: FieldArrayWithId<FormInputs, "answers", "id">[];
  register: UseFormRegister<FormInputs>;
  append: UseFieldArrayAppend<FormInputs>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<FormInputs>;
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