import { useContext } from "react";
import Fields from "./Fields";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";

const Form = () => {
  const { handleSubmit, fields, register, append, watch, remove } = useContext(UseFormContext);
  const onSubmit = async (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
      <div className="flex flex-col gap-3"> 
        <div className="flex gap-0 w-full">
          <p className="w-1/3 pl-1 font-semibold text-gray-700">
            Concept
          </p>
          <p className="w-2/3 pl-1 font-semibold text-gray-700">
            Definition
          </p>
        </div>
        <Fields />
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          <button
            type="button"
            onClick={() => append({})}
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-40"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => remove(fields.length - 1)}
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300 w-40"
          >
            Remove
          </button>
        </div>
      </div>
    </form>
  )
}
export default Form;