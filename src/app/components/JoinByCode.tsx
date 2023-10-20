"use client";
import CodeForm from "@/components/CodeForm";

const JoinByCode = () => {


  return (
    <div className='w-full px-3 mt-28 pb-40 max-w-[650px] mx-auto'>
      <div className='bg-red w-full rounded-3xl pt-12 pb-14'>
        <h2 className='text-3xl text-white font-bold text-center'>
          JOIN QUIZ OR FLASHCARDS
        </h2>
        <h3 className='text-xl text-white font-bold text-center mt-6  '>
          ENTER 6-DIGIT CODE BELOW
        </h3>
        <CodeForm />
      </div>      
    </div>
  )
}

export default JoinByCode;