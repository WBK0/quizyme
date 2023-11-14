"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AuthInput from "@/components/Auth/AuthInput";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useState } from "react";

const schema = yup.object({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must not exceed 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required')
}).required('Please fill in all required fields');

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const Form = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      toast.promise(
        async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            throw new Error('An error occurred while sending the form');
          }else{
            setTimeout(() => {
              signIn('credentials', {
                email: data.email,
                password: data.password,
                callbackUrl: '/auth/complete-register'
              });
            }, 2500);
          }
          return response.json();
        },
        {
          pending: 'Sending form...',
          success: 'User created successfully!',
          error: 'User already exists!'
        },
        {
          hideProgressBar: true,
        }
      )

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col mt-8 gap-5" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput 
        register={register}
        name="email"
        error={errors.email?.message}
        placeholder="Email"
        type="text"
      />
      <AuthInput
        register={register}
        name="password"
        error={errors.password?.message}
        placeholder="Password"
        type="password"
      />
      <AuthInput
        register={register}
        name="repeatPassword"
        error={errors.repeatPassword?.message}
        placeholder="Repeat password"
        type="password"
      />
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white"
      >
        Register
      </button>
    </form>
  )
}
export default Form;