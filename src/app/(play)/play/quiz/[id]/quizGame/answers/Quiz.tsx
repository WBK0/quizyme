import GameData from "../GameData.types";

type QuizProps = {
  answers: GameData['question']['answers'];
  handleSubmit: (answer: string | string[]) => void;
  correctAnswer: string | string[] | null;
};

const Quiz = ({ answers, handleSubmit, correctAnswer } : QuizProps) => {
  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow']

  return (
    <div
      className={`grid sm:grid-cols-2 lg:grid-cols-${answers.length} grid-cols-1 grid-flow-row w-full lg:px-3 xl:px-6`}
    >
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`${correctAnswer && correctAnswer !== answer.id && 'opacity-50'} gap-4 my-2.5 mx-[2.65%] min-h-[240px] ${colors[index]} cursor-pointer rounded-xl px-3 py-12 text-white font-bold flex items-center relative hover:scale-105 duration-300`}
          onClick={() => handleSubmit(answer.id)}
       >
          <h1 className="text-center w-full text-xl">{answer.answer}</h1>
        </div>
      ))}
    </div>
  )
}

export default Quiz;