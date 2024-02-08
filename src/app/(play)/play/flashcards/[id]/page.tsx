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

const Flashcards = async ({ params } : { params : { id: string }}) => {
  const { id } = params;

  const flashcards = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}`)
  const flashcardsSet = await flashcards.json();
  
  const session = await getServerSession(authOptions);

  if(session) {
    const flashcardsGame = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user`, {
      headers: headers()
    })
    const flashcardsGameData = await flashcardsGame.json();

    if(flashcardsGameData.errorId === 100){
      await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user`, {
        method: 'POST',
        headers: headers(),
      })
    }
  }else{
    // Make there a modal to inform user to login to better experience
  }

  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
        <GameProvider flashcardsSet={flashcardsSet.data.flashcards}>
          <Heading 
            topic={flashcardsSet.data.topic}
          />
          <div className="max-w-4xl mx-auto mt-20 px-3">
            <div className="relative">
              <Playground 
                // flashcardsData={flashcardsSet.data.flashcards}
              />
            </div>
            <Author
              user={flashcardsSet.data.user}
            />
          </div>
          <ConceptList
            list={flashcardsSet.data.flashcards}
          />
        </GameProvider>
      </div>
      <Footer />
    </div>
  )
}

export default Flashcards;