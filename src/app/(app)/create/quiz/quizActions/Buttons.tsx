import { useRouter } from "next/navigation";

type ButtonsProps = {
  handleModal: (action: 'publish' | 'delete' | 'update' | null) => void;
  method: 'create' | 'update';
  setView?: React.Dispatch<React.SetStateAction<number>>;
}

const Buttons = ({ handleModal, method, setView } : ButtonsProps) => {
  const router = useRouter();

  const handleUpdateDetails = () => {
    if(method === 'create'){
      router.push('/create?type=quiz')
    }
    else if(method === 'update'){
      setView && setView(1)
    }
  }

  return(
    <>
      <button
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300"
        onClick={() => handleModal('delete')}
      >
        Delete quiz
      </button>
      <button
        type="button"
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-blue hover:scale-105 duration-300"
        onClick={handleUpdateDetails}
      >
        Update Details
      </button>
      <button
        type="button"
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300"
        onClick={() => handleModal(method === 'create' ? 'publish' : 'update')}
      >
        {method === 'create' ? 'Public' : 'Update'} quiz
      </button>
    </>
  )
}

export default Buttons;