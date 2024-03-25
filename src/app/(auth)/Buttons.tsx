"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Buttons = () => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <>
      {
        pathname === "/auth/complete-register" ? (
          <button
            type="button"
            className="fixed bottom-2 md:top-2 md:bottom-auto right-2 px-8 py-1 bg-black rounded-full ring-2 ring-black text-white font-bold hover:bg-white hover:text-black duration-300"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : pathname === '/auth/confirm-email' ? (
          <button
            type="button"
            className="fixed top-2 right-2 px-8 py-1 bg-black rounded-full ring-2 ring-black text-white font-bold hover:bg-white hover:text-black duration-300"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </button>
        ) : (
          <Link
            type="button"
            className="fixed top-2 right-2 px-8 py-1 bg-black rounded-full ring-2 ring-black text-white font-bold hover:bg-white hover:text-black duration-300"
            href="/"
          >
            Home
          </Link>
        )
      }
      
    </>
  )
}

export default Buttons;