import { useContext, useState } from "react";
import { GameContext } from "@/providers/play-flashcards/GameProvider";
import useUrlParams from "@/hooks/useUrlParams";
import EasySpinner from "@/components/Loading/EasySpinner";
import Menu from "./Menu";
import { Session } from "next-auth";

const Heading = ({ session } : { session: Session | null }) => {
  const [loading, setLoading] = useState(false);
  const { actualCard, flashcards } = useContext(GameContext);

  const { changeParam } = useUrlParams()

  const handleQuit = () => {
    setLoading(true);
    changeParam('fullscreen', 'false');
  }

  return (
    <div className="flex flex-col fixed w-full bg-white z-10">
      <div className="w-full flex justify-between py-2 flex-wrap sm:flex-nowrap">
        <Menu 
          session={session}
        />
        <div className="flex justify-center items-center order-last sm:order-2 mt-2 sm:mt-0 w-full sm:w-fit">
          <p className="font-black text-lg">{actualCard + 1} / {flashcards.length}</p>
        </div>
        <div className="flex-1 flex justify-end order-3">
          <div className="pr-3 sm:pr-6">
            <button 
              className="bg-red rounded-full py-1.5 sm:py-2 w-24 sm:w-32 text-white font-bold duration-300 hover:scale-105"
              onClick={handleQuit}
            >
              {
                !loading 
                  ? 'QUIT'
                  : <EasySpinner />
              }
            </button>
          </div>
          
        </div>
      </div>
      <div className="h-1 bg-blue duration-500" style={{width: (actualCard) * 100 / (flashcards.length - 1) + "%"}} />
    </div>
  )
}
export default Heading