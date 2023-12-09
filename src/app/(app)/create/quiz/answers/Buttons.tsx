import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { useContext } from "react";

const Buttons = () => {
  const { fields, append, update, remove } = useContext(UseFormContext);

  const handleAddAnswer = () => {
    if(fields.length === 4) return;
      append({
        answer: "",
        isCorrect: false,
        color: !fields.some(field => field.color === 'blue') ? 'blue' : 
               !fields.some(field => field.color === 'red') ? 'red' : 
               !fields.some(field => field.color === 'green') ? 'green' 
               : 'yellow',
      })
  }

  const handleDeleteAnswer = () => {
    if(fields[fields.length - 1].isCorrect){
      update(fields.length - 2, {
        ...fields[fields.length - 2],
        isCorrect: true,
      })
    }
    remove(fields.length - 1);
  }

  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {
        fields.length > 2
        ?
          <button
            type="button"
            className="rounded-full sm:px-12 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300 flex-1 sm:flex-none"
            onClick={handleDeleteAnswer}
          >
            Delete
          </button>
        : null
      }
      {
        fields.length < 4
        ?
          <button
            type="button"
            className="rounded-full sm:px-12 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-yellow hover:scale-105 duration-300 flex-1 sm:flex-none"
            onClick={handleAddAnswer}
          >
            Add
          </button>
        : null
      }
    </div>
  )
}
export default Buttons;