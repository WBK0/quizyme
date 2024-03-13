import Share from "@/components/ShareModal/Share";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Buttons = ({ studyId } : { studyId: string }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleOpenModal = () => {
    setShowModal(true);
  }

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
        onClick={handleOpenModal}
      >
        INVITE FRIENDS
      </button>
      {
        showModal ?
          <Share 
            type="quiz"
            handleClose={handleCloseModal}
            studyId={studyId}
          />
        : null
      }
    </div>
  )
}

export default Buttons;