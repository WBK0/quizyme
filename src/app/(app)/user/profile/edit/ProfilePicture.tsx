"use client";
import { DataContext } from "@/providers/edit-profile/DataProvider";
import Image from "next/image";
import { useContext, useState } from "react";
import { toast } from "react-toastify";

const ProfilePicture = () => {
  const { image, dispatch } = useContext(DataContext);
  const [overlay, setOverlay] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLFormElement>) => {
    toast.promise(
      async () => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_CDN_URL}/upload`, {
          method: 'POST',
          body: formData
        })
  
        const data = await response.json();
    
        if(!response.ok){
          throw new Error(data.message);
        }
  
        dispatch({
          type: 'UPDATE_IMAGE',
          payload: data.url
        })
      }, {
        pending: 'Uploading image...',
        success: 'Image uploaded!',
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || `An error occurred while uploading image` },
      }
    )
  }

  return (
    <div>
      <form className="w-fit mx-auto" onChange={handleImageChange}>
        <label
          htmlFor="inputFile"
          className="relative group flex gap-3"
          onMouseEnter={() => setOverlay(true)}
          onMouseLeave={() => setOverlay(false)}
        >
          <Image 
            src={image}
            alt="Profile Picture"
            width={128}
            height={128}
            className="rounded-full group-hover:scale-110 duration-300 cursor-pointer aspect-square"
          />
          <div className={`${overlay ? 'bg-black/50' : 'bg-transparent'} absolute w-[128px] h-[128px] top-0 left-0 rounded-full group-hover:scale-110 duration-300 cursor-pointer`} />
        </label>
        <input 
          type="file"
          id="inputFile"
          className='hidden'
          accept='image/*'
        />      
      </form>
    </div>
  )
}

export default ProfilePicture;