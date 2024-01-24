import { useEffect, useState } from "react";
import GameData from "./GameData.types";
import Puzzle from "./answers/Puzzle";
import Quiz from "./answers/Quiz";
import Multiplechoice from "./answers/Multiplechoice";
import TrueFalse from "./answers/TrueFalse";
import { toast } from "react-toastify";

type AnsweredProps = {
  gameData: GameData;
  id: string;
  setAnswered: React.Dispatch<React.SetStateAction<{pointsGet: number, pointsTotal: number, questionsLeft: number} | null>>;
  setStopTimer: React.Dispatch<React.SetStateAction<boolean>>;
  stopTimer: boolean;
}

const Answers = ({ gameData, id, setAnswered, setStopTimer, stopTimer } : AnsweredProps) => {
  const [correctAnswer, setCorrectAnswer] = useState<string | string[] | null>(null);

  useEffect(() => {
    setCorrectAnswer(null);
  }, [gameData])

  const handleSubmit = (answer: string | string[]) => {
    if(correctAnswer || stopTimer) return;

    setStopTimer(true);

    toast.promise(
      async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/answer`, {
          method: 'POST',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            answer: answer
          })
        });
        
        const dataResponse = await response.json();

        setCorrectAnswer(dataResponse.correctAnswer)

        setTimeout(() => {
          setAnswered({pointsGet: dataResponse.pointsGet, pointsTotal: dataResponse.pointsTotal, questionsLeft: dataResponse.questionsLeft});
          setStopTimer(false);
        }, 3200)

        if(!dataResponse.isCorrect){
          throw new Error(dataResponse.message || 'Something went wrong');
        }

        return dataResponse;
      },
      {
        pending: 'Submitting answer...',
        success: 'Correct! Your answer is right.',
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || 'Incorrect! Your answer is wrong' },
      }
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-10">
      {
        (() => {switch (gameData?.question?.type) {
          case 'Puzzle':
            return (
              <Puzzle
                quizAnswers={gameData.question.answers}
                handleSubmit={handleSubmit}
                correctAnswer={correctAnswer}
              />
            );
          case 'Quiz':
            return (
              <Quiz
                answers={gameData.question.answers}
                handleSubmit={handleSubmit}
                correctAnswer={correctAnswer}
              />
            );
          case 'Multiple choice':
            return (
              <Multiplechoice
                quizAnswers={gameData.question.answers}
                handleSubmit={handleSubmit}
                correctAnswer={correctAnswer}
              />
            );
          case 'True / False':
            return (
              <TrueFalse
                answers={gameData.question.answers}
                handleSubmit={handleSubmit}
                correctAnswer={correctAnswer}
              />
            );
          default:
            return null;
        }})()}
    </div>
  )
}

export default Answers;