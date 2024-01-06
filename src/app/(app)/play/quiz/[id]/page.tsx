import { headers } from "next/headers";
import StartQuiz from "./StartQuiz";

const PlayQuiz = async ({ params } : { params: {id: string}}) => {  
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
    method: 'GET',
    headers: headers(),
    cache: 'no-cache',
  });
  
  const quiz = await response.json();

  return (
    <div>
      {
        quiz.errorId === 101 && (
          <StartQuiz 
            quizSlug={quiz.quizSlug}
          />
        )
      }
    </div>
  )
}
export default PlayQuiz;