"use client";
import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Data = {
  id: string;
  image: string;
  type: string;
  topic: string;
  user: {
    id: string;
    username: string;
    name: string;
    image: string;
  };
  stats: {
    flashcards: number;
  } | {
    questions: number;
  },
  createdAt: string;
  tags: string[];
}[] | null;

const Favorites = async ({ type } : {type : 'quizzes' | 'flashcards'}) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [data, setData] = useState<Data>(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/favorites/flashcards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setData(json.data);
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      {
        data ? data.map((card, index) => (
          <CardExtended 
            key={card.id}
            image={card.image}
            to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}`}
            color={colors[index % 4]}
            type={card.type}
            topic={card.topic}
            authorName={card.user.name}
            authorImage={card.user.image}
            quantity={('questions' in card.stats) ? card.stats.questions : card.stats.flashcards || 0}
            tags={card.tags}
            createdAt={card.createdAt}
          />
        ))
        : (
          <div className="flex justify-center mt-12">
            <Spinner />
          </div>
        )
      }   
    </div>
  )
}
export default Favorites;