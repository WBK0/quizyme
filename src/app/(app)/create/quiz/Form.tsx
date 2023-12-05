import Inputs from "./Inputs";
import Buttons from "./Buttons";
import SwitchAnswers from "./SwitchAnswers";
import QuestionHeading from "./QuestionHeading";

const Form = () => {
  return (
    <form className="flex flex-col gap-4 mt-12">
      <QuestionHeading />
      <Inputs />
      <SwitchAnswers />
      <Buttons />  
    </form>
  )
}
export default Form;