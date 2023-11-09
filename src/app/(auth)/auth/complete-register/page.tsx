"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import logo from '@/public/logo.svg';
import NamesForm from './NamesForm';
import UsernameForm from './UsernameForm';
import AboutForm from './AboutForm';
import InterestForm from './InterestForm';


const CompleteRegister = () => {
  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep(step + 1);
  }

  return (
    <div className="max-w-lg mx-auto flex min-h-screen flex-col justify-center px-3 gap-4 relative py-16">
      <div className='absolute top-6 w-full left-0'>
        <div className='w-2/3 max-w-sm md:w-full bg-gray-300 h-4 mx-auto rounded-full relative'>
          <div className={`absolute left-0 h-4 bg-green rounded-xl duration-500`  } style={{width: `${((step + 1) * 100) / 4}%`}}>
          </div>
        </div>
      </div>
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Select interests</h1>
      <div className='mt-6'>
        {
          (() => {
            switch (step) {
              case 0:
                return(
                  <NamesForm 
                    nextStep={nextStep}
                  />                
                )
              case 1: 
                return(
                  <UsernameForm 
                    nextStep={nextStep}
                  />
                )
              case 2:
                return(
                  <AboutForm
                    nextStep={nextStep}
                  />
                )
              case 3: 
                return(
                  <InterestForm
                    nextStep={nextStep}
                  />
                )
              default:
                return(
                  null
                )  
              }
          })()
        }
        
      </div>
      
    </div>
  )
}

export default CompleteRegister;