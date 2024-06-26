import { FormInputs } from "../types/Form.types";
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { useContext } from "react";
import { DataContext } from "@/providers/create-quiz/DataProvider";
import { toast } from "react-toastify";

const Buttons = () => {
  const { handleSubmit, reset } = useContext(UseFormContext);
  const { formValues, setFormValues, actualQuestion, setActualQuestion } = useContext(DataContext);

  const onSubmit = async (data: FormInputs) => {
    try {
      if(data.responseType === "Puzzle" && data.answers){
        data.answers = data.answers.map((answer) => {
          return {
            answer: answer.answer,  
            color: answer.color,
          }
        });
      }
      
      setFormValues([...formValues, {...data}]);
      
      setActualQuestion(actualQuestion + 1);
      setTimeout(() => {
        reset({
          question: "",
          answerTime: data.answerTime,
          answerPoints: data.answerPoints,
          responseType: data.responseType,
          image: "",
          answers: [
            { answer: data.responseType !== 'True / False' ? '' : 'True', isCorrect: true, color: data.responseType !== 'True / False' ? "blue" : "green"},
            { answer: data.responseType !== 'True / False' ? '' : 'False', isCorrect: false, color: "red" },
          ]
        });
      }, 0);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    }
  }

  const handlePreviousQuestion = (data?: FormInputs) => {
    if(data){
      handleStepAction(actualQuestion - 1, data);
    }else{
      handleStepAction(actualQuestion - 1, formValues[actualQuestion]);
    }
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

    console.log('formValues', actualQuestion)
      
    setTimeout(() => {
      reset({
        question: formValues[questionIndex]?.question || "",
        answerTime: formValues[questionIndex]?.answerTime || formValues[actualQuestion].answerTime,
        answerPoints: formValues[questionIndex]?.answerPoints || formValues[actualQuestion].answerPoints,
        responseType: formValues[questionIndex]?.responseType || formValues[actualQuestion].responseType,
        image: formValues[questionIndex]?.image || "",
        answers: formValues[questionIndex]?.answers ? formValues[questionIndex]?.answers : formValues[actualQuestion]?.answers && formValues[actualQuestion]?.responseType === 'True / False' ? [
          { answer: "True", isCorrect: true, color: "green" },
          { answer: "False", isCorrect: false, color: "red" },
        ] :
        [
          { answer: "", isCorrect: true, color: "blue" },
          { answer: "", isCorrect: false, color: "red" },
        ] 
      });
    }, 0);
  }

  return (
    <div className="flex justify-between md:flex-row flex-col gap-4">
      {
        actualQuestion > 0
        ?
          <button
            className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-60"
            type="button"
            onClick={
              actualQuestion === formValues.length 
                ? () => handlePreviousQuestion()
                : handleSubmit(handlePreviousQuestion)
            }
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