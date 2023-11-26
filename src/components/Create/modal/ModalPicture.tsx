import SelectButton from "@/components/SelectButton";
import { useEffect } from "react";
import ModalOnline from "./ModalOnline";
import ModalLocal from "./ModalLocal";
import useUrlParams from "@/hooks/useUrlParams";
import ModalConfirm from "./ModalConfirm";

type ModalPictureProps = {
  handleCloseModal: () => void;
  value: {
    mainImage: string;
  };
  setValue: (value: {}) => void;
  name: string;
}


const ModalPicture = ({ handleCloseModal, value, setValue, name } : ModalPictureProps) => {
  const { getParams, changeParam } = useUrlParams();

  useEffect(() => {
    if (!getParams().modalType) {
      changeParam('modalType', 'online');
    }
  }, []);

  return (
    <div className="fixed bg-black/50 z-30 w-full h-screen top-0 left-0">
      <div className="flex items-center h-full justify-center">
        <div className="bg-white w-full max-w-5xl h-full max-h-[700px] relative rounded-2xl pb-2">
          <button className="absolute right-3 top-3 text-2xl font-black" onClick={handleCloseModal}>X</button>
          <div className="flex flex-col pt-10 items-center h-full px-3">
            {
              !value.mainImage
              ? <div className="w-full">
                  <SelectButton
                    options={['online', 'my computer']}
                    paramsName="modalType"
                  />
                </div>
              : null
            }
            {
              !value.mainImage
              ? 
                getParams().modalType === 'online'
                ? <ModalOnline value={value} setValue={setValue} name={name}/>
                : <ModalLocal value={value} setValue={setValue} name={name} />
              :
                <ModalConfirm value={value} setValue={setValue} handleCloseModal={handleCloseModal} name={name} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
export default ModalPicture;