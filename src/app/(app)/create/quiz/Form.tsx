import SelectInput from "@/components/Create/SelectInput";
import TextareaInput from "@/components/Create/TextareaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import AnswerQuiz from "./AnswerQuiz";
import { useState } from "react";

type FormInputs = {
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
}

const schema = yup.object().shape({
  question: yup.string()
    .min(4, 'Question must be at least 4 characters')
    .max(512, 'Question must be at most 512 characters')
    .required('Question is required'),
  answerTime: yup.string()
    .required('Answer time is required'),
  answerPoints: yup.string()
    .required('Answer points is required'),
  responseType: yup.string()
    .required('Response type is required'),
});

const Form = () => {
  const [formValues, setFormValues] = useState<any>([]);
  const [actualQuestion, setActualQuestion] = useState(0);
  
  const { register, formState: { errors }, setValue, watch, handleSubmit, reset } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormInputs) => {
    setFormValues([...formValues, data]);
    reset({
      question: "",
      answerTime: "30 s",
      answerPoints: "500",
      responseType: "Quiz",
    });
    setActualQuestion(actualQuestion + 1);
  }

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
    <form className="flex flex-col gap-4 mt-12">
      <h6 className="text-right font-bold text-lg">
        {
          actualQuestion === formValues.length
          ? `${formValues.length} questions`
          : `You are viewing at ${actualQuestion + 1} of ${formValues.length + 1} questions`
        }
      </h6>
      <TextareaInput
        register={register}
        name="question"
        error={errors.question?.message}
      />
      <SelectInput
        title="Time to answer"
        options={["10 s", "15 s", "30 s", "45 s", "60 s", "90 s", "120 s"]}
        register={register}
        name="answerTime"
        defaultValue="30 s"
        setValue={setValue}
        watch={watch}
        error={errors.answerTime?.message}
      />
      <SelectInput
        title="Points for answer"
        options={["100", "150", "250", "400", "500", "750", "1000", "1250", "1500"]}
        register={register}
        name="answerPoints"
        defaultValue="500"
        setValue={setValue}
        watch={watch}
        error={errors.answerPoints?.message}
      />
      <SelectInput
        title="Type of response"
        options={["Quiz", "Puzzle", "True / False", "Multiple choice"]}
        register={register}
        name="responseType"
        defaultValue="Quiz"
        setValue={setValue}
        watch={watch}
        error={errors.responseType?.message}
      />
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
      
    </form>
  )
}
export default Form;