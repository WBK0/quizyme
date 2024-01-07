"use client";

const StartQuiz = () => {
    
  const handleCreate = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/create`, {
      method: 'POST',
      body: JSON.stringify({
        quizId: '659add44ec4d0a2336558a83',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handleStart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/659add44ec4d0a2336558a83/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handlePlay = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/659add44ec4d0a2336558a83`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handleNext = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/659add88ec4d0a2336558a8e/answer`, {
      method: 'POST',
      body: JSON.stringify({
        answer: ['clr1896zv000cuipck3x9xhnb'],
        skipAnswer: true
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  return (<>
  <button
      type="button"
      onClick={handleCreate}
    >create</button>
    <button
      type="button"
      onClick={handleStart}
    >start</button>
    <button
      type="button"
      onClick={handlePlay}
    >play</button>
    <button
      type="button"
      onClick={handleNext}
    >
      Next question
    </button>
  </>
    
  )
}
export default StartQuiz;