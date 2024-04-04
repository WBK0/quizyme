import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { DeleteData } from "./Content";
import { toast } from "react-toastify";

type FlashcardsContentProps = {
  search: string;
  deleteModal: (data: DeleteData) => void;
  flashcards: Flashcards;
  setFlashcards: React.Dispatch<React.SetStateAction<Flashcards>>;
}

export type Flashcards = {
  id: string;
  image: string;
  type: string;
  topic: string;
  user: {
    name: string;
    image: string;
  };
  stats: {
    flashcards: number;
    learned: number;
  };
  createdAt: string;
  tags: string[];
}[] | null;

const FlashcardsContent = ({ search, deleteModal, flashcards, setFlashcards } : FlashcardsContentProps ) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [loadMore, setLoadMore] = useState<number>(0);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const step = 10;

  const getData = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/flashcards?search=${search}&limit=${step}&skip=${skip}`, {
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
        setFlashcards(json.data);
      }else{
        setFlashcards((prev) => prev && [...prev, ...json.data]);
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
          setLoadMore(flashcards?.length || 0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef.current, flashcards, loading, isAll])

  useEffect(() => {
    if(!display) return;

    const timeout = setTimeout(() => {
      setIsAll(false);
      setLoading(false);
      setDisplay(false);
      setFlashcards(null);
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
      setFlashcards(null);
    }
    getData(0);
  }, [])

  useEffect(() => {
    if(loadMore && !isAll)
      getData(loadMore);
  }, [loadMore])


  return (
    <div ref={containerRef} className="flex flex-col gap-5">
      {
        flashcards ?
        <>
          {
            display ? <h2 className="font-black text-3xl">{flashcards.length} Flashcards</h2>
            : null
          }
          {
            display && flashcards && flashcards.map((card, index) => (
              <CardExtended 
                key={card.id}
                image={card.image}
                to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}`}
                color={colors[index % 4]}
                type='flashcards'
                topic={card.topic}
                authorName={card.user.name}
                authorImage={card.user.image}
                quantity={card.stats.flashcards}
                editable={true}
                createdAt={card.createdAt}
                plays={card.stats.learned}
                tags={card.tags}
                editPath={`/update/${card.id}`}
                handleDelete={deleteModal}
                results={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}/results`}
                id={card.id}
              />
            ))
          }  
          {
            isAll ?
              <div className="flex justify-center pt-12">
                <p className="text-black font-black text-lg">WE COULD NOT FIND ANY MORE ACCOUNTS MATCHING YOUR SEARCH</p>
              </div>
            :
              loadMore || !display ?
                <div className="flex justify-center pt-12">
                  <Spinner />
                </div>
              : null
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

export default FlashcardsContent;