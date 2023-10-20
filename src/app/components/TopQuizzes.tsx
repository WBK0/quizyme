import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

const TopQuizzes = () => {
  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP COLLECTIONS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          image="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png"
          to="/"
          color="purple"
          type="quiz"
          topic="Cosmos"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png"
          to="/"
          color="yellow"
          type="quiz"
          topic="Cosmos"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png"
          to="/"
          color="green"
          type="quiz"
          topic="Cosmos"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2016/11/30/20/58/programming-1873854_640.png"
          to="/"
          color="lightblue"
          type="quiz"
          topic="Cosmos"
          authorId="1"
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
export default TopQuizzes;