"use client";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";

const page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useLocalStorage('create-form', {});

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-3">
        <ImageInput
          isImageSet={false}
          mainImage=""
          handleModal={handleModal}
        />
      </div>
      {
        isModalOpen
        ?
          <ModalPicture 
            handleCloseModal={handleModal}
            value={value}
            setValue={setValue}
            name="test"
            type="quizzes"
          />
        :
          null
      }
    </div>
    
  )
}
export default page;