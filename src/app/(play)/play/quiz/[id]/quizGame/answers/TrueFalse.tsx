import GameData from "../GameData.types";

type TrueFalseProps = {
  answers: GameData['question']['answers'];
  handleSubmit: (answer: string | string[]) => void;
  correctAnswer: string | string[] | null;
};

const TrueFalse = ({ answers, handleSubmit, correctAnswer } : TrueFalseProps) => {
  const colors = ['bg-green', 'bg-red']

  return (
    <div
      className="grid sm:grid-cols-2 grid-cols-1 grid-flow-row w-full lg:px-3 max-w-4xl mx-auto"
    >
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`${correctAnswer && correctAnswer !== answer.id && 'opacity-50'} gap-4 mx-[2.65%] my-2.5 min-h-[240px] ${colors[index]} cursor-pointer rounded-xl px-3 py-12 text-white font-bold flex items-center relative hover:scale-105 duration-300`}
          onClick={() => handleSubmit(answer.id)}
        >
          <h1 className="text-center w-full text-xl">{answer.answer}</h1>
        </div>     
      ))}
    </div>
  )
}

export default TrueFalse;