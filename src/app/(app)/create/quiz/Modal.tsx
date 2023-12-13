import { useContext, useEffect, useState } from "react";
import ImageInput from "@/components/Create/ImageInput"
import ModalPicture from "@/components/Create/modal/ModalPicture"
import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { register, setValue, watch } = useContext(UseFormContext);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleSetImage = (image : string) => {
    setValue("image", image);
  }

  useEffect(() => {
    setIsClient(true);
  }, [])

  return (
    <div>
      <ImageInput
        isClient={isClient}
        mainImage={watch('image') || ""}
        handleModal={handleModal}
      />
      {
        isModalOpen
        ?
          <ModalPicture 
            handleCloseModal={handleModal}
            image={watch('image')}
            setImage={handleSetImage}
          />
        :
          null
      }
      <input 
        type="hidden"
        {...register("image")}
      />
    </div>
  )
}
export default Modal