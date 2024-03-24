"use client";

import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

const Buttons = () => {
  const { error, name, username, bio, image, interests } = useContext(DataContext);
  const router = useRouter();

  const { update } = useSession();

  const handleUpdate = async () => {
    if(error?.bio || error?.username || error?.firstname || error?.lastname){
      toast.error('Please make sure all fields are valid before updating profile.');
      return;
    }

    toast.promise(async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim().replace(/ /g, '_'),
          firstname: name.split(' ')[0],
          lastname: name.split(' ')[1],
          bio,
          image,
          interests
        }),
      });
  
      const data = await response.json();

      setTimeout(async () => {
        await update();
        router.refresh();
      }, 0)


      if(!response.ok){
        throw new Error(data.message);
      }
    }, {
      pending: 'Updating profile...',
      success: 'Profile updated!',
      error: { render: ({ data }: { data?: { message: string } }) => data?.message || `An error occurred while updating profile` },
    })
  }

  return (
    <div className="w-full mt-4">
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
        type="button"
        onClick={handleUpdate}
      >
        Save changes
      </button>
      <button
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white mt-2 hover:scale-105 duration-300"
        type="button"
        onClick={() => router.push('/auth/password/reset')}
      >
        Change password
      </button>
    </div>
  )
}
export default Buttons