"use client";
import { FormValues } from "@/app/(app)/create/quiz/types/Form.types";
import { createContext, useState } from "react";

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
  const [formValues, setFormValues] = useState<FormValues>([]);
  const [actualQuestion, setActualQuestion] = useState(0);

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