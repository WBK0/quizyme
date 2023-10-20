"use client";
import Button from "@/components/Button";
import { useRef, useState } from "react";

const JoinByCode = () => {
  const [code, setCode] = useState(Array(6).fill(''));

  const inputRefs = useRef<HTMLInputElement[] | null[]>(Array(6).fill(null));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index : number) => {
    if(e.target.value.length > 1){
      e.target.value = e.target.value.slice(1, 2);
    }
    setCode((prev) => {
      return(code[index] = e.target.value, [...prev])
    })
    if (e.target.value !== '') {
      if (index !== 5) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[index]?.blur();
      }
    } 
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('Text'); // Get data from clipboard

    if(text.length !== 6){
      return;
    }

    const arrayOfText = text.split(""); // Split text into array    

    setCode(arrayOfText); // Set state to array
  }

  const handleKeys = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && code[index] === '') {
      if (index !== 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }else if(e.key === 'ArrowLeft'){
      if (index !== 0) {
        if (inputRefs.current && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
          setTimeout(() => {
            if (inputRefs.current && inputRefs.current[index - 1]) {
              inputRefs.current[index - 1]!.selectionStart = 1;
            }
          });
        }
      }
    }else if (e.key === 'ArrowRight') {
      if (index !== 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  }
  
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.selectionStart = 1;
  }

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
          {
            code.map((value, index) => (
              <input 
                key={index}
                className='bg-white w-full rounded-xl sm:rounded-2xl text-center font-black sm:text-3xl text-2xl outline-none uppercase shadow-xl aspect-square cursor-end caret-transparent focus:bg-gray-300 select-none'
                value={value}
                onPaste={handlePaste}
                ref={(el) => inputRefs.current[index] = el}
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeys(e, index)}
                onClick={handleClick}
              />
            ))
          }
        </div>
        <div className="mt-10 flex justify-center">
          <Button>JOIN</Button>
        </div>
      </div>      
    </div>
  )
}

export default JoinByCode;