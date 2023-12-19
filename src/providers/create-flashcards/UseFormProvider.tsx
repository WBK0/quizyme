"use client";
import { useFormSchema } from "@/app/(app)/create/quiz/schemas/CreateQuiz.yup";
import { FormInputs } from "@/app/(app)/create/flashcards/types/FormInputs";
import { yupResolver } from "@hookform/resolvers/yup";
import { createContext } from "react";
import { FieldArrayWithId, FormState, UseFieldArrayAppend, UseFieldArrayMove, UseFieldArrayRemove, UseFieldArrayUpdate, UseFormHandleSubmit, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch, useFieldArray, useForm } from "react-hook-form";

interface CreateQuizProvider {
  children: React.ReactNode;
}

interface UseFormContextProps {
  register: UseFormRegister<FormInputs>;
  errors: FormState<FormInputs>["errors"];
  setValue: UseFormSetValue<FormInputs>;
  watch: UseFormWatch<FormInputs>;
  reset: UseFormReset<FormInputs>;
  fields: FieldArrayWithId<FormInputs, "flashcards", "id">[];
  append: UseFieldArrayAppend<FormInputs>;
  remove: UseFieldArrayRemove;
  update: UseFieldArrayUpdate<FormInputs>;
  handleSubmit: UseFormHandleSubmit<FormInputs>;
}

export const UseFormContext = createContext(({} as UseFormContextProps));

export default function UseFormProvider({ children }: CreateQuizProvider) {
  const { register, formState: { errors }, setValue, watch, handleSubmit, reset, control } = 
    useForm({ 
      // resolver: yupResolver(useFormSchema), 
      defaultValues: {
        flashcards: [
          { concept: "", definition: "" },
          { concept: "", definition: "" },
          { concept: "", definition: "" },
          { concept: "", definition: "" },
          { concept: "", definition: "" },
        ]
      }
    });
  const { fields, append, remove, update } = useFieldArray({ control, name: "flashcards", rules: { required: true, minLength: 5, maxLength: 999 }})

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
        update,
      }}
    >
      {children}
    </UseFormContext.Provider>
  );
}