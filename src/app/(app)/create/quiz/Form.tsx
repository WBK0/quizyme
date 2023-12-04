import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import Inputs from "./Inputs";
import { FormInputs, FormValues } from "./types/Form.types";
import { useFormSchema } from "./schemas/CreateQuiz.yup";
import Buttons from "./Buttons";
import SwitchAnswers from "./SwitchAnswers";

const Form = () => {
  const [formValues, setFormValues] = useState<FormValues>([]);
  const [actualQuestion, setActualQuestion] = useState(0);
  
  const { register, formState: { errors }, setValue, watch, handleSubmit, reset, control } = 
    useForm<FormInputs>({ 
      resolver: yupResolver(useFormSchema), 
      defaultValues: {
        question: "",
        answerTime: "30 s",
        answerPoints: "500",
        responseType: "Quiz",
        answers: [
          { answer: "", isCorrect: true },
          { answer: "", isCorrect: false },
        ]
      }
    });
  const { fields, append, remove, update } = useFieldArray({ control, name: "answers", rules: { required: true, minLength: 2, maxLength: 4 }})

  const onSubmit = async (data: FormInputs) => {
    try {
      setFormValues([...formValues, {...data}]);
      reset();
      setActualQuestion(actualQuestion + 1);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    }
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
      <Inputs 
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
      <SwitchAnswers
        fields={fields}
        append={append}
        register={register}
        watch={watch}
        remove={remove}
        update={update}
      />
      <Buttons
        actualQuestion={actualQuestion}
        setActualQuestion={setActualQuestion}
        formValues={formValues}
        setFormValues={setFormValues}
        reset={reset}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
      />  
    </form>
  )
}
export default Form;