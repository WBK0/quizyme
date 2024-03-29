import Spinner from "@/components/Loading/Spinner";
import Image from "next/image";
import { useState } from "react";

type ModalConfirmProps = {
  setImage?: (value: string) => void;
  handleCloseModal: () => void;
  image: any;
}

const ModalConfirm = ({ setImage, image, handleCloseModal } : ModalConfirmProps) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  }

  const handleDecline = async () => {
    setImage && setImage('');
  }

  const handleAccept = async () => {
    handleCloseModal();
  }

  return (
    <div className="max-w-2xl flex flex-col justify-center h-full">
      {
        loading && (
          <div className="mx-auto">
            <Spinner />
          </div>
        )
      }
      <Image 
        src={image} 
        alt="image" 
        width={680} 
        height={380} 
        className={`rounded-xl aspect-video ${loading ? 'w-1' : 'w-full'}`} 
        onLoadingComplete={handleImageLoad}
      />
      {
        !loading && (
          <div className="flex justify-center gap-3 sm:gap-6 mt-12 flex-wrap">
            <button
              className="bg-black text-white shadow-small shadow-red px-12 py-2 rounded-full font-semibold hover:scale-105 duration-300 w-full sm:w-fit"
              onClick={() => handleDecline()}
            >
              Decline
            </button>  
            <button
              className="bg-black text-white shadow-small shadow-green px-12 py-2 rounded-full font-semibold hover:scale-105 duration-300 w-full sm:w-fit"
              onClick={() => handleAccept()}
            >
              Accept
            </button> 
          </div>     
        )
      }   
    </div>
  )
}
export default ModalConfirm;