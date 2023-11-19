import Searchbar from "@/components/Searchbar";
import SelectButton from "@/components/SelectButton";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect } from "react";
import ModalResults from "./ModalResults";

const PictureModal = ({ handleCloseModal } : {handleCloseModal: () => void;}) => {
  const { getParams, changeParam } = useUrlParams();

  useEffect(() => {
    if(!getParams().modalType){
      changeParam('modalType', 'online');
    }
  }, []);

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-5xl h-full max-h-[700px] relative rounded-2xl pb-2">
          <button className="absolute right-3 top-3 text-2xl font-black" onClick={handleCloseModal}>X</button>
          <div className="flex flex-col pt-10 items-center h-full px-3">
            <div className="w-full">
              <SelectButton
                options={['online', 'my computer']}
                paramsName="modalType"
              />
              <div className="max-w-xl mx-auto mt-6">
                <Searchbar />
              </div>
            </div>
            <ModalResults />
            
          </div>
        </div>
      </div>
    </div>
  )
}
export default PictureModal;