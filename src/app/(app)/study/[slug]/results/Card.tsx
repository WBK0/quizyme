import Image from "next/image";

type CardProps = {
  data: {
    user: { 
      id: string;
      name: string;
      image: string;
      username: string;
    };
    points: number;
    correctAnswers: number;
  };
  i: number;
  type: 'quiz' | 'flashcards';
  questionLength: number;
}

const Card = ({ data, i, type, questionLength } : CardProps) => {
  return (
    <div className='flex items-center text-white justify-between gap-4'>
      <div className='flex gap-3 items-center'>
        <h6 className={`font-black text-xl ${i < 100 ? 'w-9' : 'w-14'}`}>#{i + 1}</h6>
        <Image src={data.user.image} alt="Profile picture" width={40} height={40} className='rounded-full aspect-square' />
        <p className='font-semibold sm:hidden'>
          {data.user.name.split(' ')[0].substring(0, 12)}{data.user.name.split(' ')[0].length > 12 ? '...' : ''} 
          <span> </span>
          {data.user.name.split(' ')[1].substring(0, 12)}{data.user.name.split(' ')[1].length > 12 ? '...' : ''} 
        </p>
        <p className='font-semibold hidden sm:block'>
          {data.user.name.split(' ')[0].substring(0, 16)}{data.user.name.split(' ')[0].length > 16 ? '...' : ''} 
          <span> </span>
          {data.user.name.split(' ')[1].substring(0, 16)}{data.user.name.split(' ')[1].length > 16 ? '...' : ''} 
        </p>
      </div>
      {
        <>
          <div className="flex gap-2 sm:gap-4">
            {
              type === 'quiz' ? (
                <p className='text-right font-bold'>{data.points || 0} Points</p>
              ) : null
            }
            {
              type === 'quiz' ? (
                <p className='text-right font-bold hidden sm:block'>{data.correctAnswers || 0} / {questionLength} Correct</p>
              ) : (
                <p className='text-right font-bold'>{data.correctAnswers || 0} / {questionLength} Correct</p>
              )
            }
          </div>
        </>
      }
    </div>
  )
}

export default Card;