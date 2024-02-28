import Searchbar from "@/components/Searchbar";
import Image from "next/image";

const data = [
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  },
  {
    user: {
      image: "https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c",
      name: "Bartłomiej Ostojewski",
    },
    points: 100,
    correctAnswers: 10,
  }
]

const Ranking = () => {
  return (
    <div className="max-w-4xl bg-lightblue rounded-2xl mt-12 pb-4 mx-1 sm:mx-auto">
      <div className="border-b-3 mx-4 border-white pt-2 mb-4">
        <p className="font-bold text-white text-normal mb-1">Global ranking</p>
      </div>
      <div className="max-w-2xl mx-auto px-3">
        <Searchbar />
      </div>
      <div className="px-3 max-w-2xl mx-auto"> 
        <div className="w-24 bg-white mx-auto h-1 my-4" />
          <div className="pr-3 flex flex-col gap-4 h-[375px] overflow-y-auto scroll-sm-blue">
            { 
              data.map((user, i) => (
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
                        <p className='text-right font-bold'>{user.points} Points</p>
                        <p className='text-right font-bold hidden sm:block'>{user.correctAnswers} / 10 Correct</p>
                      </div>
                    </>
                  }
                </div>
              ))
            }
        </div>   
      </div>
    </div>
  )
}

export default Ranking;