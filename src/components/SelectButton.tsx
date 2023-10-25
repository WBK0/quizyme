"use client";

import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SelectButton = ({ options } : {options : string[]}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [type, setType] = useState<string>(searchParams.get('type') || 'quizzes');

  const handleClick = (e : React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("type", target.outerText.toLowerCase());
    const search = current.toString();
    router.push(`${pathname}?${search}`);
  }

  useEffect(() => {
    setType(searchParams.get('type'))
  }, [searchParams])

  return (
    <div className={`mt-12 bg-gradient-to-r from-green-gradient to-yellow-gradient rounded-full py-1 ${options.length === 2 ? 'max-w-sm' : 'max-w-md'} mx-auto`}>
      <div className="px-1  font-bold relative">
        <div className="relative flex">
          <div className={`absolute bg-white mx-auto rounded-full ${options.length === 2 ? 'w-1/2' : 'w-1/3'} h-full my-auto top-0 duration-300 ${options.length == 2 ? type === options[0] ? 'left-0' : 'left-1/2' : type === options[0] ? 'left-0' : type === options[1] ? 'left-1/3' : type === options[2] && 'left-2/3'} `}></div> 
          {
            options.map((value) => (
              <button className="flex-1 text-center z-10 py-2 uppercase" onClick={handleClick} key={value}>
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