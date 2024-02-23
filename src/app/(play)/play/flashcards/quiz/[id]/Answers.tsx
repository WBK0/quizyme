import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Quiz from "../../../quiz/[id]/quizGame/answers/Quiz";
import TrueFalse from "../../../quiz/[id]/quizGame/answers/TrueFalse";
import GameData from "./GameData.type";

type AnsweredProps = {
  gameData: GameData;
  id: string;
  setAnswered: React.Dispatch<React.SetStateAction<{questionsLeft: number, correctAnswers?: number} | null>>;
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz/answer`, {
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
          setAnswered((prev) => ({questionsLeft: dataResponse.questionsLeft, correctAnswers: dataResponse.correctAnswers || prev?.correctAnswers}));
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
          case 'Quiz':
            return (
              <Quiz
                answers={gameData.question.answers}
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