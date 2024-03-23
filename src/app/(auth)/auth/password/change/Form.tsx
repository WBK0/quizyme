"use client";
import { useState } from "react";
import Image from "next/image";
import caution from "@/public/caution.png"
import eye from "@/public/eye.png";
import blind from "@/public/blind.png";
import * as yup from 'yup';

type DynamicType = {
  newPassword: 'password' | 'text';
  repeatPassword: 'password' | 'text';
}

type Error = {
  newPassword: string | null;
  repeatPassword: string | null;
}

const schema = yup.object().shape({
  newPassword: yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password must not exceed 24 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('Password is required'),
  repeatPassword: yup.string()
    .oneOf([yup.ref('password'), ''], 'Passwords must match')
    .required('Repeat password is required')
});

const Form = () => {
  const [error, setError] = useState<Error>();
  const [dynamicType, setDynamicType] = useState<DynamicType>({ newPassword: 'password', repeatPassword: 'password' });
  const [values, setValues] = useState<{ newPassword: string, repeatPassword: string }>({ newPassword: '', repeatPassword: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  const handleChangeType = (type: 'newPassword' | 'repeatPassword') => {
    if(dynamicType[type] === 'text'){
      setDynamicType({ ...dynamicType, [type]: 'password' });
    }else{
      setDynamicType({ ...dynamicType, [type]: 'text' });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await schema.validate({ newPassword: values.newPassword, repeatPassword: values.repeatPassword }, { abortEarly: false });
      setError({ newPassword: null, repeatPassword: null });

      

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = {} as Error;
        err.inner.forEach(e => {
          errors[e.path as keyof Error] = e.message;
        });
        setError(errors);
      }
    }
  }
  

  return (
    <form className="max-w-sm w-full mt-8 px-3 flex flex-col gap-5" onSubmit={(e) => handleSubmit(e)}>
      <div className="relative">
        <input 
          type={dynamicType.newPassword}
          placeholder="New Password"
          className={`w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-black ${error?.newPassword ? 'ring-2 ring-red' : ''}`}
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
        >
        </input>
        <div className="group">
          {error?.newPassword && 
            <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
              <Image src={caution} width={24} height={24} alt="error" />
            </i>
          }
          <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
            {error?.newPassword}
          </span>
        </div>
        <i className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${error?.newPassword ? 'right-9' : 'right-2'}`} onClick={() => handleChangeType('newPassword')}>
          <Image src={dynamicType.newPassword === 'password' ? eye : blind} width={24} height={24} alt="error" />
        </i>
      </div>
      <div className="relative">
        <input 
          type={dynamicType.repeatPassword}
          placeholder="Repeat Password"
          className={`w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-black ${error?.repeatPassword ? 'ring-2 ring-red' : ''}`}
          name="repeatPassword"
          value={values.repeatPassword}
          onChange={handleChange}
        >
        </input>
        <div className="group">
          {error?.repeatPassword && 
            <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
              <Image src={caution} width={24} height={24} alt="error" />
            </i>
          }
          <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
            {error?.repeatPassword}
          </span>
        </div>
        <i className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer ${error?.repeatPassword ? 'right-9' : 'right-2'}`} onClick={() => handleChangeType('repeatPassword')}>
          <Image src={dynamicType.repeatPassword === 'password' ? eye : blind} width={24} height={24} alt="error" />
        </i>
      </div>
      <button className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300">
        Change password
      </button>
    </form>
  )
}

export default Form;