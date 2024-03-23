"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Form = () => {
  const [code, setCode] = useState(Array(6).fill(''));
  const inputRefs = useRef<HTMLInputElement[] | null[]>(Array(6).fill(null));
  const [loading, setLoading] = useState(false);
  const [requsted, setRequested] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams()

  const { update } = useSession();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setRequested(true);

      const codeString = code.join('');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/confirm-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: codeString })
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      toast.success('Email confirmed successfully!')
      
    } catch (error : unknown) {
      if(error instanceof Error)
        toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const updateAuth = async () => {  
      if(requsted && !loading){
        await update();
        setTimeout(() => {
          router.push('/auth/complete-register');
        }, 500)
      }
    }

    updateAuth();
  }, [loading])

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
    const text = e.clipboardData.getData('Text');

    if(text.length !== 6){
      return;
    }

    const arrayOfText = text.split(""); 

    setCode(arrayOfText); 
  }

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.selectionStart = 1;
  }

  useEffect(() => {
    if(searchParams.get('code')){
      const code = searchParams.get('code')?.split('');
      if(code)
        setCode(code);
    }
  }, [])

  useEffect(() => {
    if(code.join('').length === 6){
      handleSubmit();
    }
  }, [code])

  return (
    <div className='grid grid-cols-6 gap-1 sm:gap-2 mt-6 max-w-[500px] mx-auto'>
      {
        loading ? (
          <div className='absolute inset-0 bg-black/50 left-0 w-full flex items-center justify-center'>
            <div
              className={`inline-block h-24 w-24 animate-spin rounded-full border-[12px] border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
              role="status">
            </div>
          </div>
        ) : null
      }
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
  )
}

export default Form;