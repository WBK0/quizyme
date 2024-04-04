"use client";
import { FormValues } from "@/app/(app)/create/quiz/types/Form.types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CreateQuizProvider {
  children: React.ReactNode;
  type: 'create' | 'update';
}

export const DataContext = createContext({
  formValues: [] as FormValues,
  setFormValues: (() => {}) as React.Dispatch<React.SetStateAction<FormValues>>,
  actualQuestion: 0,
  setActualQuestion: (() => {}) as React.Dispatch<React.SetStateAction<number>>
});

export default function DataProvider({ children, type }: CreateQuizProvider) {
  const [ value, setValue ] = useLocalStorage(type === 'create' ? 'create-form' : 'update-form', {});
  const [formValues, setFormValues] = useState<FormValues>([]);
  const [actualQuestion, setActualQuestion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if(
        !value ||
        !value.topic || 
        !value.description || 
        !value.collection ||
        !value.mainImage ||
        !value.points ||
        !value.tags ||
        value.type !== "quiz" ||
        !value.visibility
      ){
      toast.error("You need to create a quiz details first", {
        toastId: "create-quiz-details"
      });
      router.replace("/create?type=quiz");
    }

    setActualQuestion(value?.questions?.length || 0);
    setFormValues(value.questions || []);
  }, []);

  useEffect(() => {
    if(formValues.length > 0){
      setValue({
        ...value,
        questions: formValues
      });
    }
  }, [formValues]);

  return (
    <DataContext.Provider
      value={{
        formValues,
        setFormValues,
        actualQuestion,
        setActualQuestion
      }}
    >
      {children}
    </DataContext.Provider>
  );
}