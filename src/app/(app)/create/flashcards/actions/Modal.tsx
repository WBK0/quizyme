import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { onSubmit } from "./submitForm";
import { DataContext } from "@/providers/create-flashcards/DataProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

type ModalProps = {
  modal: 'publish' | 'delete' | 'update-delete' | 'update' | null;
  handleCloseModal: () => void;
  length: number;
  id?: string;
}

const Modal = ({ modal, handleCloseModal, length, id } : ModalProps) => {
  const [value, removeLocalStorage] = useLocalStorage('create-form', {});
  const { setFormValues } = useContext(DataContext);
  const router = useRouter();
  
  const onDelete = () => {
    if(modal === 'update-delete'){
      toast.promise(
        async () => {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/flashcards/delete/${id}`, {
            method: 'DELETE'
          })
  
          const json = await response.json();
    
          if(!response.ok){
            throw new Error(json.message)
          }

          router.push('/user/studies?type=flashcards');
        }, {
          pending: 'Deleting...',
          success: `Successfully deleted flashcards`,
          error: { render: ({ data }: { data?: { message: string } }) => data?.message || `An error occurred while deleting flashcards` },
        }
      )
    } else {
      removeLocalStorage();
      router.push('/create');
    }
  }

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-lg h-fit min-h-[300px] relative rounded-2xl pb-2 sm:px-6 px-3 flex justify-between flex-col">
          <div>
            <h2 className="font-bold text-2xl text-center mt-8">Are you sure you want to {modal === 'update-delete' ? 'delete' : modal} this flashcards set?</h2>
            <h6 className="text-center font-semibold text-lg mt-5">Your set of flashcards contains {length} concepts</h6>
            {
              modal === 'update' ?
              <h6 className="text-red font-semibold mt-2 text-center">All players will lost their progress if you update this study.</h6>
              : null
            }
          </div>
          <div className="flex py-5 gap-4">
            <button 
              className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300 capitalize"
              type="button"
              onClick={() => modal === 'publish' || modal === 'update'
                ? onSubmit({formValues: value, setFormValues, removeLocalStorage, router, method: modal === 'publish' ? 'create' : 'update', id: value.id})
                : onDelete()
              }
            >
              {modal === 'update-delete' ? 'delete' : modal}
            </button>
            <button 
              type="button"
              className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300"
              onClick={handleCloseModal}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Modal;