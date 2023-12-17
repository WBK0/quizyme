import SelectInput from "@/components/Create/SelectInput";
import TextareaInput from "@/components/Create/TextareaInput";
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { useContext } from "react";

const Inputs = () => {

  const { register, errors, watch, setValue } = useContext(UseFormContext);

  return (
    <>
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
    </>
  )
}
export default Inputs;