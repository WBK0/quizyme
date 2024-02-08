import Navbar from "@/components/Navbar/Navbar";
import Heading from "./Heading";
import Playground from "./Playground/Playground";
import Author from "./Author";
import ConceptList from "./Concepts/ConceptList";
import Footer from "@/components/Footer/Footer";

const Flashcards = async ({ params } : { params : { id: string }}) => {
  const { id } = params;

  const flashcards = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}`)
  const flashcardsSet = await flashcards.json();
  
  return (
    <div>
      <Navbar />
      <div className="pt-20 md:pt-28 container mx-auto lg:px-20">
        <Heading 
          topic={flashcardsSet.data.topic}
        />
        <div className="max-w-4xl mx-auto mt-20 px-3">
          <div className="relative">
            <Playground 
              flashcardsData={flashcardsSet.data.flashcards}
            />
          </div>
          <Author
            user={flashcardsSet.data.user}
          />
        </div>
        <ConceptList
          list={flashcardsSet.data.flashcards}
        />
      </div>
      <Footer />
    </div>
  )
}

export default Flashcards;