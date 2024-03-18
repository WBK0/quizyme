import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import caution from '@/public/caution.png';
import { CompleteRegisterContext } from '../CompleteRegisterProvider';

const schema = yup.object({
  bio: yup.string()
    .max(1024, 'Firstname must be at most 1024 characters')
}).required('Please fill in all required fields');

type FormData = {
  bio?: string;
};

const AboutForm = () => {
  const { formValues, handleChangeForm, setStep, step } = useContext(CompleteRegisterContext);

  const onSubmit = (data : FormData) => {
    handleChangeForm({
      bio: data.bio
    })
    setStep(step + 1)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">  
        <textarea 
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg text-black"
          placeholder="Tell something about yourself..."
          {...register("bio")}
          rows={6}
          defaultValue={formValues.bio}
        />
        <div className="group">
          {errors.bio?.message && 
            <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
              <Image src={caution} width={24} height={24} alt="error" />
            </i>
          }
          <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
            {errors.bio?.message}
          </span>
        </div>
      </div>
      
      <div>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
        >
          Next step
        </button>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2 hover:scale-105 duration-300"
          onClick={() => setStep(step - 1)}
        >
          Previous step
        </button>
      </div>
    </form>
  )
}

export default AboutForm;