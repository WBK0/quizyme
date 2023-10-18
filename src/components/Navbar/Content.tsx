"use client";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Content = () => {
  const [showResponsive, setShowResponsive] = useState(false); // Is responsive menu open
  
  const handleShowMenu = (value: true | false) => {
    setShowResponsive(value)
  }

  return (
    <>
      <div className="gap-8 justify-center flex-2 font-bold text-base hidden md:flex">
        <Link href="/" className="hover:text-gray-600">
          HOME
        </Link>
        <Link href="/" className="hover:text-gray-600">
          CREATE
        </Link>
        <Link href="/" className="hover:text-gray-600">
          PLAY
        </Link>
        <Link href="/" className="hover:text-gray-600">
          LEARN
        </Link>
      </div>
      <div className="md:hidden cursor-pointer" onClick={() => handleShowMenu(true)}>
        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<title>Mobile menu</title>
					<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
				</svg>
      </div>
      {
        showResponsive
        ?
          <MobileMenu handleShowMenu={handleShowMenu} />
        :
          null
      }
    </>
  )
}
export default Content;