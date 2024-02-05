import Navbar from "@/components/Navbar/Navbar";
import Heading from "./Heading";
import Playground from "./Playground/Playground";

const Flashcards = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
        <Heading />
        <div className="max-w-4xl mx-auto mt-20 px-3">
          <Playground />
        </div>
      </div>
    </div>
  )
}

export default Flashcards;