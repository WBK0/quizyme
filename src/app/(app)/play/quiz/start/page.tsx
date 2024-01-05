"use client";

const StartQuiz = () => {
    
  const handleCreate = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/create`, {
      method: 'POST',
      body: JSON.stringify({
        quizId: '65983c0661279bf25c73562b',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handleStart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/65985445d0e04cd39601c8eb/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handlePlay = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/65985445d0e04cd39601c8eb`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handleNext = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/65985445d0e04cd39601c8eb/answer`, {
      method: 'POST',
      body: JSON.stringify({
        answer: 'clr0wsni9000kuiwo6bp2epec',
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