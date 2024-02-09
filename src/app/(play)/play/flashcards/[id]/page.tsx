
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import GameProvider from "@/providers/play-flashcards/GameProvider";
import NotFound from "@/components/404/404";
import WelcomeQuizModal from "./mainPage/welcomeModal/WelcomeQuizModal";
import MainPage from "./mainPage/MainPage";
import Fullscreen from "./fullscreen/Fullscreen";

const Flashcards = async ({ params, searchParams } : { params : { id: string }, searchParams: {fullscreen?: string}}) => {
  const { id } = params;

  const flashcards = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}`,
  {
    cache: "no-cache",
  })
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
    const flashcardsGame = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user`, {
      headers: headers()
    })

    flashcardsGameData = await flashcardsGame.json();
  }

  return (
    <div className="overflow-x-hidden">
      <GameProvider 
        flashcardsSet={flashcardsSet.data?.flashcards || []} 
        id={id}
        flashcardsGameData={flashcardsGameData?.data}
      >
        {
          !session ? <WelcomeQuizModal /> : null
        }
        {
          searchParams.fullscreen === "true" 
          ? <Fullscreen />
          : <MainPage flashcardsSet={flashcardsSet.data} />
        }
      </GameProvider>
    </div>
  )
}

export default Flashcards;