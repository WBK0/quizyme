import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { FormInputs, FormValues } from "./types/Form.types";

type ButtonsProps = {
  actualQuestion: number;
  formValues: FormValues;
  handleSubmit: any;
  setActualQuestion: (value: number) => void;
  setValue: UseFormSetValue<FormInputs>;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  reset: UseFormReset<FormInputs>;
  onSubmit: (data: FormInputs) => void;
}

const Buttons = ({ actualQuestion, formValues, handleSubmit, setActualQuestion, setValue, setFormValues, reset, onSubmit} : ButtonsProps) => {
  const handlePreviousQuestion = () => {
    setActualQuestion(actualQuestion - 1);
    setValue("question", formValues[actualQuestion - 1].question);
  }

  const handleNextQuestion = (data : FormInputs) => {
    setFormValues(
      formValues.map((item : any, index : number) => {
        if(index === actualQuestion){
          return data;
        }
        return item;
      })
    );
    setActualQuestion(actualQuestion + 1);
    reset({
      question: formValues[actualQuestion + 1]?.question || "",
      answerTime: formValues[actualQuestion + 1]?.answerTime || formValues[actualQuestion].answerTime,
      answerPoints: formValues[actualQuestion + 1]?.answerPoints || formValues[actualQuestion].answerPoints,
      responseType: formValues[actualQuestion + 1]?.responseType || formValues[actualQuestion].responseType, 
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
            onClick={handlePreviousQuestion}
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