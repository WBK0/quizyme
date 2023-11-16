"use client"
import React, { createContext, useState } from "react";

export const CompleteRegisterContext = createContext({
  step: 0,
  setStep: (number: number) => {},
  formValues: {
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    interests: [],
    image: null
  },
  handleChangeForm: (values: Partial<>) => {}
})

const CompleteRegisterProvider = ({ children } : { children: React.ReactNode}) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    interests: [],
    image: null
  })

  const handleChangeForm = (values) => {
    setFormValues({...formValues, ...values} as FormData);
  }

  return (
    <CompleteRegisterContext.Provider value={{step, setStep, formValues, handleChangeForm}}>
      {children}
    </CompleteRegisterContext.Provider>
  )
}

export default CompleteRegisterProvider;