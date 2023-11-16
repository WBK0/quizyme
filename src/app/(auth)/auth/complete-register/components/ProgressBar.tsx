"use client";

import { useContext } from "react";
import { CompleteRegisterContext } from "../CompleteRegisterProvider";

const ProgressBar = () => {
  const { step } = useContext(CompleteRegisterContext);
  return (
    <div className='absolute top-6 w-full left-0'>
      <div className='w-2/3 max-w-sm md:w-full bg-gray-300 h-4 mx-auto rounded-full relative'>
        <div className={`absolute left-0 h-4 bg-green rounded-xl duration-500`} style={{width: `${((step + 1) * 100) / 5}%`}}>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;