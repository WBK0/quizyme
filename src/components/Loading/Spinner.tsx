import Image from 'next/image';
import logo from './logo.svg'

const Spinner = () => {
  return (
    <div className='relative w-fit'>
      <div className='absolute rounded-full w-full h-full animate-spin' style={{background: 'linear-gradient(221deg, #E6CC73 -11.02%, #8ED5A0 122.46%)' }}>
        <div className='right-0 w-1/2 h-1/2 bg-white absolute'>
        </div>
      </div>
      <div className='z-10 relative p-3'>
        <Image src={logo} alt="logo" />
      </div>
    </div>
  )
}
export default Spinner;