import { useEffect, useRef, useState } from "react";

type WelcomeProps = {
  setWelcomeScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Welcome = ({ setWelcomeScreen } : WelcomeProps) => {
  const animatedContainerRef = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
      }
      if(count - 1 === 0){
        if(animatedContainerRef.current){
          animatedContainerRef.current.classList.add("animate-up-after-6s");
        }
      }
    }, 700);

    const onAnimationEnd = () => {
      if(animatedContainerRef.current && animatedContainerRef.current.classList.contains("animate-up-after-6s")){
        animatedContainerRef.current.classList.add('hidden');
        setWelcomeScreen(false);
      }
    };

    if (animatedContainerRef.current) {
      animatedContainerRef.current.addEventListener("animationend", onAnimationEnd);
    }

    return () => {
      if (animatedContainerRef.current) {
        animatedContainerRef.current.removeEventListener("animationend", onAnimationEnd);
      }
      clearInterval(interval);
    };
  }, [count]);

  return (
    <div 
      className={`bg-gradient-to-r from-rose-700 to-pink-600 min-h-screen h-full fixed top-0 left-0 w-full animate-left-to-right overflow-y-auto z-50`}
      ref={animatedContainerRef}  
    >
      <div className="flex justify-center items-center h-full flex-col gap-8">
        <h1 className="text-6xl font-black text-center text-white">GET READY FOR QUIZ</h1>
        <p className="font-black text-white text-8xl text-center">{count}</p>
      </div>
    </div>
  )
}
export default Welcome;