"use client";
import { FormValues } from "@/app/(app)/create/flashcards/types/FormInputs";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UseFormContext } from "./UseFormProvider";

interface CreateQuizProvider {
  children: React.ReactNode;
}

export const DataContext = createContext({
  formValues: [] as FormValues,
  setFormValues: (() => {}) as React.Dispatch<React.SetStateAction<FormValues>>,
  setLastEddited: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  lastEditted: "" as string
});

export default function DataProvider({ children }: CreateQuizProvider) {
  const [ value, setValue ] = useLocalStorage("create-form", {});
  const [ formValues, setFormValues ] = useState<FormValues>([]);
  const [ lastEditted, setLastEddited ] = useState<string>("");
  const { getValues, replace } = useContext(UseFormContext);
  const router = useRouter();

  useEffect(() => {
    setFormValues(getValues().flashcards);

    setValue({
      ...value,
      flashcards: getValues().flashcards
    });

  }, [lastEditted])

  useEffect(() => {
    if(
        !value ||
        !value.topic || 
        !value.description || 
        !value.collection ||
        !value.mainImage ||
        !value.tags ||
        value.type !== "flashcards" ||
        !value.visibility
      ){
      toast.error("You need to create a flashcards details first", {
        toastId: "create-flashcards-details"
      });
      router.replace("/create?type=flashcards");
    }
        
    setFormValues(value.flashcards || []);
    if(value?.flashcards?.length < 5){
      replace([
        ...value.flashcards,
        ...Array.from({ length: 5 - value.flashcards.length }, () => ({ concept: "", definition: "" })),
      ]);
    }else if(value?.flashcards?.length >= 5){
      replace([...value.flashcards]); 
    }

  }, []);

  return (
    <DataContext.Provider
      value={{
        formValues,
        setFormValues,
        setLastEddited,
        lastEditted
      }}
    >
      {children}
    </DataContext.Provider>
  );
}