import Buttons from "./Buttons";
import { useContext, useEffect } from "react";
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import PuzzleFields from "./PuzzleFields";

const AnswerPuzzle = () => {  
  const { fields, setValue } = useContext(UseFormContext);
  
  useEffect(() => {
    if(
      fields.some(field => field.answer === 'True') && 
      fields.some(field => field.answer === 'False')) {
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
      <PuzzleFields />
      <Buttons />
    </div>
  )
}

export default AnswerPuzzle;