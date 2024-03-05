import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Data } from "./Data.type";
import LoaderTable from "./LoaderTable";
import handleFavorite from "./handleFavorite";
import handleDeleteInvitation from "./handleDeleteInvitation";

type InvitationsProps = {
  type: 'quizzes' | 'flashcards';
  setData: React.Dispatch<React.SetStateAction<Data>>;
  data: Data;
  search: string;
}

const Invitations = ({ type, setData, data, search } : InvitationsProps) => {
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [display, setDisplay] = useState(false);
  const [loadMore, setLoadMore] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const step = 10;
  const colors = ['purple', 'yellow', 'green', 'lightblue']

  const getData = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/invitations/${type}?search=${search}&skip=${skip}&limit=${step}`, {
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

    const handleScroll = () => {
      const element = containerRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentage = (windowHeight - rect.top) / rect.height;
        if(percentage >= 1 && !loading){
          setLoadMore(data?.length || 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef.current, data, loading, isAll])

  useEffect(() => {
    if(!display) return;

    const timeout = setTimeout(() => {
      setIsAll(false);
      setLoading(false);
      setDisplay(false);
      setData(null);
      getData(0);
    }, 700)

    return () => clearTimeout(timeout);
  }, [search])

  useEffect(() => {
    setIsAll(false);
    setLoading(false);
    setDisplay(false);
    setLoadMore(0);
    if(display){
      setData(null);
    }
    getData(0);
  }, [type])

  useEffect(() => {
    if(loadMore && !isAll)
      getData(loadMore);
  }, [loadMore])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="px-3 pt-4 flex gap-12 flex-col" ref={containerRef}>
        {
          display && data ? 
          <>
            {
              data.map((card, index) => (  
                <CardExtended 
                  key={index}
                  image={card.image}
                  to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.studyId}`}
                  color={colors[index % 4]}
                  type={card.type}
                  topic={card.topic}
                  authorName={card.user.name}
                  authorImage={card.user.image}
                  showDelete={() => handleDeleteInvitation({id: card.id, setData, data})}
                  invitedBy={card?.inviter?.name}
                  quantity={('questions' in card.stats) ? card.stats.questions : card.stats.flashcards || 0}
                  tags={card.tags}
                  createdAt={card.createdAt}
                  isFavorite={card.isFavorite}
                  handleFavorite={() => handleFavorite({id: card.studyId, topic: card.topic, setData, data})}
                /> 
              ))
            }
            <LoaderTable 
              loading={loading} 
              isAll={isAll} 
              type={type}
            />
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

export default Invitations;