"use client";
import Image from "next/image";
import person from '../../public/person.svg';
import Link from "next/link";
import NotificationButton from "./NotificationButton";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import NotificationsList from "./NotificationsList/NotificationsList";

const Actions = ({ session } : { session: Session | null }) => {
  const [showResponsive, setShowResponsive] = useState(false);
  const [showList, setShowList] = useState(true)

  const handleShowMenu = (value: boolean) => {
    setShowResponsive(value)
  }
  
  const pathname = usePathname();

  return (
    <>
      <div className="flex gap-1 flex-1 justify-end hidden md:flex">
        {
          session
          ? 
          <>
            <NotificationButton setShowList={setShowList} />
            <Image src={person} height={20} alt="User profile" className="cursor-pointer" />
          </>
          : 
          <Link
            className="bg-black hover:bg-white text-white font-bold py-1 px-6 border-2 border-transparent hover:border-black hover:text-black rounded-full"
            href={`/auth/login?callbackUrl=${pathname}`}
          >
            Sign in
          </Link>
        }
      </div>
      
      <div className="md:hidden flex items-center gap-1">
        <NotificationButton setShowList={setShowList} />
        <div className="md:hidden cursor-pointer" onClick={() => handleShowMenu(true)}>
          <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </div>
      </div>
      {
        showResponsive
        ?
          <MobileMenu handleShowMenu={handleShowMenu} />
        :
          null
      }
      {
        showList ?
          <NotificationsList />
        : null
      }
    </>
  )
}
export default Actions;