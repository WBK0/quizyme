"use client";
import EasySpinner from "@/components/Loading/EasySpinner";
import { DataContext } from "@/providers/edit-profile/DataProvider";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import caution from "@/public/caution.png"
import { firstname, username as usernameSchema, lastname } from "./schema";

const ProfileNames = ({ sessionUsername } : { sessionUsername : string }) => {
  const { username, name, error, dispatch } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handleUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_USERNAME",
      payload: e.target.value
    })
    dispatch({
      type: "UPDATE_ERROR",
      payload: { username: null }
    })
    setLoading(true);
  }

  const handleFirstname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validateFirstname = await firstname.validate(e.target.value).then(() => null).catch((err) => err.message);

    dispatch({
      type: 'UPDATE_ERROR',
      payload: { firstname: validateFirstname || null}
    })

    dispatch({
      type: "UPDATE_NAME",
      payload: e.target.value + ' ' + name.split(' ')[1]
    })
  }

  const handleLastname = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const validateLastname = await lastname.validate(e.target.value).then(() => null).catch((err) => err.message);

    dispatch({
      type: 'UPDATE_ERROR',
      payload: { lastname: validateLastname || null}
    })

    dispatch({
      type: "UPDATE_NAME",
      payload: name.split(' ')[0] + ' ' + e.target.value
    })
  }

  useEffect(() => {
    const validate = async () => {
      const validateUsername = await usernameSchema.validate(username).then(() => null).catch((err) => err.message);

      dispatch({
        type: 'UPDATE_ERROR',
        payload: { username: validateUsername || null}
      })

      setLoading(false);

      return !validateUsername;
    }


    const timeout = setTimeout(async () => {
      if(!loading) return;
      const isValidated = await validate();

      if(!isValidated){
        return;
      }

      if(username.trim() === sessionUsername) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/complete-register/check-username/${username}`);

      const json = await response.json();

      if(!response.ok){
        dispatch({
          type: "UPDATE_ERROR",
          payload: { username: json.message }
        })
      }

      setLoading(false)
    }, 700)

    return () => clearTimeout(timeout);
  }, [username])

  return (
    <div className="">
      <h2 className="font-black text-3xl">
        User names
      </h2>
      <div className="mt-6 flex flex-col gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="First name" 
            className={`w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black ${error?.firstname ? 'pr-10' : 'pr-2.5'}`}
            defaultValue={name.split(' ')[0]}
            onChange={handleFirstname}
          />
          {
            error?.firstname ?
              <div className="group">
                <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
                  <Image src={caution} width={24} height={24} alt="error" />
                </i>
                <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
                  {error.firstname}
                </span>
              </div>
            : null
          }
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Last name"
            className={`w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black ${error?.lastname ? 'pr-10' : 'pr-2.5'}`}
            defaultValue={name.split(' ')[1]}
            onChange={handleLastname}
          />
          {
            error?.lastname ?
              <div className="group">
                <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
                  <Image src={caution} width={24} height={24} alt="error" />
                </i>
                <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
                  {error.lastname}
                </span>
              </div>
            : null
          }
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full rounded-xl py-2 text-black font-bold text-lg ring-2 ring-transparent px-2.5 outline-none bg-gray-50 focus:ring-black hover:ring-black pr-10"
            defaultValue={username}
            onChange={handleUsername}
          />
          {
            error?.username ?
              <div className="group">
                <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
                  <Image src={caution} width={24} height={24} alt="error" />
                </i>
                <span className="pointer-events-none absolute -top-7 right-0 w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100"> 
                  {error.username}
                </span>
              </div>
              : loading ? 
                <div className="absolute right-3 top-0 h-full flex items-center">
                  <EasySpinner color="black" />
                </div>
                : null
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileNames;