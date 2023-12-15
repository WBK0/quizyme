import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { useContext, useEffect, useRef } from "react";

type FieldsProps = {
  disable?: boolean;
  multiChoice?: boolean;
}

const Fields = ({ disable = false, multiChoice = false } :  FieldsProps) => {
  const { fields, watch, update, register } = useContext(UseFormContext);
  const inputsRef = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    Object.values(inputsRef.current).forEach(input => {
      if(input) {
        adjustHeight(input as HTMLTextAreaElement)
      }
    })
  }, [watch('answers')])

  const handleIsCorrect = (index: number) => {
    const answers = watch('answers');
    if(answers){
      if(!multiChoice) {
        update(fields.findIndex(field => field.isCorrect), {
          ...answers[fields.findIndex(field => field.isCorrect)],
          isCorrect: false,
        })
      }
      update(index, {
        ...answers[index],
        isCorrect: multiChoice ? !answers[index].isCorrect : true,
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
        fields.map((field, index) => {
          const {ref, ...rest} = register(`answers.${index}.answer`);
          return(
          <div 
            className={`bg-${field.color} min-h-fit w-full flex rounded-xl items-center`}
            key={field.id}
          >
            <textarea 
              className="bg-transparent w-full text-white outline-none p-4 font-bold text-lg resize-none overflow-y-hidden h-fit"
              rows={1}
              onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
              {...rest}
              ref={(e) => {
                ref(e);
                inputsRef.current[field.id] = e as HTMLTextAreaElement | null;
              }}
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
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 text-${field.color} mx-auto`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" />
                  </svg>
                : null
              }
            </button>   
          </div>
        )})
      }
    </>
  )
}
export default Fields;