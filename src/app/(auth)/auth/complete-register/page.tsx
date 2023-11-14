"use client";
import { useState } from 'react';
import Image from 'next/image';
import logo from '@/public/logo.svg';
import NamesForm from './NamesForm';
import UsernameForm from './UsernameForm';
import AboutForm from './AboutForm';
import InterestForm from './InterestForm';
import ImageForm from './ImageForm';

export type FormData = {
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  interests: string[];
  image?: any;
};

const CompleteRegister = () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    username: '',
    bio: '',
    interests: [],
    image: null
  });

  const nextStep = (data : Partial<FormData>) => {
    setFormData({...formData, ...data} as FormData);
    setStep(step + 1);
  }

  const previousStep = () => {
    setStep(step - 1);
  }

  return (
    <div className="max-w-lg mx-auto flex min-h-screen flex-col justify-center px-3 gap-4 relative py-16">
      <div className='absolute top-6 w-full left-0'>
        <div className='w-2/3 max-w-sm md:w-full bg-gray-300 h-4 mx-auto rounded-full relative'>
          <div className={`absolute left-0 h-4 bg-green rounded-xl duration-500`} style={{width: `${((step + 1) * 100) / 5}%`}}>
          </div>
        </div>
      </div>
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
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
                    nextStep={nextStep}
                    values={{firstname: formData.firstname, lastname: formData.lastname}}
                  />                
                )
              case 1: 
                return(
                  <UsernameForm 
                    nextStep={nextStep}
                    previousStep={previousStep}
                    value={formData.username}
                  />
                )
              case 2:
                return(
                  <ImageForm
                    nextStep={nextStep}
                    previousStep={previousStep}
                    value={formData.image}
                  />
                )
              case 3:
                return(
                  <AboutForm
                    nextStep={nextStep}
                    previousStep={previousStep}
                    value={formData.bio}
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
    </div>
  )
}

export default CompleteRegister;