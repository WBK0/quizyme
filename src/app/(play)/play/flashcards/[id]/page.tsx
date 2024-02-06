import Navbar from "@/components/Navbar/Navbar";
import Heading from "./Heading";
import Playground from "./Playground/Playground";
import Author from "./Author";
import ConceptList from "./Concepts/ConceptList";
import Footer from "@/components/Footer/Footer";

const Flashcards = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
        <Heading />
        <div className="max-w-4xl mx-auto mt-20 px-3">
          <div className="relative">
            <Playground />
          </div>
          <Author />
        </div>
        <ConceptList />
      </div>
      <Footer />
    </div>
  )
}

export default Flashcards;