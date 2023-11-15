import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/Auth/AuthInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
}).required('Please fill in all required fields');

type FormData = {
  username: string;
};

const UsernameForm = ({ nextStep, previousStep, value } : { nextStep: (data : {}) => void, previousStep: () => void, value : string }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });
  
  const onSubmit = (data : FormData) => {
    nextStep({
      username: data.username.replace(/ /g, '_')
    });
  }

  return (
    <form className="flex flex-col gap-5 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <p className='font-semiBold text-gray-500 text-center'>
        You will be displayed as <span className="font-bold text-black">@{watch('username') ? watch('username').replace(/ /g, '_') : 'username'}</span>
      </p>
      <AuthInput 
        name="username"
        placeholder="Username"
        type="text"
        defaultValue={value}
        register={register}
        error={errors.username?.message}
      />
      <div>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white"
        >
          Next step
        </button>
        <button
          className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2"
          onClick={previousStep}
        >
          Previous step
        </button>
      </div>
    </form>
  )
}

export default UsernameForm;