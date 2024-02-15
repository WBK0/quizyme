import FinishedData from "./finishedData.type";

const UserResult = ({ data, type } : { data: FinishedData, type: 'quiz' | 'flashcards' }) => {
  if(!data) return null;
  
  return (
    <div className='flex flex-col sm:flex-row justify-between sm:gap-24 gap-4'>
      <div className='flex-grow'>
        <h3 className='font-black text-xl text-center'>CORRECT ANSWERS</h3>
        <p className='text-lightblue text-center mt-1 font-black text-xl'>{data.userCorrectAnswers}/{data.answersLength}</p>
      </div>
      {
        type === 'quiz' 
        ?
          <div className='flex-grow'>
            <h3 className='font-black text-xl text-center'>POINTS EARNED</h3>
            <p className='text-green text-center mt-1 font-black text-xl'>{data.userPoints} POINTS</p>
          </div>
        : null
      }
      
    </div>
  )
}
export default UserResult;