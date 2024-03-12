"use client";
import Image from "next/image";
import bell from '@/public/bell.svg';

const NotificationButton = ({ setShowList } : { setShowList: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleNotificationList = () => {
    setShowList((prev) => !prev);
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleNotificationList}
      >
        <Image src={bell} alt="Notifications center" className="cursor-pointer h-4 md:h-5" />
      </button>
      
    </div>
  )
}

export default NotificationButton