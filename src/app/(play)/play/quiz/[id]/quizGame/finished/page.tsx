import Image from 'next/image';
import congratulations from '@/public/congratulations.svg';
import defaultPicture from '@/public/defaultPicture.png';

const Finished = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 container mx-auto py-8">
      <Image src={congratulations} alt="Congratulations" width={196} />
      <h1 className='font-black text-2xl sm:text-4xl'>CONGRATULATIONS</h1>
      <div className='flex flex-col sm:flex-row justify-between sm:gap-24 gap-4'>
        <div className='flex-grow'>
          <h3 className='font-black text-xl text-center'>CORRECT ANSWERS</h3>
          <p className='text-lightblue text-center mt-1 font-black text-xl'>10/20</p>
        </div>
        <div className='flex-grow'>
          <h3 className='font-black text-xl text-center'>POINTS EARNED</h3>
          <p className='text-green text-center mt-1 font-black text-xl'>4329 POINTS</p>
        </div>
      </div>
      <h6 className='text-2xl font-bold mt-6'>You finished on <span className='text-orange-500 font-black'>#31</span> place</h6>
      <div className='flex w-full justify-center gap-16 h-full mt-8'>
        <div className='bg-lightblue w-full max-w-lg h-96 rounded-2xl flex flex-col px-4'>
          <div className='border-b-2 border-white py-3'>
            <h6 className='text-white font-bold text-lg'>Global ranking</h6>
          </div>
          <div className='overflow-auto max-h-full flex flex-col gap-3 scroll-sm scroll-sm-blue my-3 pr-2'>
            {
              Array.from({ length: 10 }).map((_, i) => (
                <div className='flex items-center text-white justify-between'>
                  <div className='flex gap-3 items-center'>
                    <h6 className='font-black text-xl mr-2'>#1</h6>
                    <Image src={defaultPicture} alt="Profile picture" width={40} height={40} className='rounded-full' />
                    <p className='font-semibold'>Bartłomiej Ostojski</p>
                  </div>
                  <div>
                    <p>3621 Points</p>
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
              Array.from({ length: 10 }).map((_, i) => (
                <div className='flex items-center text-white justify-between'>
                  <div className='flex gap-3 items-center'>
                    <h6 className='font-black text-xl mr-2'>#1</h6>
                    <Image src={defaultPicture} alt="Profile picture" width={40} height={40} className='rounded-full' />
                    <p className='font-semibold'>Bartłomiej Ostojski</p>
                  </div>
                  <div>
                    <p>3621 Points</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Finished