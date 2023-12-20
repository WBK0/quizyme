import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { useContext } from "react";

const Buttons = () => {
  const { handleSubmit, errors } = useContext(UseFormContext);

  const onSubmit = (data: any) => {
    console.log(data);
  }
  

  return (
    <div className={`xl:absolute right-0 flex flex-col gap-3 items-center pb-12`}>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-48"
        onClick={handleSubmit(onSubmit)}
      >
        Public
      </button>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-48"
      >
        Update Details
      </button>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300 w-48"
      >
        Delete 
      </button>
    </div>        
  )
}

export default Buttons;