"use client";
import { FormValues } from "@/app/(app)/create/quiz/types/Form.types";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createContext, useEffect, useState } from "react";

interface CreateQuizProvider {
  children: React.ReactNode;
}

export const DataContext = createContext({
  formValues: [] as FormValues,
  setFormValues: (() => {}) as React.Dispatch<React.SetStateAction<FormValues>>,
  actualQuestion: 0,
  setActualQuestion: (() => {}) as React.Dispatch<React.SetStateAction<number>>
});

export default function DataProvider({ children }: CreateQuizProvider) {
  const [ value, setValue ] = useLocalStorage("create-form", {});
  const [formValues, setFormValues] = useState<FormValues>([]);
  const [actualQuestion, setActualQuestion] = useState(0);

  useEffect(() => {
    setActualQuestion(value.questions.length);
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