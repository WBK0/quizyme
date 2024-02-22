import SelectInput from "@/components/Create/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Tags from "./Tags";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import TextInput from "@/components/Create/TextInput";
import TextareaInput from "@/components/Create/TextareaInput";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

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
    type?: string;
    mainImage?: string;
    topic?: string;
    description?: string;
    collection?: string;
    visibility?: string;
    points?: string;
    tags?: string[];
  };
  setLocalStorage: (value: {}) => void;
  method: 'create' | 'update';
}

type Collection = {
  id: string;
  name: string;
  image: string;
}[]

const schema = yup.object().shape({
  topic: yup.string()
    .min(3, 'Topic must be at least 3 characters')
    .max(64, 'Topic must be at most 64 characters')
    .required('Topic is required'),
  description: yup.string()
    .min(4, 'Description must be at least 4 characters')
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

const Form = ({ type, localStorage, setLocalStorage, method } : FormProps) => {
  const { register, handleSubmit, setValue, watch, formState: {errors} } = useForm<FormInputs>({ resolver: yupResolver(schema) });
  const [collections, setCollections] = useState<Collection>([]);

  const router = useRouter();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if(!localStorage?.mainImage){
      toast.error('You must upload a main image');
      return;
    }

    setLocalStorage({
      ...localStorage,
      ...data,
      type: type,
    });

    if(method === 'create'){
      router.push(`/create/${type}`)
    }
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

    fetch('/api/collections/list')
    .then(res => {
      res.json()
      .then(data => {
        setCollections(data.collection);
      })
    })
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
        options={collections.map(collection => collection.name)}
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
