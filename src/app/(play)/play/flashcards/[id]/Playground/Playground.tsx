import Image from 'next/image';
import play from './play.svg';
import shuffle from './shuffle.svg';
import leftarrow from './leftarrow.svg';
import rightarrow from './rightarrow.svg';
import fullscreen from './fullscreen.svg';

const Playground = () => {
  return (
    <>
      <div className="w-full aspect-video bg-green rounded-2xl flex justify-center items-center px-8">
        <p className="font-bold text-white text-lg md:text-2xl text-center py-2">
          Lorem Ipsum jest tekstem stosowanym 
        </p>
      </div>
      <div className="px-3 flex justify-between py-2.5">
  <div className='flex gap-3 flex-1 justify-start'>
    <button>
      <Image src={play} width={14} alt="play" />
    </button>
    <button>
      <Image src={shuffle} width={18} height={18} alt="shuffle" />
    </button>
  </div>
  <div className='flex gap-3 sm:gap-6 grow justify-center'>
    <button>
      <Image src={leftarrow} width={18} height={18} alt="leftarrow" />
    </button>
    <p className='font-black text-lg'>12 / 45</p>
    <button>
      <Image src={rightarrow} width={18} height={18} alt="rightarrow" />
    </button>
  </div>
  <div className='flex gap-2 flex-1 justify-end'>
    <button>
      <Image src={fullscreen} width={18} height={18} alt="fullscreen" />
    </button>
  </div>
</div>

    </>
  )
}

export default Playground;