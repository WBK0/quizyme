"use client";

import { useContext, useState } from "react";
import { CompleteRegisterContext } from "./CompleteRegisterProvider";
import AboutForm from "./components/AboutForm";
import ImageForm from "./components/ImageForm";
import InterestForm from "./components/InterestForm";
import NamesForm from "./components/NamesForm";
import UsernameForm from "./components/UsernameForm";

export type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  interests: string[];
  image?: any;
};

const Form = () => {
  const { step, setStep } = useContext(CompleteRegisterContext);

  const nextStep = (data : Partial<FormData>) => {
    setStep(step + 1);
  }

  const previousStep = () => {
    setStep(step - 1);
  }
  
  return (
    <>
      <h1 className="font-black text-4xl text-center">
        {
          step === 0
          ? 'Add your name'
          : step === 1
          ? 'Add your username'
          : step === 2
          ? 'Add your profile image'
          : step === 3
          ? 'Add your bio'
          : step === 4
          ? 'Add your interests'
          : 'Complete Register'
        }
      </h1>
      <div className='mt-6'>
        {
          (() => {
            switch (step) {
              case 0:
                return(
                  <NamesForm 
                  />                
                )
              case 1: 
                return(
                  <UsernameForm 
                  />
                )
              case 2:
                return(
                  <ImageForm
                  />
                )
              case 3:
                return(
                  <AboutForm
                  />
                )
              case 4: 
                return(
                  <InterestForm
                    nextStep={nextStep}
                    previousStep={previousStep}
                    values={formData}
                  />
                )
              default:
                return (
                  null
                )  
              }
          })()
        }
      </div>
    </>
  )
}

export default Form;