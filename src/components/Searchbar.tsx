"use client";
import Image from "next/image";
import loupe from '@/public/loupe.svg';
import { useRef } from "react";

const Searchbar = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="w-full bg-gray-100 mt-14 h-14 rounded-2xl flex items-center" onClick={() => inputRef.current?.focus()}>
      <Image src={loupe} alt="loupe" height={28} className="mx-5"/>
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent outline-none placeholder-gray-400 font-bold text-xl mr-4"
        ref={inputRef}
      />
    </div>
  )
}
export default Searchbar;