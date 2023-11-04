import { getServerSession } from "next-auth";
import Collections from "./components/Collections";
import Hero from "./components/Hero";
import JoinByCode from "./components/JoinByCode";
import TopFlashcards from "./components/TopFlashcards";
import TopQuizzes from "./components/TopQuizzes";
import { authOptions } from "./api/auth/[...nextauth]/route"

const Home = async () => {

  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <>
      <Hero />
      <Collections />
      <JoinByCode />
      <TopQuizzes />
      <TopFlashcards />
    </>
  )
}
export default Home;