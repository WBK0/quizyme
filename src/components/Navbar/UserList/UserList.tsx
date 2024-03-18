import Image from "next/image";
import person from '@/public/person.svg';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react";

const UserList = ({ openNotifications } : { openNotifications: boolean }) => {
  const [showUserList, setShowUserList] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { data: session } = useSession();


  useEffect(() => {
    if(openNotifications){
      setShowUserList(false)
    }
  }, [openNotifications])

  useEffect(() => {
    const handleResize = () => {
      if(elementRef.current){
        if((elementRef.current.offsetParent as HTMLElement)?.offsetLeft + elementRef.current.clientWidth / 2 + 20 < window.innerWidth){
          elementRef.current.style.left = '0%'
          elementRef.current.style.translate = 'none';
        }else{
          elementRef.current.style.left = `100%`;
          elementRef.current.style.translate = '-50%';
        }
      }
    }

    handleResize()

    window.addEventListener('resize', handleResize);
  }, [elementRef.current, showUserList])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if(elementRef.current && !elementRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)){
        setShowUserList(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, [elementRef.current])

  return (
    <>
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={() => setShowUserList((prev) => !prev)}
          ref={buttonRef}
        >
          <Image src={person} height={20} alt="User profile" className="cursor-pointer aspect-square" />
        </button>
        {
          showUserList ?
            <div className="absolute transform -translate-x-1/2 top-8 shadow-2xl rounded-xl py-2 w-52 text-center  flex flex-col gap-1 z-50 bg-white" ref={elementRef}>
              <Link 
                href={`/profile/${session?.user.username}`}
                className="w-full hover:bg-zinc-50 py-1 font-bold text-lg"
              >
                Profile
              </Link>
              <Link 
                href="/user/space"
                className="w-full hover:bg-zinc-50 py-1 font-bold text-lg"
              >
                My space
              </Link>
              <Link 
                href="/user/studies"
                className="w-full hover:bg-zinc-50 py-1 font-bold text-lg"
              >
                My studies
              </Link>
              <button 
                className="w-full hover:bg-zinc-50 py-1 font-bold text-lg"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div> 
          : null
        }
      </div>
    </>
    
  )
}

export default UserList;