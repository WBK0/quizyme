import { toast } from "react-toastify";
import { Data } from "./Data.type";

type handleDeleteInvitationProps = {
  id: string;
  setData: React.Dispatch<React.SetStateAction<Data>>;
  data: Data;
}

const handleDeleteInvitation = async ({ setData, data, id } : handleDeleteInvitationProps) => {
  const copy = data;
  try {
    setData((prev : Data) => {
      if(!prev) return prev;
      return prev.filter((item) => item.id !== id);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/invitations/delete/${id}`, {
      method: 'DELETE',
    });

    const json = await response.json();

    if(!response.ok){
      throw new Error(json.message);
    }
  } catch (error : unknown) {
    if(error instanceof Error){
      toast.error(error.message || "An undefined error occurred.");
    }
    if(copy){
      setData(data);
    }
  }
}

export default handleDeleteInvitation;