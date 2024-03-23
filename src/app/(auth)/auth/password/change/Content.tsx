"use client";
import { useState } from "react";
import Code from "./Code";
import Form from "./Form";

const Content = () => {
  const [step, setStep] = useState<number>(1);
  const [code, setCode] = useState<string | null>(null);

  const handleNextStep = () => {
    setStep(step + 1);
  }

  return (
    <>
      {(() => {
        switch(step){
          case 0:
            return(
              <Code
                nextStep={handleNextStep}
                setConfirmCode={setCode}
              />
            )
          case 1: 
            return(
              <Form />
            )
        }
      })()}
    </>
  )
}

export default Content;