import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import GameProvider from "@/providers/play-flashcards/GameProvider";
import NotFound from "@/components/404/404";
import WelcomeQuizModal from "./mainPage/welcomeModal/WelcomeQuizModal";
import MainPage from "./mainPage/MainPage";
import Fullscreen from "./fullscreen/Fullscreen";
import createFlashcardsGame from "./createFlashcardsGame";

const Flashcards = async ({ params, searchParams } : { params : { id: string }, searchParams: {fullscreen?: string}}) => {
  const { id } = params;

  const flashcards = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}`, {
    cache: "no-cache",
  });
  const flashcardsSet = await flashcards.json();
  
  if(!flashcards.ok){
    return <NotFound 
      message="Sorry, the flashcards set you are looking for does not exist!"
      redirectTo="search"
      url="/search"
    />
  }

  const session = await getServerSession(authOptions);

  let flashcardsGameData = null;

  if(session) {
    const gameData = await createFlashcardsGame(id, session.user.id);
    
    if(gameData){
      flashcardsGameData = gameData;
    }
  }

  return (
    <div className="overflow-x-hidden">
      <GameProvider 
        flashcardsSet={flashcardsSet.data?.flashcards || []} 
        id={id}
        flashcardsGameData={flashcardsGameData}
      >
        {
          !session ? <WelcomeQuizModal /> : null
        }
        {
          searchParams.fullscreen === "true" 
          ? <Fullscreen flashcardsSet={flashcardsSet.data} session={session} />
          : <MainPage flashcardsSet={flashcardsSet.data} session={session} />
        }
      </GameProvider>
    </div>
  )
}

export default Flashcards;