import Collections from "./components/Collections";
import Hero from "./components/Hero";
import JoinByCode from "./components/JoinByCode";
import TopFlashcards from "./components/TopFlashcards";
import TopQuizzes from "./components/TopQuizzes";

const Home = async () => {
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