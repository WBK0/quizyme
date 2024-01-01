import Button from "@/components/Button"
import Card from "@/components/Card"
import Link from "next/link"

const TopFlashcards = () => {
  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP FLASHCARDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          image="https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027898_640.jpg"
          to="/"
          color="purple"
          type="flashcards"
          topic="Cosmos"
          authorName="John Doe"
          authorImage="http://localhost:3100/defaultPicture.png"
          quantity={18}
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_1280.jpg"
          to="/"
          color="yellow"
          type="flashcards"
          topic="Forest"
          authorName="John Doe"
          authorImage="http://localhost:3100/defaultPicture.png"
          quantity={18}
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2015/03/16/10/59/sunset-675847_1280.jpg"
          to="/"
          color="green"
          type="flashcards"
          topic="Boats"
          authorName="John Doe"
          authorImage="http://localhost:3100/defaultPicture.png"
          quantity={18}
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2015/12/07/10/24/go-kart-1080492_1280.jpg"
          to="/"
          color="lightblue"
          type="flashcards"
          topic="Karting"
          authorName="John Doe"
          authorImage="http://localhost:3100/defaultPicture.png"
          quantity={18}
        />
      </div>
      <Link href="/" className="flex justify-center w-full mt-6">
        <Button>
          SHOW MORE
        </Button>
      </Link>
    </div>
  )
}
export default TopFlashcards