import EasySpinner from "@/components/Loading/EasySpinner";
import Spinner from "@/components/Loading/Spinner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Notifications = {
  id: string;
  message: string;
  sender: {
    id: string;
    image: string;
  },
  isRead: boolean;
  url: string;
  type: 'follow' | 'invitation' | 'welcome';
  deleting?: boolean;
}[] | null;

const NotificationsList = ({ handleClose } : { handleClose: () => void }) => {
  const [notifications, setNotifications] = useState<Notifications>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [display, setDisplay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAll, setIsAll] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const step = 10;

  const handleDelete = async (id: string) => {
    try {
      setNotifications((prev) => prev && prev.map((item) => item.id === id ? { ...item, deleting: true } : item));

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/notifications/delete/${id}`, {
        method: 'DELETE'
      });
  
      if(!response.ok){
        throw new Error("Error while deleting notification. Please try again later.");
      }

      setNotifications((prev) => prev && prev?.filter((item) => item.id !== id));
    } catch (error : unknown) {
      if(error instanceof Error)
        setError(error.message);
    }
  }

  const handleNotification = (id: string, url: string) => {
    fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/notifications/read/${id}`, {
      method: 'PATCH'
    });

    router.push(url);

    handleClose();
  }

  const getNotifications = async (skip: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/notifications?skip=${skip}&limit=${step}`);
      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message);
      }

      if(data.notifications.length < step){
        setIsAll(true);
      }

      if(skip === 0){
        setNotifications(data.notifications);
      }else{
        setNotifications((prev) => prev && [...prev, ...data.notifications])
      }
    } catch (error : unknown) {
      if(error instanceof Error)
        setError(error.message || "Error while fetching notifications. Please try again later.");
    } finally {
      setDisplay(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!display || loading) return;
    if(isAll) return;

    const handleScroll = () => {
      if(containerRef.current){
        if(containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight){
          getNotifications(notifications?.length || 0);
        }
      }
    }

    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    }
  }, [containerRef.current, isAll, loading])

  useEffect(() => {
    getNotifications(0);
  }, [])
  
  return (
    <div className="absolute w-full mt-16 right-0 md:right-3 max-w-lg z-40">
      <div className="absolute w-full bg-white h-80 rounded-2xl rounded-br-none shadow-2xl">
        <div className="h-full flex flex-col">
          <div className="w-full py-1.5 border-b-3 border-green flex justify-between">
            <h2 className="font-bold text-xl pl-3">
              Notifications
            </h2>
            <button
              className="pr-3 text-lg font-black"
              type="button"
              onClick={handleClose}
            >
              X
            </button>
          </div>
          {
            !error && display && notifications ?
              <div className="w-full px-3 scroll-sm-lightgreen overflow-y-auto pt-3 pb-1" ref={containerRef} >
                <div className="flex flex-col gap-4">
                  {notifications.map((item) => (
                    <div className="flex justify-between" key={item.id}>
                      <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleNotification(item.id, item.url)}
                      >
                        {
                          !item.isRead ?
                            <div>
                              <div className="h-2 w-2 rounded-full bg-green" />
                            </div>
                          : null
                        }
                        <Image 
                          src={item.sender.image}
                          height={48} 
                          width={48} 
                          alt="user photo" 
                          className="rounded-full"
                        />
                        <div>
                          <h6 className="font-bold text-normal md:text-lg">
                            {
                              item.type === 'follow' 
                              ? "You've got a new follower!" : item.type === 'invitation'
                              ? "You've been invited to a study!" : item.type === 'welcome'
                              ? "Welcome in our family!"
                              : "You've got a new message!"
                            }
                          </h6>
                          <p className="text-xs text-neutral-600">
                            {item.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          type="button"
                          className="font-black pl-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          {
                            item.deleting ?
                              <EasySpinner color="black" size={4} />
                            : "X"
                          }
                        </button>
                      </div>
                    </div>
                  ))}
                  {
                    isAll ?
                      <h6
                        className="text-center font-semibold text-neutral-500 py-2"
                      >
                        No more notifications
                      </h6>
                    : null
                  }
                  {
                    loading ? 
                      <div className="flex justify-center pb-3">
                        <EasySpinner color="black" />
                      </div>
                    : null
                  }
                </div>       
              </div>
            : !error ?
              <div className="flex justify-center w-full mt-6">
                <Spinner />
              </div>
              : <p className="font-semibold text-neutral-500 py-6 text-center">
                  {error}
                </p>
          }
        </div>  
      </div>
    </div>
  )
}

export default NotificationsList;