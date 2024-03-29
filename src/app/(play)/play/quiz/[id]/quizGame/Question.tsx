import Image from "next/image";

type QuestionProps = {
  gameData: {
    question:{
      question: string;
      image?: string;
    }
  };
}

const Question = ({ gameData } : QuestionProps ) => {
  return (
    <div className="flex flex-col items-center gap-6 w-full px-3">
      {
        gameData?.question?.image
        ? <Image
            src={gameData?.question?.image}
            alt="Question image"
            width={672}
            height={378}
            className="rounded-2xl aspect-video"
          />
        : null
      }
      <h1 className="text-xl font-bold text-center">
        {gameData.question.question}
      </h1>
    </div>
  )
}

export default Question;