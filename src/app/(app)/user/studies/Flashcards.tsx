import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { DeleteData } from "./Content";

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
  updatedAt: string;
  tags: string[];
}[] | null;

const FlashcardsContent = ({ search, deleteModal, flashcards, setFlashcards } : FlashcardsContentProps ) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [loadMore, setLoadMore] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [display, setDisplay] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const limit = 10;

  const getMoreFlashcards = async () => {
    try {
      if(isScrollEnd) return;
      if(flashcards && flashcards.length < 1){
        setLoadMore(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/flashcards?search=${search}&skip=${flashcards?.length}&limit=${limit}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setFlashcards((prev) => prev && [...prev, ...data.data])

      if(data.data.length < limit){
        setIsScrollEnd(true);
      }

      setLoadMore(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getFlashcards = async (skipSearch?: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/flashcards?search=${skipSearch ? '' : search}&limit=${limit}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setFlashcards(data.data)

      if(data.data.length < limit){
        setIsScrollEnd(true);
      }

      setDisplay(true);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFlashcards(true);
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(!display) return;
      setIsScrollEnd(false);
      setLoadMore(false);
      setFlashcards(null);
      getFlashcards();
    }, 700)

    return () => {
      clearTimeout(timeout);
    }
  }, [search])

  useEffect(() => {
    if(loadMore)
      getMoreFlashcards();
  }, [loadMore])

  useEffect(() => {
    const handleScroll = () => {
      const element = container.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const percentage = (windowHeight - rect.top) / rect.height;
        if(percentage > 1){
          setLoadMore(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={container}>
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
                updatedAt={card.updatedAt}
                plays={card.stats.learned}
                tags={card.tags}
                editPath={`/update/${card.id}`}
                handleDelete={deleteModal}
                results={`/`}
                id={card.id}
              />
            ))
          }  
          {
            isScrollEnd ?
              <div className="flex justify-center pt-12">
                <p className="text-black font-black text-lg">WE COULDN'T FIND ANY MORE ACCOUNTS MATCHING YOUR SEARCH</p>
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