import Image from "next/image";
import BackButton from "./BackButton";
import StartButton from "./StartButton";

const StartQuiz = async ({ slug, id, type } : { slug: string, id: string, type: 'quiz' | 'flashcards' }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}`);
  const data = await response.json();

  console.log(data)

  return (
    <div className="flex flex-col items-center gap-4 px-3 justify-center min-h-screen">
      <div className="relative">
        <Image src={data.data.image} alt={data.data.title} width={672} height={378} className="aspect-video rounded-2xl shadow-medium shadow-lightblue"/>
        <div className='absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5 bg-lightblue'>
          {data.data.stats[type === 'quiz' ? 'questions' : 'flashcards']} {type === 'quiz' ? 'Questions' : 'Flashcards'}
        </div>
      </div>
      <div className="max-w-2xl">
        <h1 className="font-bold text-center mt-6 text-xl">Guest the questions about <span className="font-black">{data.data.topic}{data.data.topic.includes("!") ? '' : '!'}</span></h1>
      </div>
      <div className="flex gap-4 flex-wrap justify-center mt-6">
        <StartButton id={id} type="quiz" />
        <BackButton quizSlug={slug} type={type} />
      </div>
    </div>
  )
}
export default StartQuiz;