"use client";
import EasySpinner from "@/components/Loading/EasySpinner";
import { useEffect, useRef, useState } from "react";
import Search from "./Searchbar";
import Card from "./Card";
import Header from "./Header";
import LoaderTable from "./LoaderTable";

type Data = {
  user: { 
    id: string;
    name: string;
    image: string;
    username: string;
  };
  points: number;
  correctAnswers: number;
}[] | null

type RankingProps = {
  slug: string;
  type: 'quiz' | 'flashcards';
  questionLength: number;
}

const Ranking = ({ slug, type, questionLength } : RankingProps) => {
  const [data, setData] = useState<Data>(null);
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const step = 10;

  const getRanking = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}/ranking?search=${search}&skip=${skip}&limit=${step}`);
      const ranking = await response.json();

      if(!response.ok){
        throw new Error(ranking.message);
      }

      if(skip === 0){
        setData(ranking.data);
      }else{
        setData((prev) => prev && [...prev, ...ranking.data]);
      }
      setDisplay(true);

      if(ranking.data.length < step){
        setIsAll(true);
      }
    } catch (error) {
      console.error('Error fetching ranking:', error); 
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!containerRef.current) return;
    const container = containerRef.current;

    const handleScroll = () => {
      if(Number(Math.ceil(container.scrollTop + container.clientHeight + 0.5)) === container.scrollHeight){
        if(loading || isAll) return;
        getRanking(data?.length || 0);
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
      getRanking(0);
    }, 700)

    return () => clearTimeout(timeout);
  }, [search])

  useEffect(() => {
    getRanking(0);
  }, [slug])

  return (
    <div className="max-w-4xl bg-lightblue rounded-2xl mt-12 pb-4 mx-1 sm:mx-auto">
      <Header />
      <Search 
        search={search} 
        setSearch={setSearch}
      />
      <div className="px-3 max-w-2xl mx-auto"> 
        <div className="w-24 bg-white mx-auto h-1 my-4" />
        {               
          display && data ?
            <div className="pr-3 flex flex-col gap-4 h-[375px] overflow-y-auto scroll-sm-blue" ref={containerRef}>
              {data && data.map((user, i) => (
                <Card 
                  key={i} 
                  data={user} 
                  i={i} 
                  type={type} 
                  questionLength={questionLength}
                />
              ))}
              <LoaderTable loading={loading} isAll={isAll} type={type} />
            </div> 
          : (
            <div className="flex justify-center h-[375px] pt-2">
              <EasySpinner size={6} color="white"/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Ranking;