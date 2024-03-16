import Button from "@/components/Button"
import Card from "@/components/Card"
import Link from "next/link"

type Flashcard = {
  id: number,
  image: string,
  topic: string,
  user: {
    name: string,
    image: string
  },
  stats: {
    flashcards: number
  }

}

const TopFlashcards = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/top/flashcards`);

  const json = await response.json();

  const colors = ['purple', 'yellow', 'green', 'lightblue']

  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP FLASHCARDS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          json.data.slice(0, 4).map((flashcard: Flashcard, index: number) => (
            <Card 
              key={flashcard.id}
              image={flashcard.image}
              to={`/study/${flashcard.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${flashcard.id}`}
              color={colors[index % 4]}
              type="flashcard"
              topic={flashcard.topic}
              authorName={flashcard.user.name}
              authorImage={flashcard.user.image}
              quantity={flashcard.stats.flashcards}
            />
          ))
        
        }
      </div>
      <Link href="/search?type=flashcards" className="flex justify-center w-full mt-6">
        <Button>
          SHOW MORE
        </Button>
      </Link>
    </div>
  )
}
export default TopFlashcards