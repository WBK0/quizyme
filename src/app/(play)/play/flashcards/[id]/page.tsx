import Navbar from "@/components/Navbar/Navbar";
import Heading from "./Heading";
import Playground from "./Playground/Playground";
import Author from "./Author";
import ConceptList from "./Concepts/ConceptList";
import Footer from "@/components/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import GameProvider from "@/providers/play-flashcards/GameProvider";
import NotFound from "@/components/404/404";
import WelcomeQuizModal from "./welcomeModal/WelcomeQuizModal";

const Flashcards = async ({ params } : { params : { id: string }}) => {
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
      {
        !session ? <WelcomeQuizModal /> : null
      }
      <Navbar />
      <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
        <GameProvider 
          flashcardsSet={flashcardsSet.data?.flashcards || []} 
          id={id}
          flashcardsGameData={flashcardsGameData?.data}
        >
          <Heading 
            topic={flashcardsSet.data?.topic}
          />
          <div className="max-w-4xl mx-auto mt-20 px-3">
            <div className="relative">
              <Playground />
            </div>
            <Author
              user={flashcardsSet.data?.user}
            />
          </div>
          <ConceptList />
        </GameProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Flashcards;