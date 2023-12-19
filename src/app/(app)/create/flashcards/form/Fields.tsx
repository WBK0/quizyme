import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { useContext } from "react";

const Fields = () => {
  const { fields, register, watch, append } = useContext(UseFormContext);

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
  }

  return (
    <>
      {
        fields.map((field, index) => {
          const {ref, ...rest} = register(`flashcards.${index}.concept`);

          return(
            <div className="flex gap-0 w-full h-fit flex-wrap" key={field.id}>
              <textarea 
                rows={1}
                className="bg-yellow text-black font-bold resize-none px-2 py-3 md:rounded-l-xl rounded-xl md:rounded-none md:border-r-2 outline-none rounded-b-none border-black md:w-1/3 w-full placeholder:text-gray-900 placeholder:font-semibold placeholder:opacity-75"
                {...register(`flashcards.${index}.concept`)}
                onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
              />
              <textarea 
                rows={1}
                className="bg-yellow text-black font-bold resize-none px-2 py-3 md:rounded-r-xl rounded-b-xl rounded-t-none md:rounded-none border-t-2 md:border-t-0 md:border-l-2 border-black outline-none w-full md:w-2/3 placeholder:text-gray-900 placeholder:font-semibold placeholder:opacity-75"
                {...register(`flashcards.${index}.definition`)}
                onInput={index  === fields.length - 1 && watch('flashcards')[index]?.concept !== '' ? () => append({}) : (e) => {adjustHeight(e.target as HTMLTextAreaElement)}}
              />
            </div>
          )
        })
      }
    </>
  )
}
export default Fields