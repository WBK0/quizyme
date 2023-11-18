import Image from "next/image";
import bell from '../../public/bell.svg';
import person from '../../public/person.svg';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { headers } from "next/headers";

const Actions = async () => {
  const session = await getServerSession(authOptions);

  const headersList = headers();
  const pathname = headersList.get("next-url") || "";

  return (
    <div className="flex gap-3 flex-1 justify-end hidden md:flex">
      {
        session
        ? 
        <>
          <Image src={bell} height={20} alt="Notifications center" className="cursor-pointer" />
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
  )
}
export default Actions;