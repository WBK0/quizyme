import Button from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

const TopQuizzes = () => {
  return (
    <div className="mt-28 px-3">
      <h2 className="font-bold text-3xl w-full mb-8">TOP QUIZZES</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          image="https://cdn.pixabay.com/photo/2012/11/28/10/34/rocket-launch-67643_1280.jpg"
          to="/"
          color="purple"
          type="quiz"
          topic="Cosmos"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2014/12/22/10/04/lions-577104_1280.jpg"
          to="/"
          color="yellow"
          type="quiz"
          topic="Africa"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2016/11/29/02/05/audience-1866738_1280.jpg"
          to="/"
          color="green"
          type="quiz"
          topic="Football"
          authorId="1"
        />
        <Card 
          image="https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_640.jpg"
          to="/"
          color="lightblue"
          type="quiz"
          topic="Motorcycles"
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