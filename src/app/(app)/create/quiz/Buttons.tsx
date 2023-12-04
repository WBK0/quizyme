import { UseFormReset } from "react-hook-form";
import { FormInputs, FormValues } from "./types/Form.types";

type ButtonsProps = {
  actualQuestion: number;
  formValues: FormValues;
  handleSubmit: any;
  setActualQuestion: (value: number) => void;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  reset: UseFormReset<FormInputs>;
  onSubmit: (data: FormInputs) => void;
}

const Buttons = ({ actualQuestion, formValues, handleSubmit, setActualQuestion, setFormValues, reset, onSubmit} : ButtonsProps) => {
  const handlePreviousQuestion = (data : FormInputs) => {
    handleStepAction(actualQuestion - 1, data);
  }

  const handleNextQuestion = (data : FormInputs) => {
    handleStepAction(actualQuestion + 1, data);
  }

  const handleStepAction = (questionIndex : number, data: FormInputs) => {
    setFormValues(
      formValues.map((item : any, index : number) => {
        if(index === actualQuestion){
          return data;
        }
        return item;
      })
    );
    setActualQuestion(questionIndex);
    reset({
      question: formValues[questionIndex]?.question || "",
      answerTime: formValues[questionIndex]?.answerTime || formValues[actualQuestion].answerTime,
      answerPoints: formValues[questionIndex]?.answerPoints || formValues[actualQuestion].answerPoints,
      responseType: formValues[questionIndex]?.responseType || formValues[actualQuestion].responseType,
      answers: formValues[questionIndex]?.answers || [
        { answer: "", isCorrect: true },
        { answer: "", isCorrect: false },
      ] 
    })
  }

  return (
    <div className="flex justify-between md:flex-row flex-col gap-4">
      {
        actualQuestion > 0
        ?
          <button
            className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-60"
            type="button"
            onClick={handleSubmit(handlePreviousQuestion)}
          >
            Previous question
          </button>
        : null
      }
      {
        actualQuestion !== formValues.length
        ?
          <button
            className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-60"
            type="button"
            onClick={handleSubmit(handleNextQuestion)}
          >
            Next question
          </button>
        : 
          <button
            className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-60"
            type="button"
            onClick={handleSubmit(onSubmit)}
          >
            Add question
          </button>
      }
    </div>
  )
}
export default Buttons;