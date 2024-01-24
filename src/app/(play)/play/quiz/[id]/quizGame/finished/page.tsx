import Image from 'next/image';
import congratulations from '@/public/congratulations.svg';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Spinner from '@/components/Loading/Spinner';

type FinishedData = {
  id: string;
  data: {
    user: {
      id: string;
      image: string;
      name: string;
    };
    points: number;
    correctAnswers: number;
  }[]
  userPoints: number;
  userCorrectAnswers: number;
  answersLength: number;
  userPlace: number;
} | null;

const Finished = ({ id } : { id: string }) => {
  const [data, setData] = useState<FinishedData>(null);

  const fetchFinished = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/quiz/${id}/finished`, {
        method: 'GET',
        cache: 'no-cache',
      });

      const data = await response.json();
      
      setData(data);
    } catch (error) {
      toast.error("An error occured while fetching data") 
    }
  }

  useEffect(() => {
    fetchFinished();
  }, [])

  return (
    <>
    {
      data
        ? 
          <div className="min-h-screen flex flex-col items-center justify-center gap-8 container mx-auto py-8 pb-16">
            <Image src={congratulations} alt="Congratulations" width={196} />
            <h1 className='font-black text-2xl sm:text-4xl'>CONGRATULATIONS</h1>
            <div className='flex flex-col sm:flex-row justify-between sm:gap-24 gap-4'>
              <div className='flex-grow'>
                <h3 className='font-black text-xl text-center'>CORRECT ANSWERS</h3>
                <p className='text-lightblue text-center mt-1 font-black text-xl'>{data.userCorrectAnswers}/{data.answersLength}</p>
              </div>
              <div className='flex-grow'>
                <h3 className='font-black text-xl text-center'>POINTS EARNED</h3>
                <p className='text-green text-center mt-1 font-black text-xl'>{data.userPoints} POINTS</p>
              </div>
            </div>
            <h6 className='text-2xl font-bold mt-6'>You finished on <span className='text-orange-500 font-black'>#{data.userPlace}</span> place</h6>
            <div className='flex flex-wrap px-3 w-full justify-center gap-8 lg:gap-16 h-full mt-2'>
              <div className='bg-lightblue w-full max-w-lg h-96 rounded-2xl flex flex-col px-4'>
                <div className='border-b-2 border-white py-3'>
                  <h6 className='text-white font-bold text-lg'>Global ranking</h6>
                </div>
                <div className='overflow-auto max-h-full flex flex-col gap-3 scroll-sm scroll-sm-blue my-3 pr-2'>
                  {
                    data.data.slice(0, 1000).map((user, i) => (
                      <div className='flex items-center text-white justify-between gap-4'>
                        <div className='flex gap-3 items-center'>
                          <h6 className={`font-black text-xl ${i < 100 ? 'w-9' : 'w-14'}`}>#{i + 1}</h6>
                          <Image src={user.user.image} alt="Profile picture" width={40} height={40} className='rounded-full' />
                          <p className='font-semibold'>{user.user.name}</p>
                        </div>
                        <div>
                          <p className='text-right'>{user.points} Points</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className='bg-green w-full max-w-lg h-96 rounded-2xl flex flex-col px-4'>
                <div className='border-b-2 border-white py-3'>
                  <h6 className='text-white font-bold text-lg'>Friends ranking</h6>
                </div>
                <div className='overflow-auto max-h-full flex flex-col gap-3 scroll-sm scroll-sm-green my-3 pr-2'>
                  {
                    data.data.slice(0, 1000).map((user, i) => (
                      <div className='flex items-center text-white justify-between gap-4'>
                        <div className='flex gap-3 items-center'>
                          <h6 className={`font-black text-xl ${i < 100 ? 'w-9' : 'w-14'}`}>#{i + 1}</h6>
                          <Image src={user.user.image} alt="Profile picture" width={40} height={40} className='rounded-full' />
                          <p className='font-semibold'>{user.user.name}</p>
                        </div>
                        <div>
                          <p className='text-right'>{user.points} Points</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-4 sm:gap-8 mt-4 justify-center'>
              <button className='bg-black text-white font-bold text-xl w-64 md:w-72 py-2.5 rounded-full hover:scale-105 duration-300 shadow-small shadow-lightblue hover:shadow-transparent'>GO HOME PAGE</button>
              <button className='bg-black text-white font-bold text-xl w-64 md:w-72 py-2.5 rounded-full hover:scale-105 duration-300 shadow-small shadow-green hover:shadow-transparent'>INVITE FRIENDS</button>
            </div>
          </div>
        : <div className='h-screen w-full flex items-center justify-center'>
            <Spinner />
          </div>
      }
    </>
    
  )
}
export default Finished