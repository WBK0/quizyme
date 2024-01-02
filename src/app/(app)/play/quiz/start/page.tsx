"use client";

const StartQuiz = () => {
    
  const handleStart = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/start`, {
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

  return (
    <button
      type="button"
      onClick={handleStart}
    >page</button>
  )
}
export default StartQuiz;