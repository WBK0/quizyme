import StartQuiz from "./startQuiz/StartQuiz";
import QuizGame from "./quizGame/PlayQuiz";

const PlayQuiz = async ({ params }: { params: {id: string} }) => {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const quiz = await response.json();

  return (
    <div>
      {
        quiz.errorId === 101 ? (
          <StartQuiz 
            quizSlug={quiz.quizSlug}
            id={id}
          />
        ) : (
          <QuizGame
            id={id}
          />
        )
      }
    </div>
  );
};

export default PlayQuiz;