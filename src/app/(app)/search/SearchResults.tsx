import CardExtended from '@/components/CardExtended';
import React, { useEffect, useRef, useState } from 'react'
import LoaderTable from '../user/space/LoaderTable';
import Spinner from '@/components/Loading/Spinner';
import { toast } from 'react-toastify';
import { Data } from './data.type';
import { useSearchParams } from 'next/navigation';

type SearchResultsProps = {
  type: string;
  search: string;
  category: string;
}

const SearchResults = ({ type, search, category } : SearchResultsProps) => {
  const [data, setData] = useState<Data>(null);
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [loadMore, setLoadMore] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  const step = 10;

  const colors = ['purple', 'yellow', 'green', 'lightblue'];

  const getData = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/search/${type}?search=${search}&skip=${skip}&limit=${step}&category=${category || ''}`, {
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
  }, [search, searchParams.get('category')])

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

  const handleFavorite = async (card: { topic: string, isFavorite: boolean | null, id: string }) => {
    const isFavorite = card.isFavorite;
    try {
      setData((prev: Data) => {
        if (!prev) return prev;
        return prev.map((item) => {
          if (item.id === card.id) {
            return {
              ...item,
              isFavorite: null
            };
          }
          return item;
        });
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}/like`, {
        method: 'PATCH',
      });

      if(!response.ok){
        const json = await response.json();
        throw new Error(json.message);
      }

      setData((prev : Data) => {
        if(!prev) return prev;
        return prev.map((item) => {
          if(item.id === card.id){
            return {
              ...item,
              isFavorite: !card.isFavorite
            }
          }
          return item;
        });
      });
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message)

      setData((prev : Data) => {
        if(!prev) return prev;
        return prev.map((item) => {
          if(item.id === card.id){
            return {
              ...item,
              isFavorite: isFavorite || false
            }
          }
          return item;
        });
      });
    }
  }

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
                  to={`/study/${card.topic.replaceAll('-', '').replaceAll(' ', '-').replaceAll('--', '-')}-${card.id}`}
                  color={colors[index % 4]}
                  type={type}
                  topic={card.topic}
                  authorName={card.user.name}
                  authorImage={card.user.image}
                  quantity={('questions' in card.stats) ? card.stats.questions : card.stats.flashcards || 0}
                  tags={card.tags}
                  createdAt={card.createdAt}
                  isFavorite={card.isFavorite}
                  handleFavorite={() => handleFavorite(card)}
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

export default SearchResults;