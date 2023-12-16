import { useContext, useEffect, useState } from "react";
import { onSubmit } from "./submitForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { DataContext } from "@/providers/create-quiz/DataProvider";
import { useRouter } from "next/navigation";

const QuizButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const handleShowButtons = () => {
    setShowButtons(!showButtons);
  }

  return (
    <div className="xl:absolute relative flex flex-col gap-4 xl:top-0 left-1/2 transform -translate-x-1/2 xl:right-0 xl:translate-x-0 xl:left-auto xl:mt-0 w-full xl:w-fit">
      <div className="xl:hidden justify-end flex">
        <button className="flex font-bold items-center" onClick={handleShowButtons}>
          <p>
            Quiz options
          </p> 
          <svg
            width="32"
            height="32"
            viewBox="0 6 32 20"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all ${showButtons ? 'rotate-0' : 'rotate-90'} duration-300`}
          >
            <path d="M6 10l10 10 10-10" />
          </svg>
        </button>
      </div>
      <div className="xl:hidden flex gap-3 flex-col">
        {
          showButtons
          ? <Buttons />
          : null
        } 
      </div>
      <div className="hidden xl:flex xl:flex-col gap-4">
        <Buttons />
      </div>
    </div>
  )
}

const Buttons = () => {
  const [ value, setValue, removeLocalStorage ] = useLocalStorage('create-form', {});
  const { setFormValues } = useContext(DataContext);
  const router = useRouter();

  console.log(value)

  const deleteQuiz = () => {
    removeLocalStorage();
    router.push('/create');
  }

  return(
    <>
      <button
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300"
        onClick={deleteQuiz}
      >
        Delete quiz
      </button>
      <button
        type="button"
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300"
        onClick={() => onSubmit({formValues: value, setFormValues, removeLocalStorage, router})}
      >
        Public quiz
      </button>
    </>
  )
}

export default QuizButtons;