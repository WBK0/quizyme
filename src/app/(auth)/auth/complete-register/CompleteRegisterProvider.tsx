"use client"
import { Session } from "next-auth";
import React, { createContext, useState } from "react";

export type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  interests: string[];
  image: string;
};

export const CompleteRegisterContext = createContext({
  step: 0 as number,
  setStep: (number: number) => {},
  formValues: {} as FormData,
  handleChangeForm: (values: Partial<FormData>) => {}
})

const CompleteRegisterProvider = ({ children, session } : { children: React.ReactNode, session: Session | null}) => {
  const [step, setStep] = useState(0);
  const [formValues, setFormValues] = useState<FormData>({
    firstname: session?.user?.name?.split(' ')[0] ?? '',
    lastname: session?.user?.name?.split(' ')[1] ?? '',
    username: '',
    bio: '',
    interests: [],
    image: session?.user.image ?? "https://cdn.quizyme.codebybartlomiej.pl/uploads/defaultPicture.png"
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