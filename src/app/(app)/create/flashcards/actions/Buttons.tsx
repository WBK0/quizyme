import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SubmitErrorHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { FormInputs } from "../types/FormInputs";

type ButtonsProps = {
  setModal: (action: 'publish' | 'delete' | 'update' | null) => void;
  method: 'create' | 'update';
  setView?: React.Dispatch<React.SetStateAction<number>>
}

const Buttons = ({ setModal, method, setView } : ButtonsProps) => {
  const { handleSubmit } = useContext(UseFormContext);
  const router = useRouter();

  const onPublic = () => {
    setModal(method === 'create' ? 'publish' : 'update');
  }
 
  const onPublicError: SubmitErrorHandler<FormInputs> = (error) => {
    if (!error.flashcards || typeof error.flashcards !== 'object') {
      return;
    }
  
    if (error.flashcards.root) {
      toast.error(error.flashcards.root.message);
      return;
    }
        
    const message = typeof error.flashcards.filter === 'function' && error.flashcards.filter((item) => item !== undefined)[0];

    if (message && message.concept) {
      toast.error(message.concept.message);
    } else if (message && message.definition) {
      toast.error(message.definition.message);
    }
  };

  const onDelete = () => {
    setModal('delete');
  }

  const onUpdate = () => {
    if(method === 'create'){
      router.replace("/create?type=flashcards");
    }else{
      setView && setView(1);
    }
  }

  return (
    <div className={`xl:absolute right-0 flex flex-col gap-3 items-center pb-12`}>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-48"
        onClick={handleSubmit(onPublic, onPublicError)}
      >
        {method === 'create' ? 'Public' : 'Update'}
      </button>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 w-48"
        onClick={onUpdate}
      >
        Update Details
      </button>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300 w-48"
        onClick={onDelete}
      >
        Delete 
      </button>
    </div>        
  )
}

export default Buttons;