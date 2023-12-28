"use client"

import Button from "@/components/Button";

type QuizCodeProps = {
  code: string;
}

const QuizCode = ({ code } : QuizCodeProps) => {
  return (
    <div className='w-full mt-36 max-w-[650px] mx-auto'>
      <div className='bg-red w-full rounded-3xl pt-12 pb-14'>
        <h2 className='text-3xl text-white font-bold text-center'>
          QUIZ CODE
        </h2>
        <h3 className='text-xl text-white font-bold text-center mt-6  '>
          COPY 6 DIGIT CODE AND SHARE
        </h3>
          <div className='grid grid-cols-6 gap-2 px-3 mt-6 max-w-[500px] mx-auto'>
          {
            Array.from(code).map((value, index) => (
              <input 
                key={index}
                className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square cursor-end caret-transparent select-none'
                value={value}
                disabled
              />
            ))
          }
        </div>
        <div className="mt-10 flex justify-center">
          <Button
            onClick={() => navigator.clipboard.writeText(code)}
          >
            COPY
          </Button>
        </div>
      </div>      
    </div>
  )
}
export default QuizCode;