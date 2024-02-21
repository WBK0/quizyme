"use client";
import Image from "next/image";
import loupe from '@/public/loupe.svg';
import { useRef } from "react";

type SearchbarProps = {
  onChange?: (value: string) => void;
  value?: string;
}

const Searchbar = ({ onChange, value } : SearchbarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div className="w-full bg-gray-100 h-14 rounded-2xl flex items-center" onClick={() => inputRef.current?.focus()}>
      <Image src={loupe} alt="loupe" height={28} className="mx-5"/>
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-transparent outline-none placeholder-gray-400 font-bold text-xl mr-4"
        ref={inputRef}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </div>
  )
}
export default Searchbar;