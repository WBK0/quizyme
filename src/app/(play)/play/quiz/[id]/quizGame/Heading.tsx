import { useEffect, useState } from "react";
import GameData from "./GameData.types";
import { toast } from "react-toastify";

type HeadingProps = {
  gameData: GameData;
  stopTimer: boolean;
  answered: {pointsGet: number, pointsTotal: number, questionsLeft: number} | null;
  setAnswered: React.Dispatch<React.SetStateAction<{pointsGet: number, pointsTotal: number, questionsLeft: number} | null>>;
  getQuestion: () => void;
}

const Heading = ({ gameData, stopTimer, answered, setAnswered, getQuestion } : HeadingProps) => {
  const maxTime = gameData?.question?.time * 1000;
  const [time, setTime] = useState<number>(gameData?.question?.time * 1000);

  const setTimer = () => {
    setTime((new Date(gameData.timeToRespond).getTime() - new Date().getTime() - 2500) > 0 ? (new Date(gameData.timeToRespond).getTime() - new Date().getTime() - 2500) : 0);
  }

  useEffect(() => {
    setTimer();
  }, [gameData?.question])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => Number(((prev - 10) / 10).toFixed(0.01)) * 10);
    }, 10);

    if(stopTimer){
      clearInterval(intervalId)
    }

    document.addEventListener('visibilitychange', setTimer);

    return () => {
      document.removeEventListener('visibilitychange', setTimer);
      clearInterval(intervalId)
    };
  }, [gameData?.question, stopTimer])

  const percentage = (time * 100) / maxTime;

  if(time === 0){
    if(!answered){
      setAnswered({pointsGet: 0, pointsTotal: gameData.points, questionsLeft: gameData.numberOfQuestions - gameData.actualQuestion - 1})
    }
  }

  const handleEndGame = async () => {
    toast.promise(
      async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${gameData.id}/end`, {
          method: 'POST',
          cache: 'no-cache',
        });
    
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message || 'Something went wrong');
        }

        getQuestion();

        return data;
      },
      {
        pending: 'Submitting end game request...',
        success: 'Game ended successfully!',
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || 'An error occurred while ending the game' },
      }
    )
  }

  return (
    <div className="bg-white w-full flex flex-wrap items-center md:gap-32 gap-4 top-0 left-0 absolute px-3 pt-3">
      <div className="flex-1 md:flex-none">
        <h6 className="font-bold text-lg w-fit">{gameData.actualQuestion + 1} / {gameData.numberOfQuestions}</h6>
      </div>
      <div 
        className="relative bg-gray-300 rounded-full h-2 flex-auto order-last md:order-none md:w-fit w-full duration-1000"
        style={{
          scale: percentage < 25 ? Number(percentage.toFixed(0)) % 2 === 0 ? 1.01 : 1.04 : 1,
        }}
      >
        <div 
          className="h-2 rounded-full" 
          style={{
            width: (percentage <= 100 ? percentage + "%" : "100%"),
            backgroundColor: `${
              percentage > 55 ? 'rgb(148, 211, 156)'
              : percentage > 50 ? `rgb(${(55 - percentage) * 20 + 148}, ${211 - (55 - percentage) * 4.8}, ${156 - (55 - percentage) * 13.6})`
              : percentage > 30 ? 'rgb(249, 187, 88)'
              : percentage > 25 ? `rgb(${(30 - percentage) * 1.2 + 249}, ${187 - (30 - percentage) * 24.8}, ${88 - (30 - percentage) * 0.6})`
              : 'rgb(255, 45, 85)'
            }`
          }}
        ></div>
      </div>
      <div className="flex-1 md:flex-none justify-end flex">
        <button 
          className="bg-red text-white px-6 rounded-full py-1 font-bold w-fit"
          onClick={handleEndGame}
        >
          END QUIZ
        </button>
      </div>
    </div>
  )
}
export default Heading;