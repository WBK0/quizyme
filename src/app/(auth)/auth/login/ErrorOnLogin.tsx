"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ErrorOnLogin = ({ error } : {error : string}) => {
  useEffect(() => {
    toast.error(error, {
      toastId: 'error-on-login',
      autoClose: 8000,
    });
  }, [])

  return (
    null
  )
}
export default ErrorOnLogin;