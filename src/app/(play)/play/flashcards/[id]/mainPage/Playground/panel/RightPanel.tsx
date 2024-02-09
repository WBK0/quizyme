import Image from "next/image";
import fullscreen from './svg/fullscreen.svg';

const RightPanel = () => {
  return (
    <div className='flex gap-2 flex-1 justify-end'>
      <button>
        <Image src={fullscreen} width={18} height={18} alt="fullscreen" />
      </button>
    </div>
  )
}
export default RightPanel;