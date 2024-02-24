import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useState } from "react";

type Quizzes = {
  id: string;
  image: string;
  type: string;
  topic: string;
  user: {
    name: string;
    image: string;
  };
  stats: {
    questions: number;
  }
}[] | null;

const Quizzes = () => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [quizzes, setQuizzes] = useState<Quizzes>(null)

  const getQuizzes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/quizzes`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setQuizzes(data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuizzes();
  }, [])

  return (
    <div>
      {
        quizzes ?
        <>
          <h2 className="font-black text-3xl">{quizzes.length} Quizzes</h2>
          {
            quizzes && quizzes.map((card, index) => (
              <CardExtended 
                key={card.id}
                image={card.image}
                to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}`}
                color={colors[index % 4]}
                type='quiz'
                topic={card.topic}
                authorName={card.user.name}
                authorImage={card.user.image}
                quantity={card.stats.questions}
                editable={true}
              />
            ))
          }  
        </>
        : 
        <div className="flex justify-center">
          <Spinner />
        </div>
      }
    </div>
  )
}

export default Quizzes;