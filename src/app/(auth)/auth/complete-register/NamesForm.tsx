import React from 'react'
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/Auth/AuthInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  firstname: yup.string()
    .min(2, 'Firstname must be at least 2 characters')
    .max(20, 'Firstname must be at most 20 characters')
    .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Firstname must contain only letters')
    .required('Firstname is required'),
  lastname: yup.string()
    .min(2, 'Lastname must be at least 2 characters')
    .max(20, 'Lastname must be at most 20 characters')
    .matches(/^[a-zA-ZĄĆĘŁŃÓŚŹŻąćęłńóśźż]+$/, 'Lastname must contain only letters')
    .required('Lastname is required'),
}).required('Please fill in all required fields');

type FormData = {
  firstname: string;
  lastname: string;
};

const NamesForm = ({ nextStep } : { nextStep: () => void}) => {
  
  const onSubmit = () => {
    nextStep();
  }

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

  return (
    <form className="flex flex-col gap-5 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
  )
}

export default NamesForm;