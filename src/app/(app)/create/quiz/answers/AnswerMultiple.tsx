import Fields from "./Fields";
import Buttons from "./Buttons";
import { useContext, useEffect } from "react";
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";

const AnswerMultiple = () => {  
  const { fields, setValue } = useContext(UseFormContext);
  
  useEffect(() => {
    if(
      fields.some(field => field.answer === 'True') && 
      fields.some(field => field.answer === 'False')) {
        console.log('dzialam')
        setValue('answers', [{
          answer: '',
          isCorrect: true
        }, {
          answer: '',
          isCorrect: false
        }])
    }
  }, [])
  
  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <Fields multiChoice={true} />
      <Buttons />
    </div>
  )
}

export default AnswerMultiple;