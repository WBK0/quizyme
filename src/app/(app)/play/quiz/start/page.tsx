"use client";

const StartQuiz = () => {
    
  const handleCreate = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/create`, {
      method: 'POST',
      body: JSON.stringify({
        quizId: '658db2c923a2d55edb5a01d2',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handleStart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/65941baf63f72165bd5a1d65/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    console.log(await response.json());
  }

  const handlePlay = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/65941baf63f72165bd5a1d65`, {
      method: 'GET',
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
  </>
    
  )
}
export default StartQuiz;