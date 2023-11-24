import SelectInput from "@/components/Create/SelectInput";
import { SubmitHandler, useForm } from "react-hook-form";
import Tags from "./Tags";

type FormInputs = {
  topic: string,
  description: string;
}

const Form = ({ type } : { type: string }) => {

  const { register, handleSubmit, setValue, watch } = useForm<FormInputs>();
  
  const onSubmit : SubmitHandler<FormInputs> = (data) => {
    console.log(data)  
  }

  return (
    <form className="flex flex-wrap flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Topic"
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black mt-5"
        {...register('topic')}
      />
      <textarea
        placeholder="Description"
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black mt-5"
        rows={5}
        {...register('description')}
      />
      <SelectInput
        title="Collection"
        options={["Sports", "Science", "History", "Geography", "Art", "Music", "Literature", "Movies", "TV Shows", "Video Games", "Animals", "Food", "General Knowledge"]}
        register={register}
        name="collection"
        setValue={setValue}
        watch={watch}
      />
      <SelectInput
        title="Visibility"
        options={["Public", "Code only"]}
        defaultValue="Public"
        register={register}
        name="visibility"
        setValue={setValue}
        watch={watch}
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
          />
        )
      }      
      <Tags />
      <button
        className="mx-auto rounded-full px-8 py-3 outline-none font-bold text-lg bg-black text-white mt-16 box-shadow shadow-small shadow-blue hover:scale-105 duration-300"
      >
        ADD {type === 'quiz' ? 'QUESTIONS' : 'FLASHCARDS'}
      </button>
    </form>
  );
};

export default Form;
