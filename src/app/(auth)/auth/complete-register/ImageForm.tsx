import { Resolver, useForm } from 'react-hook-form';
import Image from 'next/image';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import defaultPicture from '@/public/defaultPicture.png';
import brush from '@/public/brush.svg';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const schema = yup.object({
  image: yup.mixed().test(
    'fileSize',
    'Image file is too large',
    (value : any) => !value[0] || (value[0] && value[0].size <= 1024 * 1024)
  )
}).required('Please fill in all required fields');

type FormData = {
  image?: File;
  [key: string]: any;
};

const ImageForm = ({ nextStep, previousStep, value }: { nextStep: (data: {}) => void, previousStep: () => void, value: File }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(value);

  const onSubmit = (data: FormData) => {
    nextStep({
      image: data.image[0] || defaultPicture
    });
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({ resolver: yupResolver(schema) as Resolver });

  useEffect(() => {
    toast.error(errors.image?.message);
  }, [errors])

  useEffect(() => {
    let file = watch('image') as File[];
    console.log(file[0]);

    if (file && file[0]) {
      setSelectedImage(file[0]);
    }
  }, [watch('image')])

  return (
    <form className="flex flex-col gap-5 max-w-sm mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center w-full">
        <label 
          htmlFor="dropzone-file" 
          className="cursor-pointer relative rounded-full"
        >
          <div className='w-full h-full bg-black/0 hover:bg-black/75 duration-300 absolute rounded-full group'>
            <Image src={brush} width={32} height={32} alt="brush" className="mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-0 h-0 group-hover:w-12 group-hover:h-12 duration-300" />
          </div>
          <Image src={selectedImage && URL.createObjectURL(selectedImage) || defaultPicture} width={128} height={128} alt="profile" className="rounded-full mx-auto w-32 h-32" />
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept='image/*'
            {...register('image')}
            
          />
        </label>
      </div>
      <div className='text-sm text-gray-500 text-center py-3'>
        <p
          className=''
        >
          Click on the photo above to edit.
        </p>
        <p>
          Your profile picture will be visible to everyone.
        </p>
        <p>
          For best results, use an image at least 128px by 128px in .jpg or .png format
        </p>
      </div>
      
      <div>
        <button
          type="submit"
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

export default ImageForm;