import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Data } from "./Data.type";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const step = 10;
  const colors = ['purple', 'yellow', 'green', 'lightblue']

  const getData = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/favorites/${type}?search=${search}&skip=${skip}&limit=${step}`, {
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
    if(!containerRef.current) return;
    const container = containerRef.current;

    const handleScroll = () => {
      if(Number(Math.ceil(container.scrollTop + container.clientHeight)) >= container.scrollHeight){
        if(loading || isAll) return;
        getData(data?.length || 0);
      }
    }

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef.current, data, loading, isAll])

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
    if(display){
      setData(null);
    }
    getData(0);
  }, [type])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="max-h-[80vh] h-full overflow-y-auto scroll-sm px-3 sm:pr-2 mt-8 pt-4 pb-12 pr-3 flex gap-12 flex-col" ref={containerRef}>
        {
          display && data ? 
          <>
            {
              data.map((card, index) => (  
                <CardExtended 
                  key={card.id}
                  image={card.image}
                  to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.studyId}`}
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
            }
            {
              !isAll && loading ?
                <div className="flex justify-center">
                  <Spinner />
                </div>
              : isAll ? (
                  <h6 className="font-bold text-black text-lg text-center py-3">
                    We couldn't find any more {type} matching your search.
                  </h6>
                ) 
                : null
            }
          </>
          :
          (
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