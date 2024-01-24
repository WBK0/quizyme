import { useEffect, useRef, useState } from "react";
import CountUp from 'react-countup';

type AfterAnswerProps = {
  getQuestion: () => void;
  answered: {pointsGet: number, pointsTotal: number, questionsLeft: number};
  setAnswered: React.Dispatch<React.SetStateAction<{pointsGet: number, pointsTotal: number, questionsLeft: number} | null>>;
}

const AfterAnswer = ({ getQuestion, answered, setAnswered } : AfterAnswerProps) => {
  const [countDown, setCountDown] = useState(3);
  const [step, setStep] = useState(0);
  const animatedContainerRef = useRef<HTMLDivElement | null>(null);

  const handleCountDown = () => {
    setTimeout(() => {
      setCountDown((prev) => prev - 1)
      if(countDown > 0){
        handleCountDown();
      }
    }, 1000)
  }

  useEffect(() => {
    if(countDown === 2){
      getQuestion();
    }
  }, [countDown])

  useEffect(() => {
    if (countDown === 0) {
      if (animatedContainerRef.current) {
        animatedContainerRef.current.classList.add("animate-up-after-6s");
      }
    }

    const onAnimationEnd = () => {
      if(animatedContainerRef.current && animatedContainerRef.current.classList.contains("animate-up-after-6s")){
        animatedContainerRef.current.classList.add('hidden');
        setAnswered(null);
      }
    };

    if (animatedContainerRef.current) {
      animatedContainerRef.current.addEventListener("animationend", onAnimationEnd);
    }

    return () => {
      if (animatedContainerRef.current) {
        animatedContainerRef.current.removeEventListener("animationend", onAnimationEnd);
      }
    };
  }, [countDown]);

  return (
    <div ref={animatedContainerRef} className={`bg-gradient-to-r from-rose-700 to-pink-600 min-h-screen h-full fixed top-0 left-0 w-full animate-left-to-right overflow-y-auto`}>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen h-full gap-12">
        {
          step === 0 ?
          <>
            <h2 className="text-6xl font-black text-center text-white"> 
              <CountUp start={Number(answered.pointsTotal - answered.pointsGet)} end={Number(answered.pointsTotal)} duration={4} onEnd={() => setTimeout(() => {setStep(1), handleCountDown()}, 1000)} /> POINTS 
            </h2>
            <h6 className="text-xl font-bold text-white">{answered.questionsLeft} {answered.questionsLeft > 1 ? 'QUESTIONS' : 'QUESTION'} LEFT</h6>
          </>
          : step === 1 ? (
            <div className="animate-left-to-right gap-12 flex items-center justify-center flex-col">
              <h2 className="font-black text-white text-4xl text-center">GET READY FOR NEXT QUESTION</h2>
              <p className="font-black text-white text-8xl text-center">{countDown > 0 ? countDown : 0}</p>
            </div>
          ) : null
        }
      </div>
    </div>
  );
};

export default AfterAnswer;
