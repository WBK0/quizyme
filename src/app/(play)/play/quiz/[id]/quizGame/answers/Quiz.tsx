import GameData from "../GameData.types";

const Quiz = ({ answers } : { answers: GameData['question']['answers']}) => {
  const colors = ['bg-red', 'bg-blue', 'bg-green', 'bg-yellow']

  return (
    <div
      className="grid md:grid-cols-4 grid-cols-1 grid-flow-row w-full lg:px-3 cursor-pointer"
    >
      {answers.map((answer, index) => (
        <div
          key={index}
          className={`gap-4 mx-2.5 my-2.5 min-h-[240px] ${answer.color || colors[index]} rounded-xl px-3 py-12 text-white font-bold flex items-center relative hover:scale-105 duration-300`}
        >
          <h1 className="text-center w-full text-xl">{answer.answer}</h1>
        </div>
      
      ))}
    </div>
  )
}

export default Quiz;