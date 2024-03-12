import Image from "next/image";
import Link from "next/link";

const list = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  },
  {
    id: 4
  },
  {
    id: 5
  },
  {
    id: 6
  }
]

const NotificationsList = () => {
  return (
    <div className="absolute w-full mt-16 right-0 md:right-3 max-w-lg z-40">
      <div className="absolute w-full bg-white h-80 rounded-2xl rounded-br-none shadow-2xl">
        <div className="h-full flex flex-col">
          <div className="w-full py-1.5 border-b-3 border-green">
            <h2 className="font-bold text-xl pl-3">
              Notifications
            </h2>
          </div>
          <div className="w-full px-3 scroll-sm-lightgreen overflow-y-auto pt-3 pb-1">
            <div className="flex flex-col gap-4">
              {
                list.map((item) => (
                  <div className="flex justify-between" key={item.id}>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <div>
                        <div className="h-2 w-2 rounded-full bg-green" />
                      </div>
                      <Image 
                        src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                        height={48} 
                        width={48} 
                        alt="user" 
                        className="rounded-full"
                      />
                      <div>
                        <h6 className="font-bold text-normal md:text-lg">
                          You have a new follower!
                        </h6>
                        <p className="text-xs text-neutral-600">
                          Bartłomiej followed you! You build awesome community!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="font-black pl-2"
                      >
                        X
                      </button>
                    </div>
                  </div>
                ))
              }
              <h6
                className="text-center font-bold pb-2"
              >
                No more notifications
              </h6>
            </div>       
          </div>
        </div>  
      </div>
    </div>
  )
}

export default NotificationsList;