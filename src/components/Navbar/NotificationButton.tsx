"use client";
import Image from "next/image";
import bell from '@/public/bell.svg';
import { useState } from "react";
import NotificationsList from "./NotificationsList/NotificationsList";

const NotificationButton = () => {
  const [showList, setShowList] = useState(true)

  const handleNotificationList = () => {
    setShowList((prev) => !prev);
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleNotificationList}
      >
        <Image src={bell} height={20} alt="Notifications center" className="cursor-pointer" />
      </button>
      {
        showList ?
          <NotificationsList />
        : null
      }
    </div>
  )
}

export default NotificationButton