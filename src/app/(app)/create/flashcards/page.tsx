"use client";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateFlashcards = () => {
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues: {
      flashcards: [
        { concept: "", definition: "" }
      ]
    }
  
  });
  const { fields, append } = useFieldArray({ name: "flashcards", control, rules: { required: true, minLength: 2, maxLength: 999 } })
  const inputsRef = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const onSubmit = async (data) => {
    console.log(data);
  }

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto px-3">
        <div className="flex flex-col gap-8">
          <h1 className="text-center font-black uppercase text-3xl">Add flashcards</h1>
          <p className="text-center font-semibold">You have currently created {fields.length} flashcards in this set</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-24">
          <div className="flex flex-col gap-3"> 
            {
              fields.map((field, index) => {
                const {ref, ...rest} = register(`flashcards.${index}.concept`);

                return(
                  <div className="flex gap-0 w-full h-fit flex-wrap">
                    <textarea 
                      rows={1}
                      className="bg-yellow text-black font-bold resize-none px-2 py-3 md:rounded-l-xl rounded-xl md:rounded-none md:border-r-2 outline-none rounded-b-none border-black md:w-1/3 w-full placeholder:text-gray-900 placeholder:font-semibold placeholder:opacity-75"
                      {...register(`flashcards.${index}.concept`)}
                      onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
                      placeholder={index === 0 ? "Concept..." : ""}
                    />
                    <textarea 
                      rows={1}
                      className="bg-yellow text-black font-bold resize-none px-2 py-3 md:rounded-r-xl rounded-b-xl rounded-t-none md:rounded-none border-t-2 md:border-t-0 md:border-l-2 border-black outline-none w-full md:w-2/3 placeholder:text-gray-900 placeholder:font-semibold placeholder:opacity-75"
                      {...register(`flashcards.${index}.definition`)}
                      onInput={index  === fields.length - 1 && watch('flashcards')[index]?.concept !== '' ? () => append({}) : () => {}}
                      placeholder={index === 0 ? "Definition..." : ""}

                    />
                  </div>
                )
              })
            }
            <button
              type="button"
              onClick={() => append({})}
            >
              Add
            </button>
          </div>
          <button
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default CreateFlashcards;