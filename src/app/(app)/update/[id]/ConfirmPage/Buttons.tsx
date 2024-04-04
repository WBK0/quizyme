import { useRouter } from "next/navigation";

const Buttons = ({ setView } : { setView: React.Dispatch<React.SetStateAction<number>> }) => {
  const router = useRouter();

  const handleConfirm = () => {
    if(confirm('All players will lost their progress if you update this study. Are you sure?')){
      setView(1);
    }
  }

  return (
    <div className="flex gap-4 py-4 flex-wrap justify-center">
      <button 
        className="bg-black text-white font-bold w-48 py-2.5 shadow-small shadow-green rounded-full hover:scale-105 hover:shadow-transparent duration-300"
        onClick={handleConfirm}
      >
        Update
      </button>
      <button 
        className="bg-black text-white font-bold w-48 py-2.5 shadow-small shadow-red rounded-full hover:scale-105 hover:shadow-transparent duration-300"
        onClick={() => router.back()}
      >
        Cancel
      </button>
    </div>
  )
}

export default Buttons;