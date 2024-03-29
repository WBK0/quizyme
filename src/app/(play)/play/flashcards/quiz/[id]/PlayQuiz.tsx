"use client";
import { useEffect, useState } from "react";
import NotFound from "@/components/404/404";
import Welcome from "../../../quiz/[id]/quizGame/welcome/Welcome";
import Question from "../../../quiz/[id]/quizGame/Question";
import Spinner from "@/components/Loading/Spinner";
import GameData from "./GameData.type";
import Answers from "./Answers";
import AfterAnswer from "./AfterAnswer";
import Heading from "./Heading";
import Finished from "./Finished";

const PlayQuiz = ({ id } : { id: string }) => {
  const [gameData, setGameData] = useState<GameData>();
  const [answered, setAnswered] = useState<{ questionsLeft: number, correctAnswers?: number} | null>(null);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [welcomeScreen, setWelcomeScreen] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [fetching, setFetching] = useState(true);

  const nextQuestion = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz/next`, {
      method: 'POST',
      cache: 'no-cache',
    });
    
    if(response.ok){
      getQuestion();
    }
  }

  const getQuestion = async () => {
    try {
      setFetching(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz`, {
        method: 'GET',
        cache: 'no-cache',
      });
      
      const data = await response.json();
  
      if(data.errorId === 102){
        return nextQuestion();
      }

      if(data.errorId === 103){
        throw new Error(data.message)
      }

      if(data.data?.welcome){
        setWelcomeScreen(true);
        setTimeout(() => {
          setDisplayQuestion(true);
        }, 1000)
      }else{
        setDisplayQuestion(true);
      }
  
      setIsFinished(data?.isFinished)
      setGameData(data.data);
      setFetching(false);
    } catch (error) {
      return(
        <NotFound
          message="Sorry, the quiz you are looking for does not exist!"
          redirectTo="home"
          url="/"
        />
      )
    }
  }

  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <>
      {
        welcomeScreen
        ?
          <Welcome 
            setWelcomeScreen={setWelcomeScreen}
          />
        :
          null
      }
      {
        displayQuestion && gameData?.question
          ? 
            <div className="md:pt-14 pt-24 flex flex-col gap-16 min-h-screen justify-center pb-10">
              {
                !fetching
                ?
                <>
                  <Heading 
                    gameData={gameData}
                    stopTimer={stopTimer}
                    answered={answered}
                    setAnswered={setAnswered}
                    getQuestion={getQuestion}
                  />
                  <Question 
                    gameData={gameData}
                  />
                  <Answers 
                    gameData={gameData}
                    id={id}
                    setAnswered={setAnswered}
                    setStopTimer={setStopTimer}
                    stopTimer={stopTimer}
                  />
                </>
                : <div className="flex w-full justify-center z-0">
                    <Spinner />
                  </div>
              } 
              {
                answered
                ? 
                  <AfterAnswer 
                    getQuestion={getQuestion}
                    answered={answered}
                    setAnswered={setAnswered}
                    gameData={gameData}
                  />
                : 
                  null
              }
            </div>
          : 
            isFinished
            ? 
              <Finished
                id={id}
              />
            :
              !welcomeScreen
              ?
                <div className="flex justify-center items-center h-screen absolute w-full left-0">
                  <Spinner />
                </div>
              : null
        } 
    </>
  )
}

export default PlayQuiz;