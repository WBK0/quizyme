import Image from "next/image";
import person from '@/public/person.svg';
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const UserList = ({ openNotifications } : { openNotifications: boolean }) => {
  const [showUserList, setShowUserList] = useState(true);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

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
          <Image src={person} height={20} alt="User profile" className="cursor-pointer" />
        </button>
        {
          showUserList ?
            <div className="absolute transform -translate-x-1/2 top-8 shadow-2xl rounded-xl py-2 w-52 text-center  flex flex-col gap-1 z-50 bg-green" ref={elementRef}>
              <Link 
                href="/profile"
                className="w-full hover:bg-white py-1 font-bold text-lg"
              >
                Profile
              </Link>
              <Link 
                href="/profile"
                className="w-full hover:bg-white py-1 font-bold text-lg"
              >
                My space
              </Link>
              <Link 
                href="/profile"
                className="w-full hover:bg-white py-1 font-bold text-lg"
              >
                My studies
              </Link>
              <Link 
                href="/profile"
                className="w-full hover:bg-white py-1 font-bold text-lg"
              >
                Logout
              </Link>
            </div> 
          : null
        }
      </div>
    </>
    
  )
}

export default UserList;