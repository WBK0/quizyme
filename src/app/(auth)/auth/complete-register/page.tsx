"use client";
import React from 'react'
import Image from 'next/image';
import logo from '@/public/logo.svg';
import AuthInput from '@/components/Auth/AuthInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstname: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  lastname: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must not exceed 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
}).required('Please fill in all required fields');

type FormData = {
  firstname: string;
  lastname: string;
};

const CompleteRegister = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = () => {

  }

  return (
    <div className="max-w-sm mx-auto flex h-screen flex-col justify-center px-3 gap-4">
      <Image src={logo} width={150} height={150} alt="logo"
        className="mx-auto mb-4"
      />
      <h1 className="font-black text-4xl text-center">Complete profile</h1>
      <div className='mt-4'>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          <AuthInput 
            name="firstname"
            placeholder="Firstname"
            type="text"
            register={register}
            error={errors.firstname?.message}
          />
          <AuthInput 
            name="lastname"
            placeholder="Lastname"
            type="text"
            register={register}
            error={errors.lastname?.message}
          />
          <button
            className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white"
          >
            Next step
          </button>
        </form>
      </div>
      
    </div>
  )
}

export default CompleteRegister;