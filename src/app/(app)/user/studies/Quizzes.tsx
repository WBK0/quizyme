import CardExtended from "@/components/CardExtended";
import Spinner from "@/components/Loading/Spinner";
import { useEffect, useRef, useState } from "react";
import { DeleteData } from "./Content";

type QuizzesContentProps = {
  search: string;
  deleteModal: (data: DeleteData) => void;
  quizzes: Quizzes;
  setQuizzes: React.Dispatch<React.SetStateAction<Quizzes>>;
}

export type Quizzes = {
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
    played: number;
  },
  createdAt: string;
  tags: string[];
}[] | null;

const QuizzesContent = ({ search, deleteModal, quizzes, setQuizzes } : QuizzesContentProps) => {
  const colors = ['purple', 'yellow', 'green', 'lightblue']
  const [loadMore, setLoadMore] = useState(false);
  const [isScrollEnd, setIsScrollEnd] = useState(false);
  const [display, setDisplay] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  const limit = 10;

  const getMoreQuizzes = async () => {
    try {
      if(isScrollEnd) return;
      if(quizzes && quizzes.length < 1){
        setLoadMore(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/quizzes?search=${search}&skip=${quizzes?.length}&limit=${limit}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setQuizzes((prev) => prev && [...prev, ...data.data])

      if(data.data.length < limit){
        setIsScrollEnd(true);
      }

      setLoadMore(false);
    } catch (error) {
      console.error(error)
    }
  }

  const getQuizzes = async (skipSearch?: boolean) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/quizzes?search=${skipSearch ? '' : search}&limit=${limit}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message)
      }

      setQuizzes(data.data)

      if(data.data.length < limit){
        setIsScrollEnd(true);
      }

      setDisplay(true);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getQuizzes(true);
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if(!display) return;
      setQuizzes(null);
      setIsScrollEnd(false);
      setLoadMore(false);
      getQuizzes();
    }, 700)

    return () => {
      clearTimeout(timeout);
    }
  }, [search])

  useEffect(() => {
    if(loadMore)
      getMoreQuizzes();
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
    <div ref={container} className="flex flex-col gap-5">
      {
        quizzes ?
        <>
          {
            display ? <h2 className="font-black text-3xl">{quizzes.length} Quizzes</h2>
            : null
          }
          {
            display && quizzes && quizzes.map((card, index) => (
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
                createdAt={card.createdAt}
                plays={card.stats.played}
                tags={card.tags}
                editPath={`/update/${card.id}`}
                handleDelete={deleteModal}
                id={card.id}
                results={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}/results`}
              />
            ))
          }  
          {
            isScrollEnd ?
              <div className="flex justify-center pt-12">
                <p className="text-black font-black text-lg">WE COULD NOT FIND ANY MORE ACCOUNTS MATCHING YOUR SEARCH</p>
              </div>
            :
              !display && loadMore ?
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

export default QuizzesContent;