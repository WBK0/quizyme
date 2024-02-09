import Navbar from "@/components/Navbar/Navbar";
import Heading from "./Heading";
import Playground from "./Playground/Playground";
import Author from "./Author";
import ConceptList from "./Concepts/ConceptList";
import Footer from "@/components/Footer/Footer";

type FlashcardsSet = {
  flashcardsSet: {
    topic: string;
    user: {
      id: string;
      image: string;
      name: string;
      username: string;
    }
  }
}

const MainPage = ({ flashcardsSet } : FlashcardsSet) => {
  return (
    <>
      <Navbar />
        <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
          <Heading 
            topic={flashcardsSet.topic}
          />
          <div className="max-w-4xl mx-auto mt-20 px-3">
            <div className="relative">
              <Playground />
            </div>
            <Author
              user={flashcardsSet.user}
            />
          </div>
          <ConceptList />
        </div>
      <Footer />
    </>
  )
}
export default MainPage