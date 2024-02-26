import EasySpinner from "@/components/Loading/EasySpinner";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

type DeleteModalProps = {
  handleClose: () => void;
  type: 'quiz' | 'flashcards';
  data: {
    id: string;
    image: string;
    topic: string;
    type: string;
    length: number;
    color: string;
  },
  filterData: (id: string) => void;
}

const DeleteModal = ({ handleClose, type, data, filterData } : DeleteModalProps) => {
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    toast.promise(
      async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/user/studies/${type}/delete/${data.id}`, {
          method: 'DELETE'
        })

        const json = await response.json();
  
        if(!response.ok){
          throw new Error(json.message)
        }

        filterData(data.id);
        handleClose();
      }, {
        pending: 'Deleting...',
        success: `Successfully deleted ${type}`,
        error: { render: ({ data }: { data?: { message: string } }) => data?.message || `An error occurred while deleting ${type}` },
      }
    )
  }

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-black/50 z-50 flex justify-center items-center">
      <div className="bg-white pb-12 max-w-2xl w-full rounded-2xl relative px-3">
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={handleClose}
            className="font-black text-xl"
          >
            X
          </button>
        </div>
        <div className="mt-12 flex items-center flex-col gap-4">
          <div className="relative">
            {
              loading &&
                <div className="absolute top-0 left-0 w-full h-full max-w-[496px] max-h-[279px] flex justify-center items-center">
                  <EasySpinner />
                </div>
            }
            <Image 
              src={data.image} 
              width={496} 
              height={279} 
              alt="Hero image" 
              className={`flex justify-center aspect-video shadow-small ${loading ? 'shadow-transparent' : `shadow-${data.color}`} rounded-2xl relative`}
              onLoad={() => setLoading(false)}
            />
            {
              !loading ? (
                <div className={`absolute right-0 top-0 px-6 rounded-tr-xl rounded-bl-2xl text-white text-md font-bold py-0.5 bg-${data.color}`}>
                  {data.length} {type == 'quiz' ? 'QUESTIONS' : 'FLASHCARDS'}
                </div>
              )
              : null
            }
          </div>
          <p className="font-semibold text-lg py-2.5 text-center">
            Are you sure you want to delete the {type} <span className="font-black block ">{data.topic}?</span>
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              type="button"
              className="bg-black w-48 shadow-small shadow-red rounded-full text-white py-2.5 font-bold hover:scale-105 duration-300"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="bg-black w-48 shadow-small shadow-blue rounded-full text-white py-2.5 font-bold hover:scale-105 duration-300"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal;