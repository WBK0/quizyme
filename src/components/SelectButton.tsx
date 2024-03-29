"use client";
import { useEffect, useState } from "react";
import useUrlParams from "@/hooks/useUrlParams";
import { toast } from "react-toastify";

const SelectButton = ({ options, paramsName, disable = false } : {options : string[], paramsName?: string, disable?: boolean}) => {
  const { changeParam, getParams } = useUrlParams();
  const params = getParams();
  const [type, setType] = useState<string>(params[paramsName || 'type'] || 'quizzes');

  const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(disable){
      toast.error('You cannot change the type of this content.')
      return;
    }

    const target = e.target as HTMLButtonElement; // Get information about button
    
    changeParam(paramsName || 'type', target.innerText.toLowerCase());
  }

  useEffect(() => {
    setType(params[paramsName || 'type'] || 'quizzes')
  }, [params])

  return (
    <div className={` bg-gradient-to-r from-green-gradient to-yellow-gradient rounded-full py-1 ${options.length === 2 ? 'max-w-sm' : 'max-w-lg'} mx-auto`}>
      <div className="px-1 font-bold relative">
        <div className="relative flex">
          <div className={`absolute bg-white mx-auto rounded-full ${options.length === 2 ? 'w-1/2' : 'w-1/3 '} h-full my-auto top-0 duration-300 ${options.length == 2 ? type === options[0] ? 'left-0' : 'left-1/2' : type === options[0] ? 'left-0' : type === options[1] ? 'left-1/3' : type === options[2] && 'left-2/3'} `}></div> 
          {
            options.map((value) => (
              <button className={`flex-1 text-center z-10 py-2 uppercase ${options.length === 3 ? 'text-xs sm:text-base' : 'text-base'}`} onClick={handleClick} key={value}>
                  <h2>{value}</h2>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SelectButton