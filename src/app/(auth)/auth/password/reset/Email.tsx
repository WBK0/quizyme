"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { useState } from "react";
import caution from "@/public/caution.png";
import * as yup from "yup";
import EasySpinner from "@/components/Loading/EasySpinner";

const emailSchema = yup.string().email('Invalid email format').required('Email is required');

const Email = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/change-password/send-email`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      await emailSchema.validate(email).catch((err) => {
        throw new Error(err.errors[0]);
      });
    } catch (error: unknown) {
      if(error instanceof Error)
        setError(error.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div>
        <Image src={logo} alt="logo" />
      </div>
      <div>
        <h1 className="font-black text-4xl text-center mt-4 px-3">Change your password</h1>
        <div className="max-w-sm flex flex-col gap-4 mt-4 px-3 mx-auto">
          <p className="text-sm font-semibold text-zinc-600 text-center">Enter your email address and we will send you a link to reset your password.</p>
          <div className="relative mt-6">
            <input
              type="text"
              placeholder="Email"
              className={`w-full rounded-xl px-4 py-2 outline-none font-bold text-lg focus:ring-2 focus:ring-black ${error ? 'ring-2 ring-red' : ''}`}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="group">
              {error && 
                <i className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red cursor-pointer">
                  <Image src={caution} width={24} height={24} alt="error" />
                </i>
              }
              <span className="pointer-events-none absolute -top-7 right-0 w-full sm:w-max rounded bg-red px-2 py-1 text-sm font-bold text-gray-50 opacity-0 shadow transition-opacity group-hover:opacity-100 text-wrap"> 
                {error}
              </span>
            </div>
          </div>
          <button
            className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-black text-white hover:scale-105 duration-300"
            onClick={handleSubmit}
          >
            {
              loading ? 
                <EasySpinner />
              : "Send email"
            }
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default Email;