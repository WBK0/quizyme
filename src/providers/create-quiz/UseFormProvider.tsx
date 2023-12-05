"use client";
import { useFormSchema } from "@/app/(app)/create/quiz/schemas/CreateQuiz.yup";
import { FormInputs } from "@/app/(app)/create/quiz/types/Form.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContext } from "react";
import { FieldArrayWithId, FormState, UseFieldArrayAppend, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch, useFieldArray, useForm } from "react-hook-form";

interface CreateQuizProvider {
  children: React.ReactNode;
}

interface UseFormContextProps {
  register: UseFormRegister<FormInputs>;
  errors: FormState<FormInputs>["errors"];
  setValue: UseFormSetValue<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  reset: UseFormReset<FormInputs>;
  fields: FieldArrayWithId<FormInputs, "answers", "id">[];
  append: UseFieldArrayAppend<FormInputs>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
}

export const UseFormContext = createContext(({} as UseFormContextProps));

export default function UseFormProvider({ children }: CreateQuizProvider) {
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
      } as FormInputs
    });
  const { fields, append, remove, update } = useFieldArray({ control, name: "answers", rules: { required: true, minLength: 2, maxLength: 4 }})

  return (
    <UseFormContext.Provider
      value={{
        register,
        errors,
        setValue,
        watch,
        handleSubmit,
        reset,
        fields,
        append,
        remove,
        update
      }}
    >
      {children}
    </UseFormContext.Provider>
  );
}