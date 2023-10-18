import React from 'react'
import Image from 'next/image';
import logo from '@/public/logo.svg'
import Link from 'next/link';

const MobileMenu = ({ handleShowMenu } : { handleShowMenu: (value: boolean) => void; }) => {
  return (
    <div className="absolute w-full h-screen left-0 top-0 bg-black/25 md:hidden">
      <div className="bg-white h-screen max-w-sm drop-shadow-xl mr-16 flex flex-wrap flex-col">
        <div className="flex place-content-between items-center pt-4 px-5">  
          <div>
            <Image src={logo} height={60} width={60} alt="Website logo"/>
          </div>
        <div onClick={() => handleShowMenu(false)}>
          <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>            
      </div>
      <div className="flex flex-wrap pt-8 px-4">
        <Link className="hover:bg-blue-50 w-full px-4 py-4 rounded-md font-semibold text-gray-400 hover:text-blue-600" href={"#"}>
          Home
        </Link>
        <Link className="hover:bg-blue-50 w-full px-4 py-4 rounded-md font-semibold text-gray-400 hover:text-blue-600" href={"#"}>
          Create
        </Link>
        <Link className="hover:bg-blue-50 w-full px-4 py-4 rounded-md font-semibold text-gray-400 hover:text-blue-600" href={"#"}>
          Play
        </Link>
        <Link className="hover:bg-blue-50 w-full px-4 py-4 rounded-md font-semibold text-gray-400 hover:text-blue-600" href={"#"}>
          Learn
        </Link>
      </div>
      <div className="mt-auto px-4 mb-9 font-bold">
        <button className="bg-black text-white rounded-full py-4 w-full">
          SIGN IN
        </button>
      </div>
    </div>
  </div>
  )
}

export default MobileMenu;