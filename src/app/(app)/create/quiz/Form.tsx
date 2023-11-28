import SelectInput from "@/components/Create/SelectInput";
import TextareaInput from "@/components/Create/TextareaInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from 'yup';

type FormInputs = {
  question: string;
  answerTime: string;
  answerPoints: string;
  responseType: string;
}

const schema = yup.object().shape({
  question: yup.string()
    .min(4, 'Description must be at least 4 characters')
    .max(512, 'Description must be at most 512 characters')
    .required('Description is required'),
  answerTime: yup.string()
    .required('Answer time is required'),
  answerPoints: yup.string()
    .required('Answer points is required'),
  responseType: yup.string()
    .required('Response type is required'),
});

const Form = () => {
  const { register, formState: { errors }, setValue, watch, handleSubmit } = useForm<FormInputs>({ resolver: yupResolver(schema) });

  return (
    <form className="flex flex-col gap-4 mt-12">
      <TextareaInput
        register={register}
        name="question"
        error={errors.question?.message}
      />
      <SelectInput
        title="Time to answer"
        options={["10 s", "15 s", "30 s", "45 s", "60 s", "90 s", "120 s"]}
        register={register}
        name="answerTime"
        defaultValue="30 s"
        setValue={setValue}
        watch={watch}
        error={errors.answerTime?.message}
      />
      <SelectInput
        title="Points for answer"
        options={["100", "150", "250", "400", "500", "750", "1000", "1250", "1500"]}
        register={register}
        name="answerPoints"
        defaultValue="500"
        setValue={setValue}
        watch={watch}
        error={errors.answerPoints?.message}
      />
      <SelectInput
        title="Type of response"
        options={["Quiz", "Puzzle", "True / False", "Multiple choice"]}
        register={register}
        name="responseType"
        defaultValue="Quiz"
        setValue={setValue}
        watch={watch}
        error={errors.responseType?.message}
      />
      <div className="flex justify-between md:flex-row flex-col gap-4">
        <button
          className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-60"
        >
          Previous question
        </button>
        <button
          className="mx-auto rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-60"
        >
          Add question
        </button>
      </div>
      
    </form>
  )
}
export default Form;