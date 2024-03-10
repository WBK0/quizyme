"use client";

import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useContext } from "react";

const ProfileBio = () => {
  const { bio, dispatch } = useContext(DataContext);

  console.log(bio)

  return (
    <div className="">
      <h2 className="font-black text-3xl">
        About user
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        <textarea
          placeholder="About you..." 
          className="w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black resize-none	"
          defaultValue={bio}
          rows={8}
          value={bio}
          onChange={(e) => {
            dispatch({
              type: "UPDATE_BIO",
              payload: e.target.value
            })
          }}
        />
      </div>
    </div>
  )
}

export default ProfileBio;