import { useRouter } from "next/navigation";

const Buttons = ({ handleModal } : {handleModal: (action: 'publish' | 'delete' | null) => void}) => {
  const router = useRouter();

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
        onClick={() => router.push('/create?type=quiz')}
      >
        Update Details
      </button>
      <button
        type="button"
        className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300"
        onClick={() => handleModal('publish')}
      >
        Public quiz
      </button>
    </>
  )
}

export default Buttons;