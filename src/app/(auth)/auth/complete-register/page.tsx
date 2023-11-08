"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import logo from '@/public/logo.svg';
import NamesForm from './NamesForm';


const CompleteRegister = () => {
  const [step, setStep] = useState<number>(0);

  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4 ">
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Complete profile</h1>
      <div className='mt-4'>
        {
          (() => {
            switch (step) {
              case 0:
                return(
                  <NamesForm />                
                )
                break;
              default:
                return(
                <div>
                </div>
                )
                
                break;
            }
          })()
        }
        
      </div>
      
    </div>
  )
}

export default CompleteRegister;