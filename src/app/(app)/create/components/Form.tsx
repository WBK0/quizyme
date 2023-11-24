import SelectInput from "@/components/Create/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Tags from "./Tags";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import TextInput from "@/components/Create/TextInput";
import TextareaInput from "@/components/Create/TextareaInput";
import { toast } from "react-toastify";
import { useEffect } from "react";

type FormInputs = {
  topic: string,
  description: string;
  collection: string;
  visibility: string;
  points: string;
  tags: string[];
}

type FormProps = {
  type: string;
  localStorage: {
    mainImage?: string;
    topic?: string;
    description?: string;
    collection?: string;
    visibility?: string;
    points?: string;
    tags?: string[];
  };
  setLocalStorage: (value: {}) => void;
}

const schema = yup.object().shape({
  topic: yup.string()
    .min(3, 'Topic must be at least 8 characters')
    .max(64, 'Topic must be at most 100 characters')
    .required('Topic is required'),
  description: yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(1024, 'Description must be at most 1024 characters')
    .required('Description is required'),
  collection: yup.string()
    .required('Collection is required'),
  visibility: yup.string()
    .required('Visibility is required'),
  points: yup.string()
    .required('Points is required'),
  tags: yup.array()
    .min(1, 'At least one tag is required')
    .max(5, 'You can only add up to 5 tags')
    .test({
      name: 'maxTagLength',
      message: 'Tag must be at most 16 characters',
      test: (tags) => !tags || tags.every(tag => tag.length <= 16),
    })
    .required('Tags is required'),
});

const Form = ({ type, localStorage, setLocalStorage } : FormProps) => {
  const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if(!localStorage?.mainImage){
      toast.error('You must upload a main image');
      return;
    }

    setLocalStorage({
      ...localStorage,
      ...data
    });

    router.push(`/create/${type}`)
  };

  useEffect(() => {
    if(localStorage){
      setValue('topic', localStorage.topic || '');
      setValue('description', localStorage.description || '');
      setValue('collection', localStorage.collection || '');
      setValue('visibility', localStorage.visibility || 'Public');
      setValue('points', localStorage.points || 'Based on answer time');
      setValue('tags', localStorage.tags || []);
    }
  }, []);

  return (
    <form className="flex flex-wrap flex-col gap-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
      <TextInput 
        register={register}
        name="topic"
        error={errors.topic?.message}
      />
      <TextareaInput
        register={register}
        name="description"
        error={errors.description?.message}
      />
      <SelectInput
        title="Collection"
        options={["Sports", "Science", "History", "Geography", "Art", "Music", "Literature", "Movies", "TV Shows", "Video Games", "Animals", "Food", "General Knowledge"]}
        register={register}
        name="collection"
        setValue={setValue}
        watch={watch}
        error={errors.collection?.message}
      />
      <SelectInput
        title="Visibility"
        options={["Public", "Code only"]}
        defaultValue="Public"
        register={register}
        name="visibility"
        setValue={setValue}
        watch={watch}
        error={errors.visibility?.message}
      />
      {
        type === 'quiz' && (
          <SelectInput
            title="Points"
            options={["Based on answer time", "Constant", "Disabled"]}
            defaultValue="Based on answer time"
            register={register}
            name="points"
            setValue={setValue}
            watch={watch}
            error={errors.points?.message}
          />
        )
      }      
      <Tags
        register={register}
        setValue={setValue}
        error={errors.tags?.message}
        watch={watch}
      />
      <button
        className="mx-auto rounded-full px-8 py-3 outline-none font-bold text-lg bg-black text-white mt-16 box-shadow shadow-small shadow-blue hover:scale-105 duration-300"
      >
        ADD {type === 'quiz' ? 'QUESTIONS' : 'FLASHCARDS'}
      </button>
    </form>
  );
};

export default Form;
