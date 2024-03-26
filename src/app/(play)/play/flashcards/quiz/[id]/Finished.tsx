import { useEffect, useState } from 'react';
import Spinner from '@/components/Loading/Spinner';
import NotFound from '@/components/404/404';
import Heading from '../../../quiz/[id]/quizGame/finished/Heading';
import UserResult from '../../../quiz/[id]/quizGame/finished/UserResult';
import Ranking from '../../../quiz/[id]/quizGame/finished/Ranking';
import Buttons from '../../../quiz/[id]/quizGame/finished/Buttons';
import FinishedData from '../../../quiz/[id]/quizGame/finished/finishedData.type';

const Finished = ({ id } : { id: string }) => {
  const [data, setData] = useState<FinishedData>(null);
  const [error, setError] = useState(false);

  const fetchFinished = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/play/flashcards/${id}/user/quiz/finished`, {
        method: 'GET',
        cache: 'no-cache',
      });

      const data = await response.json();
      
      if(!response.ok){
        throw new Error("An error occured while fetching data")
      } 

      setData(data);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    fetchFinished();
  }, [])

  return (
    <>
    {
      error ?
        <NotFound 
          message="Sorry, the quiz you are looking for does not exist!"
          redirectTo="search"
          url="/search"
        />
      :
        data
          ? 
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 container mx-auto py-8 pb-16">
              <Heading />
              <UserResult data={data} type='flashcards' />
              <h6 className='text-2xl font-bold mt-6'>You finished on <span className='text-orange-500 font-black'>#{data.userPlace}</span> place</h6>
              <div className='flex flex-wrap px-3 w-full justify-center gap-8 lg:gap-16 h-full mt-2'>
                <Ranking data={data.data} type='global' isQuiz={false} answersLength={data.answersLength} />
                <Ranking data={data.data} type='friends' isQuiz={false} answersLength={data.answersLength} />
              </div>
              <Buttons 
                studyId={data.studyId}
              />
            </div>
          : <div className='h-screen w-full flex items-center justify-center'>
              <Spinner />
            </div>
      }
    </>
  )
}
export default Finished