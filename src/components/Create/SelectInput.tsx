"use client";
import { useRef, useState, useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form/dist/types/form";
import Image from "next/image";
import caution from '@/public/caution.png';

type SelectInputProps = {
  title: string;
  options: string[];
  defaultValue?: string;
  register: UseFormRegister<any>;
  name: string;
  setValue: UseFormSetValue<any>;
  watch: (name: string) => string;
  error?: string;
}

const SelectInput = ({ title, options, defaultValue, register, name, setValue, watch, error } : SelectInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(name, defaultValue || "")

    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    setValue(name, value)
    setIsOpen(false);
  };

  return (
    <div
      className="bg-gray-100 rounded-xl relative cursor-pointer"
      onClick={toggleSelect}
      ref={dropdownRef}
    >
      <h6 className="px-4 text-gray-400 font-bold text-xs pt-2">{title}</h6>
      <div className="relative">
        <div className={`w-full ${isOpen ? 'rounded-t-xl' : 'rounded-xl'} px-4 pb-2 outline-none font-bold text-lg bg-gray-100 text-black`}>
          {watch(name) || "Select an option"}
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-100 rounded-b-xl pr-3 pb-1 z-10">
            <div className="overflow-y-auto max-h-64 scroll-sm-transparent">   
            {
              options.map((option : string, index : number) => (
                <div
                  key={index}
                  className="px-4 py-2 cursor-pointer font-semibold hover:text-blue"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            }
            </div>
          </div>
        )}
      </div>
      <div className="group">
        {error && 
          <i className="absolute right-7 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
            <Image src={caution} width={24} height={24} alt="error" />
          </i>
        }
        <span className="pointer-events-none absolute bottom-1/2 mb-4 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
          {error}
        </span>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className={`h-4 w-4 fill-current text-gray-500 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 12l-8-8h16z" />
        </svg>
      </div>
      <input
        type="text"
        {...register(name)}
        className='hidden'
      />
    </div>
  )
}
export default SelectInput;