import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import Fields from "./Fields";
import { useContext, useEffect } from "react";
import { DataContext } from "@/providers/create-quiz/DataProvider";

const AnswerBoolean = () => {
  const { formValues } = useContext(DataContext);
  const { setValue } = useContext(UseFormContext);

  useEffect(() => {
    setValue("answers", [
      { answer: "True", isCorrect: true },
      { answer: "False", isCorrect: false },
    ])
  }, [formValues])

  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <Fields
        disable={true}
      />
    </div>
  )
}
export default AnswerBoolean;