import { toast } from "react-toastify";

const submitCompleteRegisterForm = async (values: any) => {
  try {
    let formData = new FormData();
    formData.append('image', values.image);
    formData.append('firstname', values.firstname);
    formData.append('lastname', values.lastname);
    formData.append('username', values.username);
    formData.append('bio', values.bio);
    formData.append('interests', values.interests);

    const res = await fetch("/api/auth/complete-register", {
      method: "POST",
      body: formData
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