import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { toast } from "react-toastify";

type ButtonsProps = {
  setModal: (action: 'publish' | 'delete' | null) => void;
}

const Buttons = ({ setModal } : ButtonsProps) => {
  const { handleSubmit, errors } = useContext(UseFormContext);
  const router = useRouter();

  const onPublic = () => {
    setModal('publish');
  }

  const onPublicError = (error) => {
    console.log(error)
  }

  const onDelete = () => {
    setModal('delete');
  }

  const onUpdate = () => {
    router.replace("/create?type=flashcards");
  }

  return (
    <div className={`xl:absolute right-0 flex flex-col gap-3 items-center pb-12`}>
      <button
        type="button"
        className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-48"
        onClick={handleSubmit(onPublic, onPublicError)}
      >
        Public
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