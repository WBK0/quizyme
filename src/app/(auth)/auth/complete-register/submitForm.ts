import { toast } from "react-toastify";

const submitCompleteRegisterForm = async (values: any) => {
  try {
    const res = await fetch("/api/auth/complete-register", {
      method: "POST",
      body: JSON.stringify(values),
    });

    const json = await res.json();

    if (json.status === "error") {
      throw new Error(json.message)
    }

    return true;
  } catch (error : unknown) {
    if(error instanceof Error) {
      toast.error(error.message);
    }
    console.log(error);
    return false;
  }
}

export default submitCompleteRegisterForm;