import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { useContext } from "react";

const Fields = ({ disable = false } : { disable?: boolean }) => {
  const { fields, watch, update, register } = useContext(UseFormContext);
  const colors = ['blue', 'red', 'green', 'yellow'];

  const handleIsCorrect = (index: number) => {
    const answers = watch('answers');
    if(answers){
      update(fields.findIndex(field => field.isCorrect), {
        ...answers[fields.findIndex(field => field.isCorrect)],
        isCorrect: false,
      })
      update(index, {
        ...answers[index],
        isCorrect: true,
      })
    }
  }

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
  }

  return (
    <>
      {
        fields.map((field, index) => (
          <div 
            className={`bg-${colors[index % 4]} min-h-fit w-full flex rounded-xl items-center`}
            key={field.id}
          >
            <textarea 
              className="bg-transparent w-full text-white outline-none p-4 font-bold text-lg resize-none overflow-y-hidden h-fit"
              rows={1}
              onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
              {...register(`answers.${index}.answer`)}
              disabled={disable}

            />
            <button 
              type="button"
              className="bg-white h-10 w-10 mr-3 aspect-square rounded-full"
              onClick={() => handleIsCorrect(index)}
            >
              {
                field.isCorrect
                ?
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${colors[index % 4]} mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" />
                  </svg>
                : null
              }
            </button>   
          </div>
        ))
      }
    </>
  )
}
export default Fields;