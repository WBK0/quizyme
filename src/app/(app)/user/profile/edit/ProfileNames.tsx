"use client";
import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useContext } from "react";

const ProfileNames = () => {
  const { username, name, dispatch } = useContext(DataContext);
  
  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_USERNAME",
      payload: e.target.value
    })
  }

  const handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_NAME",
      payload: e.target.value + ' ' + name.split(' ')[1]
    })
  }

  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_NAME",
      payload: name.split(' ')[0] + ' ' + e.target.value
    })
  }

  return (
    <div className="">
      <h2 className="font-black text-3xl">
        User names
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        <input 
          type="text" 
          placeholder="First name" 
          className="w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black"
          defaultValue={name.split(' ')[0]}
          onChange={handleFirstname}
        />
        <input 
          type="text" 
          placeholder="Last name" 
          className="w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black "
          defaultValue={name.split(' ')[1]}
          onChange={handleLastname}
        />
        <input 
          type="text" 
          placeholder="Username" 
          className="w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black"
          defaultValue={username}
          onChange={handleUsername}
        />
      </div>
    </div>
  )
}

export default ProfileNames;