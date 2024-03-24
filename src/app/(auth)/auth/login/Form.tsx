"use client";
import * as yup from "yup";
import AuthInput from "@/components/Auth/AuthInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
}).required('Please fill in all required fields');

type FormData = {
  email: string;
  password: string;
};

const Form = ({ callbackUrl } : { callbackUrl?: string}) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: yupResolver(schema) });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    if(isSubmitted || isSubmitting) return;
    try {
      toast.promise(
        async() => {
          const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
          });
      
          if(!result?.ok){
            throw new Error('An error occurred while sending the form');
          }

          setIsSubmitted(true);

          setTimeout(() => {
            router.push(callbackUrl || '/');
          }, 3000);
        },
        {
          pending: 'Sending form...',
          success: 'User logged in successfully',
          error: 'Email or password is incorrect'
        },
        {
          hideProgressBar: true,
        }
      )
    } catch (error) {
      console.error(error);
    }  
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput 
        name="email"
        placeholder="Email"
        type="text"
        register={register}
        error={errors.email?.message}
      />
      <AuthInput 
        name="password"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password?.message}
      />  
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
        disabled={isSubmitting || isSubmitted}
      >
        Login
      </button>
    </form>
  )
}
export default Form;