import { useRef, useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EasySpinner from "./Loading/EasySpinner";

const CodeForm = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[] | null[]>(Array(6).fill(null));
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('Text'); // Get data from clipboard

    if(text.length !== 6){
      return;
    }

    const arrayOfText = text.split(""); // Split text into array    

    setCode(arrayOfText); // Set state to array
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.selectionStart = 1;
  }

  const handleJoin = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/code/${code.join('')}`);

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      router.push(`${process.env.NEXT_PUBLIC_URL}/${data.path}`)
    } catch (error) {
      toast.error('Invalid code');
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <div className='grid grid-cols-6 gap-1 sm:gap-2 px-3 mt-6 max-w-[500px] mx-auto'>
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
    <div className="mt-10 flex justify-center w-64 mx-auto">
      <Button
        onClick={handleJoin}
        disablePadding={true}
      >
        {
          loading ? 
            <EasySpinner />
          : "JOIN"
        }
      </Button>
    </div>
  </>
    
  )
}
export default CodeForm;