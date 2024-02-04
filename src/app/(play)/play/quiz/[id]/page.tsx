import StartQuiz from "./startQuiz/StartQuiz";
import QuizGame from "./quizGame/PlayQuiz";
import NotFound from "./404/404";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const PlayQuiz = async ({ params }: { params: {id: string} }) => {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const quiz = await response.json();

  const session = await getServerSession(authOptions);
  
  console.log(quiz)

  return (
    <div>
      {
          quiz.errorId === 100 || session?.user.id !== quiz.userId ? (
            <NotFound />
          )
        : 
          quiz.errorId === 101 ? (
            <StartQuiz 
              quizSlug={quiz.quizSlug}
              id={id}
            />
          ) 
        :
          (
            <QuizGame
              id={id}
            />
          )
      }
    </div>
  );
};

export default PlayQuiz;