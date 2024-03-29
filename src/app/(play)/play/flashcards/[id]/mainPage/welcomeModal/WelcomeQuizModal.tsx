"use client";
import Image from "next/image";
import welcome from './welcome.svg';
import { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";

const WelcomeQuizModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [value, setLocalStorage] = useLocalStorage('flashcards-welcome', false);

  const router = useRouter();

  useEffect(() => {
    if(!value){
      setShowModal(true);
    }

    const handleEsc = (e: KeyboardEvent) => {
      if(e.key === 'Escape'){
        handleCloseModal();
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  }, [])

  const handleCloseModal = () => {
    setShowModal(false);

    setLocalStorage(true);
  }

  return (
    <>
      {
        showModal ?
          <div className="fixed left-0 top-0 min-h-screen w-full bg-black/50 z-50 flex justify-center items-center">
            <div className="bg-white max-w-2xl w-full relative rounded-2xl px-3">
              <div className="absolute right-3 top-3">
                <button 
                  className="font-black"
                  type="button"
                  onClick={handleCloseModal}  
                >
                  X
                </button>
              </div>
              <div className="w-full flex items-center pt-4 flex-col px-3">
                <Image src={welcome} width={128} height={128} alt="Welcome image" />
                <h2 className="font-bold text-3xl mt-2">Hello!</h2>
                <p className="font-semibold text-md mt-4 text-center">
                  For the best experience with the flashcards, we recommend to sign in.
                </p>
                <p className="font-medium text-sm text-gray-600 mt-1 text-center">
                  After signing in, you can like the flashcards and track your progress. All your data will be saved on our servers.
                </p>
                <button
                  className="bg-black text-white rounded-full mt-6 px-12 py-2 font-bold duration-300 hover:scale-105 hover:shadow-transparent"
                  onClick={() => router.push('/auth/login')}
                >
                  Sign in
                </button>
              </div>
              <p className="pt-14 pb-2 text-center text-xs text-gray-700 font-semibold">
                This modal will not show again after you close it.
              </p>
            </div>
          </div>
        : null
      }
    </>
  )
}
export default WelcomeQuizModal;