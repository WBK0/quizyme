import { useEffect, useState } from "react";
import GameData from "./GameData.types";

const Heading = ({ gameData } : { gameData: GameData}) => {
  const maxTime = gameData?.question?.time * 1000;
  const [time, setTime] = useState<number>(gameData?.question?.time * 1000);

  const setTimer = () => {
    setTime(new Date(gameData.timeToRespond).getTime() - new Date().getTime() - 2500);
  }

  useEffect(() => {
    setTimer();
  }, [gameData?.question])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prev) => prev - 10);
    }, 10);

    document.addEventListener('visibilitychange', setTimer);

    return () => {
      document.removeEventListener('visibilitychange', setTimer);
      clearInterval(intervalId)
    };
  }, [])

  const percentage = (time * 100) / maxTime;

  return (
    <div className="bg-white w-full flex flex-wrap items-center md:gap-32 gap-4 top-0 left-0 absolute px-3 pt-3">
      <div className="flex-1 md:flex-none">
        <h6 className="font-bold text-lg w-fit">3/12</h6>
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
        <button className="bg-red text-white px-6 rounded-full py-1 font-bold w-fit">
          END QUIZ
        </button>
      </div>
    </div>
  )
}
export default Heading;