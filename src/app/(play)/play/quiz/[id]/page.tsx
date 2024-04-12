import StartQuiz from "./startQuiz/StartQuiz";
import QuizGame from "./quizGame/PlayQuiz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import NotFound from "@/components/404/404";

const PlayQuiz = async ({ params }: { params: {id: string} }) => {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  });
  
  const quiz = await response.json();

  const session = await getServerSession(authOptions);
  
  return (
    <div>
      {
          quiz.errorId === 100 || session?.user.id !== quiz.userId ? (
            <NotFound
              message="Sorry, the quiz you are looking for does not exist!"
              redirectTo="search"
              url="/search"
            />
          )
        : 
          quiz.errorId === 101 ? (
            <StartQuiz 
              slug={quiz.quizSlug}
              id={id}
              type="quiz"
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