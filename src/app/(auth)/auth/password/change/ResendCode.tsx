"use client";
import EasySpinner from "@/components/Loading/EasySpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResendCode = () => {
  const [count, setCount] = useState(30);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (count === 0) {
        clearInterval(timer);
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const handleResendCode = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/change-password/send-email`, {
        method: 'POST',
        body: JSON.stringify({
          email: null
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success('Code sent successfully!');
    } catch (error: unknown) {
      if(error instanceof Error)
        toast.error(error.message || "An unknown error occurred");
    } finally {
      setCount(30);
      setLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        className={`bg-black w-48 py-2 text-white rounded-full font-bold ${count === 0 ? 'hover:scale-105 duration-300' : 'cursor-no-drop'}`}
        disabled={count !== 0}
        onClick={handleResendCode}
      >
        {
          loading ? (
            <EasySpinner color="white" />
          ) : count === 0 ? "Resend Code" : count
        }
      </button>
    </div>
  )
}

export default ResendCode;