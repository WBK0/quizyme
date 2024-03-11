import Image from "next/image";
import Link from "next/link";

const NotificationsList = () => {
  return (
    <div className="absolute w-full mt-12 right-3 max-w-lg z-40">
      <div className="absolute w-full bg-white h-80 rounded-2xl rounded-br-none ring-2 ring-black">
        <div className="h-full flex flex-col">
          <div className="w-full py-1.5 border-b-3 border-black">
            <h2 className="font-bold text-xl pl-3">
              Notifications
            </h2>
          </div>
          <div className="w-full px-3 scroll-sm-transparent overflow-y-auto pt-4 pb-1">
            <div className="flex flex-col gap-3">
            <Link className="flex items-center gap-2" href="/">
                <div>
                  <div className="h-2 w-2 rounded-full bg-green" />
                </div>
                <Image 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                  height={64} 
                  width={64} 
                  alt="user" 
                  className="rounded-full"
                />
                <div>
                  <h6 className="font-bold text-xl">
                    You have a new follower!
                  </h6>
                  <p className="text-xs font-semibold">
                    Bartłomiej followed you! You build awesome community!
                  </p>
                </div>
              </Link>
              <Link className="flex items-center gap-2" href="/">
                <div>
                  <div className="h-2 w-2 rounded-full bg-green" />
                </div>
                <Image 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                  height={64} 
                  width={64} 
                  alt="user" 
                  className="rounded-full"
                />
                <div>
                  <h6 className="font-bold text-xl">
                    You have a new follower!
                  </h6>
                  <p className="text-xs font-semibold">
                    Bartłomiej followed you! You build awesome community!
                  </p>
                </div>
              </Link><Link className="flex items-center gap-2" href="/">
                <div>
                  <div className="h-2 w-2 rounded-full bg-green" />
                </div>
                <Image 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                  height={64} 
                  width={64} 
                  alt="user" 
                  className="rounded-full"
                />
                <div>
                  <h6 className="font-bold text-xl">
                    You have a new follower!
                  </h6>
                  <p className="text-xs font-semibold">
                    Bartłomiej followed you! You build awesome community!
                  </p>
                </div>
              </Link><Link className="flex items-center gap-2" href="/">
                <div>
                  <div className="h-2 w-2 rounded-full bg-green" />
                </div>
                <Image 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                  height={64} 
                  width={64} 
                  alt="user" 
                  className="rounded-full"
                />
                <div>
                  <h6 className="font-bold text-xl">
                    You have a new follower!
                  </h6>
                  <p className="text-xs font-semibold">
                    Bartłomiej followed you! You build awesome community!
                  </p>
                </div>
              </Link>
              <Link className="flex items-center gap-2" href="/">
                <div>
                  <div className="h-2 w-2 rounded-full bg-green" />
                </div>
                <Image 
                  src="https://lh3.googleusercontent.com/a/ACg8ocJO5Ft4wo3ToMc771NaE9m8Pay8VIDMZ5JNo_j145uo=s96-c"
                  height={64} 
                  width={64} 
                  alt="user" 
                  className="rounded-full"
                />
                <div>
                  <h6 className="font-bold text-xl">
                    You have a new follower!
                  </h6>
                  <p className="text-xs font-semibold">
                    Bartłomiej followed you! You build awesome community!
                  </p>
                </div>
              </Link>
            </div>       
          </div>
        </div>  
      </div>
    </div>
  )
}

export default NotificationsList;