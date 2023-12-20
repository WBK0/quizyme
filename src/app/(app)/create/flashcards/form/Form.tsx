import { useContext } from "react";
import Fields from "./Fields";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";

const Form = () => {
  const { handleSubmit, append } = useContext(UseFormContext);
  const onSubmit = async (data) => {
    console.log(data);
  }

  const handleAppend = () => {
    append({
      concept: '',
      definition: ''
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-20">
      <div className="flex flex-col gap-3"> 
        <Fields />
        <div className="flex justify-center gap-4 flex-wrap mt-8">
          <button
            type="button"
            onClick={() => handleAppend}
            className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-40"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  )
}
export default Form;