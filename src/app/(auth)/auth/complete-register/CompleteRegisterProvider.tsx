"use client"
import React, { createContext, useState } from "react";

export type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  interests: string[];
  image?: any;
};

export const CompleteRegisterContext = createContext({
  step: 0 as number,
  setStep: (number: number) => {},
  formValues: {} as FormData,
  handleChangeForm: (values: Partial<FormData>) => {}
})

const CompleteRegisterProvider = ({ children } : { children: React.ReactNode}) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormData>({
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    interests: [],
    image: null
  })

  const handleChangeForm = (values: Partial<FormData>) => {
    setFormValues({...formValues, ...values});
  }

  return (
    <CompleteRegisterContext.Provider value={{step, setStep, formValues, handleChangeForm}}>
      {children}
    </CompleteRegisterContext.Provider>
  )
}

export default CompleteRegisterProvider;