import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

type Quiz = {
  id: number,
  image: string,
  topic: string,
  user: {
    name: string,
    image: string
  },
  stats: {
    questions: number
  }

}

const TopQuizzes = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/top/quizzes`, {
    next: {
      revalidate: 600
    }
  });

  const json = await response.json();

  const colors = ['purple', 'yellow', 'green', 'lightblue']

  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP QUIZZES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {
          json.data.slice(0, 4).map((quiz: Quiz, index: number) => (
            <Card 
              key={quiz.id}
              image={quiz.image}
              to={`/study/${quiz.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${quiz.id}`}
              color={colors[index % 4]}
              type="quiz"
              topic={quiz.topic}
              authorName={quiz.user.name}
              authorImage={quiz.user.image}
              quantity={quiz.stats.questions}
            />
          ))
        }
      </div>
      <Link href="/search?type=quizzes" className="flex justify-center w-full mt-6">
        <Button>
          SHOW MORE
        </Button>
      </Link>
    </div>
  )
}
export default TopQuizzes;