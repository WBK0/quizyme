import { useContext } from 'react'
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/Auth/AuthInput';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CompleteRegisterContext } from '../CompleteRegisterProvider';
import { toast } from 'react-toastify';

type FormData = {
  username: string;
};

const schema = yup.object({
  username: yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be at most 20 characters')
    .required('Username is required'),
}).required('Please fill in all required fields');

const UsernameForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) });

  const { formValues, handleChangeForm, setStep, step } = useContext(CompleteRegisterContext);

  const validateUsername = async (value: string) => {
    try {
      const result = await toast.promise(
        async () => {
          const response = await fetch(`/api/auth/complete-register/check-username/${value.trim().replace(/ /g, '_')}`);
          
          if (!response.ok) {
            throw new Error('An error occurred while checking username availability');
          }
          
          return response;
        },
        {
          pending: 'Checking username availability...',
          success: 'Username is available! 🎉',
          error: 'Username is already taken 😢'
        },
        {
          hideProgressBar: true,
          autoClose: 1500
        }
      );

      return result?.ok ?? false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const onSubmit = async (data : FormData) => {
    try {
      const isUsernameAvailable = await validateUsername(data.username);
      if(!isUsernameAvailable){
        throw new Error('Username is already taken');
      }
      handleChangeForm({
        username: data.username.replace(/ /g, '_')
      })
      setStep(step + 1)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col gap-5 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <p className='font-semiBold text-gray-500 text-center'>
        You will be displayed as <span className="font-bold text-black">@{watch('username') ? watch('username').trim().replace(/ /g, '_') : 'username'}</span>
      </p>
      <AuthInput 
        name="username"
        placeholder="Username"
        type="text"
        defaultValue={formValues.username}
        register={register}
        error={errors.username?.message}
      />
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

export default UsernameForm;