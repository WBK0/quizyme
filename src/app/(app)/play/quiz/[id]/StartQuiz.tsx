import Image from "next/image";

const StartQuiz = async ({ quizSlug } : { quizSlug: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${quizSlug}`);
  const quiz = await response.json();
  
  return (
    <div className="flex flex-col items-center gap-4 px-3 justify-center h-full">
      <div className="relative">
        <Image src={quiz.data.image} alt={quiz.data.title} width={672} height={378} className="aspect-video rounded-2xl shadow-medium shadow-lightblue"/>
        <div className='absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5 bg-lightblue'>
          {quiz.data.stats.questions} Questions
        </div>
      </div>
      <div className="max-w-2xl">
        <h1 className="font-bold text-center mt-6 text-xl">Guest the questions about <span className="font-black">{quiz.data.topic}{quiz.data.topic.includes("!") ? '' : '!'}</span></h1>
      </div>
      <button
        className="bg-black hover:scale-105 duration-300 text-white font-bold py-3 px-16 rounded-full shadow-small shadow-lightblue mt-6"
      >
        START
      </button>
    </div>
  )
}
export default StartQuiz;