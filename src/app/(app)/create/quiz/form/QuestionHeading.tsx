import { DataContext } from "@/providers/create-quiz/DataProvider";
import { useContext } from "react";

const QuestionHeading = () => {
  const { formValues, actualQuestion } = useContext(DataContext);

  return (
    <h6 className="text-right font-bold text-lg">
      {
        actualQuestion === formValues.length
        ? `${formValues.length} questions`
        : 
          actualQuestion > (formValues.length || 0)
          ? `You published quiz. Have a nice day! :)`
          : `You are viewing at ${actualQuestion + 1} of ${(formValues.length + 1) || 0} questions`
      }
    </h6>
  )
}
export default QuestionHeading;