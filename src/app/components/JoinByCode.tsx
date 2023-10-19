import Button from "@/components/Button";

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
        <div className='grid grid-cols-6 gap-2 px-3 mt-6 max-w-[500px] mx-auto'>
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-squere'
            maxLength={1}  
          />
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square'
            maxLength={1}  
          />
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square'
            maxLength={1}  
          />
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square'
            maxLength={1}  
          />
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square'
            maxLength={1}  
          />
          <input 
            className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square'
            maxLength={1}  
          />
        </div>
        <div className="mt-10 flex justify-center">
          <Button>JOIN</Button>
        </div>
      </div>      
    </div>
  )
}

export default JoinByCode;