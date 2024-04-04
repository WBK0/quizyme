import { useEffect, useState } from "react";
import GameData from "../GameData.types";

type MultiplechoiceProps = {
  quizAnswers: GameData['question']['answers'];
  handleSubmit: (answer: string | string[]) => void;
  correctAnswer: string | string[] | null;
};

const Multiplechoice = ({ quizAnswers, handleSubmit, correctAnswer } : MultiplechoiceProps ) => {
  const [answers, setAnswers] = useState<GameData['question']['answers']>(quizAnswers);

  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow']

  useEffect(() => {
    setAnswers(quizAnswers);
  }, [quizAnswers])

  useEffect(() => {
    answers.forEach((element, index) => {
      answers[index]['isCorrect'] = false;
    });
  }, [])

  const handleChangeIsCorrect = (index: number) => {
    const newIsCorrectValue = !answers[index]['isCorrect'];
  
    setAnswers((prevAnswers) => {
      let temp = [...prevAnswers];
  
      temp[index]['isCorrect'] = newIsCorrectValue;
  
      return temp;
    });
  }
    
  return (
    <div className="flex flex-wrap">
      <div
        className={`grid sm:grid-cols-2 ${answers.length === 3 ? 'lg:grid-cols-3' : answers.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-2'} grid-cols-1 grid-flow-row w-full lg:px-3`}
      >
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`${correctAnswer && !correctAnswer.includes(answer.id) && 'opacity-50'} gap-4 mx-[2.65%] my-2.5 min-h-[240px] ${colors[index]} cursor-pointer rounded-xl px-3 py-12 text-white font-bold flex items-center relative`}
            onClick={() => handleChangeIsCorrect(index)}
          >
            <h1 className="text-center w-full text-xl">{answer.answer}</h1>
            <div
              className="bg-white rounded-full absolute top-3 right-3 w-8 h-8 flex items-center justify-center"
            >
              {
                answer.isCorrect ?
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 24 24"> 
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285"/>
                </svg>   
                : null
              }      
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="bg-black text-white px-16 rounded-full py-2.5 font-bold w-fit mx-auto hover:bg-white hover:text-black duration-300 hover:ring-2 hover:ring-black my-8"
        onClick={() => handleSubmit(answers.filter((answer) => answer.isCorrect).map((answer) => answer.id))}
      >
        SUBMIT
      </button>
    </div>
  )
}
export default Multiplechoice;