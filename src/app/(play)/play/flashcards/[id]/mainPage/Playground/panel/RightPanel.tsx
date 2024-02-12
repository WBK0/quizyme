import Image from "next/image";
import fullscreen from './svg/fullscreen.svg';
import useUrlParams from "@/hooks/useUrlParams";
import { useState } from "react";
import EasySpinner from "@/components/Loading/EasySpinner";

const RightPanel = () => {
  const [loading, setLoading] = useState(false);
  const { changeParam } = useUrlParams()

  const handleChangeParam = () => {
    setLoading(true);
    changeParam('fullscreen', 'true');
  }

  return (
    <div className='flex gap-2 flex-1 justify-end'>
      <button
        type="button"
        onClick={handleChangeParam}
        disabled={loading}
      >
        {
          !loading 
            ? <Image src={fullscreen} width={18} height={18} alt="fullscreen" />
            : <EasySpinner />
        }
      </button>
    </div>
  )
}
export default RightPanel;