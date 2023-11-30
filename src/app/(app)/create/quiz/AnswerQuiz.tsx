import { useState } from "react";

const AnswerQuiz = () => {
  const [answers, setAnswers] = useState([
    {
      answer: "",
      isCorrect: true,
    }
  ]);

  const colors = ['blue', 'red', 'green', 'yellow'];

  const handleIsCorrect = (index: number) => {
    setAnswers(
      answers.map((answer, i) => {
        if(i === index){
          return {
            ...answer,
            isCorrect: true,
          }
        }
        return {
          ...answer,
          isCorrect: false,
        }
      })
    )
  }

  const adjustHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
  }

  const handleAddAnswer = () => {
    if(answers.length === 4) return;
    setAnswers([
      ...answers,
      {
        answer: "",
        isCorrect: false,
      }
    ])
  }

  const handleDeleteAnswer = () => {
    setAnswers(
      answers.filter((answer, index) => index !== answers.length - 1)
    )
  }

  return (
    <div className="mt-4 mb-12 flex flex-col gap-4">
      <h3 className="font-bold text-lg">
        Answers
      </h3>
      {
        answers.map((answer, index) => (
          <div className={`bg-${colors[index % 4]} min-h-fit w-full flex rounded-xl items-center`}>
            <textarea 
              className="bg-transparent w-full text-white outline-none p-4 font-bold text-lg resize-none overflow-y-hidden h-fit"
              rows={1}
              onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
            />
            <button 
              type="button"
              className="bg-white h-10 w-10 mr-3 aspect-square rounded-full"
              onClick={() => handleIsCorrect(index)}
            >
              {
                answer.isCorrect
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
      <div className="flex justify-center gap-6 flex-wrap">
        {
          answers.length > 1
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
          answers.length < 4
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
    </div>
  )
}
export default AnswerQuiz;