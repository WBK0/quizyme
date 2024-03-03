import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Data } from "./Data.types";

type FavoritesProps = {
  type: 'quizzes' | 'flashcards';
  setData: React.Dispatch<React.SetStateAction<Data>>;
  data: Data;
  search: string;
}

const Favorites = ({ type, setData, data, search } : FavoritesProps) => {
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [display, setDisplay] = useState(false);

  const step = 10;
  const colors = ['purple', 'yellow', 'green', 'lightblue']

  const getData = async (skip: number) => {
    setLoading(true);
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

      if(skip === 0){
        setData(json.data);
      }else{
        setData((prev) => prev && [...prev, ...json.data]);
      }

      setDisplay(true);

      if(json.data.length < step){
        setIsAll(true);
      }
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!display) return;
    const timeout = setTimeout(() => {
      setData(null);
      setLoading(false);
      setDisplay(false);
      setIsAll(false);
      getData(0);
    }, 700)

    return () => clearTimeout(timeout);
  }, [search])

  useEffect(() => {
    getData(0);
  }, [type])

  return (
    <div className="max-w-4xl mx-auto h-full">
      <div className="max-h-[85vh] h-full overflow-y-auto mt-12 scroll-sm pr-2">
      {
        display && data ? data.map((card, index) => (
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
    </div>
  )
}
export default Favorites;