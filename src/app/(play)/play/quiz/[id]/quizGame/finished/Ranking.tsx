import Image from "next/image";

type RankingProps = {
  data: {
    user: {
      image: string;
      name: string;
    },
    points: number;
  }[],
  type: 'friends' | 'global';
}

const Ranking = ({ data, type } : RankingProps) => {
  return (
    <div className={`bg-${type === 'global' ? 'lightblue' : 'green'} w-full max-w-lg h-96 rounded-2xl flex flex-col px-4`}>
      <div className='border-b-2 border-white py-3'>
        <h6 className='text-white font-bold text-lg'><span className="capitalize">{type}</span> ranking</h6>
      </div>
      <div className={`overflow-auto max-h-full flex flex-col gap-3 scroll-sm scroll-sm-${type === 'global' ? 'blue' : 'green'} my-3 pr-2`}>
        {
          data.slice(0, 1000).map((user, i) => (
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
  )
}
export default Ranking;