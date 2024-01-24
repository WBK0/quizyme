import { useRouter } from "next/navigation";

const Buttons = () => {
  const router = useRouter();

  return (
    <div className='flex flex-wrap gap-4 sm:gap-8 mt-4 justify-center'>
      <button 
        className='bg-black text-white font-bold text-xl w-64 md:w-72 py-2.5 rounded-full hover:scale-105 duration-300 shadow-small shadow-lightblue hover:shadow-transparent'
        onClick={() => router.push('/')}
      >
        GO HOME PAGE
      </button>
      <button 
        className='bg-black text-white font-bold text-xl w-64 md:w-72 py-2.5 rounded-full hover:scale-105 duration-300 shadow-small shadow-green hover:shadow-transparent'
        onClick={() => {}}
      >
        INVITE FRIENDS
      </button>
    </div>
  )
}

export default Buttons;