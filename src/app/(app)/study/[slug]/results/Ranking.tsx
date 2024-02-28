"use client";
import EasySpinner from "@/components/Loading/EasySpinner";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  type: string;
}

const Ranking = ({ slug, type } : RankingProps) => {
  const [data, setData] = useState<Data>(null);
  const [loading, setLoading] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const step = 10;

  const getRanking = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}/ranking?search=${search}&skip=0&limit=${step}`);
      const ranking = await response.json();

      if(!response.ok){
        throw new Error(ranking.message);
      }

      setData(ranking.data);
      setDisplay(true);

      if(ranking.data.length < step){
        setIsAll(true);
      }
    } catch (error) {
      console.error('Error fetching ranking:', error); 
    }
  }

  const getMoreRanking = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/study/${slug}/ranking?search=${search}&skip=${skip}&limit=${step}`);
      const ranking = await response.json();

      if(!response.ok){
        throw new Error(ranking.message);
      }

      setData((prev) => prev && [...prev, ...ranking.data]);

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
      if(Number((container.scrollTop + container.clientHeight).toFixed(0)) === container.scrollHeight){
        if(loading || isAll) return;
        getMoreRanking(data?.length || 0);
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
      getRanking();
    }, 700)

    return () => clearTimeout(timeout);
  }, [search])

  useEffect(() => {
    getRanking();
  }, [slug])

  return (
    <div className="max-w-4xl bg-lightblue rounded-2xl mt-12 pb-4 mx-1 sm:mx-auto">
      <div className="border-b-3 mx-4 border-white pt-2 mb-4">
        <p className="font-bold text-white text-normal mb-1">Global ranking</p>
      </div>
      <div className="max-w-2xl mx-auto px-3">
        <Searchbar 
          value={search}
          onChange={setSearch}
        />
      </div>
      <div className="px-3 max-w-2xl mx-auto"> 
        <div className="w-24 bg-white mx-auto h-1 my-4" />
        {               
          display && data ?
            <div className="pr-3 flex flex-col gap-4 h-[375px] overflow-y-auto scroll-sm-blue" ref={containerRef}>
              {data && data.map((user, i) => (
              <div className='flex items-center text-white justify-between gap-4' key={i}>
                <div className='flex gap-3 items-center'>
                  <h6 className={`font-black text-xl ${i < 100 ? 'w-9' : 'w-14'}`}>#{i + 1}</h6>
                  <Image src={user.user.image} alt="Profile picture" width={40} height={40} className='rounded-full' />
                  <p className='font-semibold sm:hidden'>
                    {user.user.name.split(' ')[0].substring(0, 12)}{user.user.name.split(' ')[0].length > 12 ? '...' : ''} 
                    <span> </span>
                    {user.user.name.split(' ')[1].substring(0, 12)}{user.user.name.split(' ')[1].length > 12 ? '...' : ''} 
                  </p>
                  <p className='font-semibold hidden sm:block'>
                    {user.user.name.split(' ')[0].substring(0, 16)}{user.user.name.split(' ')[0].length > 16 ? '...' : ''} 
                    <span> </span>
                    {user.user.name.split(' ')[1].substring(0, 16)}{user.user.name.split(' ')[1].length > 16 ? '...' : ''} 
                  </p>
                </div>
                {
                  <>
                    <div className="flex gap-2 sm:gap-4">
                      <p className='text-right font-bold'>{user.points || 0} Points</p>
                      <p className='text-right font-bold hidden sm:block'>{user.correctAnswers || 0} / 10 Correct</p>
                    </div>
                  </>
                }
              </div>
              ))}
              {
                loading && !isAll ? (
                  <div className="flex justify-center">
                    <EasySpinner size={6}/>
                  </div>
                ) : null
              }
              {
                isAll ? (
                  <h6 className="font-bold text-white text-center py-3">
                    We couldn't find any more {type} matching your search
                  </h6>
                )
                : null
              }
            </div> 
          : (
            <div className="flex justify-center h-[375px] pt-2">
              <EasySpinner size={6}/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Ranking;