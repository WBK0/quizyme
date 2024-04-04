"use client";
import Image from "next/image";
import bell from '@/public/bell.svg';
import bellwithdot from '@/public/bellwithdot.svg';
import { useEffect, useState } from "react";

const NotificationButton = ({ setShowList } : { setShowList: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [areRead, setAreRead] = useState(true);
  
  const handleNotificationList = () => {
    handleRead();
    setShowList((prev) => !prev);
  }

  const getAreRead = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/notifications/are-read`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setAreRead(json.areRead);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleRead = async () => {
    try {
      setAreRead(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/notifications/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      });

      const json = await response.json();

      if(!response.ok){
        throw new Error(json.message);
      }

      setAreRead(true);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getAreRead();

    const interval = setInterval(() => {
      getAreRead();
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleNotificationList}
      >
        {
          areRead ?
          <Image src={bell} alt="Notifications center" className="cursor-pointer h-4 md:h-5" /> :
          <Image src={bellwithdot} alt="Notifications center" className="cursor-pointer h-4 md:h-5" />
        }
      </button>
    </div>
  )
}

export default NotificationButton