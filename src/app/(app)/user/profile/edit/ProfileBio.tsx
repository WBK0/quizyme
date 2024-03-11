"use client";
import Image from "next/image";
import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useContext } from "react";
import caution from "@/public/caution.png";
import { bio as bioSchema } from './schema';

const ProfileBio = () => {
  const { bio, error, dispatch } = useContext(DataContext);

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_BIO",
      payload: e.target.value
    })

    const validateBio = await bioSchema.validate(e.target.value).then(() => null).catch((err) => err.message);

    dispatch({
      type: 'UPDATE_ERROR',
      payload: { bio: validateBio || null}
    })
  }

  return (
    <div className="">
      <h2 className="font-black text-3xl">
        About user
      </h2>
      <div className="relative mt-6">
        <textarea
          placeholder="About you..." 
          className={`w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black resize-none scroll-sm ${error?.bio ? 'pr-8' : 'pr-2.5'}`}
          rows={8}
          value={bio}
          onChange={handleChange}
        />
          {
            error?.bio ?
              <div className="group">
                <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
                  <Image src={caution} width={24} height={24} alt="error" />
                </i>
                <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
                  {error.bio}
                </span>
              </div>
            : null
          }
        </div>
    </div>
  )
}

export default ProfileBio;