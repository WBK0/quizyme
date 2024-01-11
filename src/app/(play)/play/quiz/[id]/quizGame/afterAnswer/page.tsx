"use client"
import { useState } from "react";
import CountUp from 'react-countup';

const AfterAnswer = () => {
  const [countDown, setCountDown] = useState(3);
  const [step, setStep] = useState(0);

  const handleCountDown = () => {
    setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    }, 1000);
  }

  return (
    <div className="bg-gradient-to-r from-rose-700 to-pink-600 min-h-screen absolute top-0 left-0 w-full">
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen gap-12">
        {
          step === 0 ?
          <>
            <h1 className="text-6xl font-black text-center text-white">
              Good job! Your answer is correct!
            </h1>
            <h2
              className="text-6xl font-black text-center text-white"
            > 
              <CountUp start={150} end={403} duration={3} onEnd={() => setTimeout(() => {setStep(1), handleCountDown()}, 1000)} /> POINTS 
            </h2>
            <h6 className="text-xl font-bold text-white">
              12 QUESTIONS LEFT  
            </h6>
          </>
          : (() => {
            return(
              <>
                <h2 className="font-black text-white text-4xl">GET READY FOR NEXT QUESTION</h2>
                <p className="font-black text-white text-8xl">{countDown > 0 ? countDown : 0}</p>
              </>
            )})()
          }
      </div>
    </div>
  );
};

export default AfterAnswer;
