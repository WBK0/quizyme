import Image from "next/image";
import congratulations from '@/public/congratulations.svg';

const Heading = () => {
  return (
    <>
      <Image src={congratulations} alt="Congratulations" width={196} />
      <h1 className='font-black text-2xl sm:text-4xl'>CONGRATULATIONS</h1>
    </>
  )
}
export default Heading;