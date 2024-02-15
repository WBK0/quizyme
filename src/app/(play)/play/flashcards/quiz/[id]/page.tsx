import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import NotFound from "@/components/404/404";
import StartQuiz from "../../../quiz/[id]/startQuiz/StartQuiz";

const PlayFlashcardsQuiz = async ({ params }: { params: {id: string} }) => {
  const { id } = params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz`, {
    method: 'GET',
    cache: 'no-cache',
  });
  
  const flashcards = await response.json();

  const session = await getServerSession(authOptions);
  
  return (
    <div>
      {
        flashcards.errorId === 100 || session?.user.id !== flashcards.userId ? (
          <NotFound
            message="Sorry, the quiz you are looking for does not exist!"
            redirectTo="search"
            url="/search"
          />
        )
      : 
        flashcards.errorId === 101 ? (
          <StartQuiz 
            slug={flashcards.slug}
            id={flashcards.flashcardsId}
            type="flashcards"
          />
        ) 
      :
        (
          <></>
        )
      } 
    </div>
  );
};

export default PlayFlashcardsQuiz;