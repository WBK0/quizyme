import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";

type Flashcards = {
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

const FlashcardsContent = ({ search } : { search: string }) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [flashcards, setFlashcards] = useState<Flashcards>(null)
  const [loadMore, setLoadMore] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
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

  const getFlashcards = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/flashcards?search=${search}&limit=${limit}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setFlashcards(data.data)

      if(data.data.length < limit){
        setIsScrollEnd(true);
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getFlashcards();
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
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
          <h2 className="font-black text-3xl">{flashcards.length} Quizzes</h2>
          {
            flashcards && flashcards.map((card, index) => (
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
                results={`/`}
              />
            ))
          }  
          {
            isScrollEnd ?
              <div className="flex justify-center pt-12">
                <p className="text-black font-black text-lg">WE COULDN'T FIND ANY MORE ACCOUNTS MATCHING YOUR SEARCH</p>
              </div>
            :
              loadMore ?
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