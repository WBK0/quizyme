"use client";
import SelectButton from "@/components/SelectButton";
import camera from '@/public/camera.svg';
import Image from "next/image";
import Form from "./components/Form";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect, useState } from "react";
import ModalPicture from "../../../components/Create/modal/ModalPicture";
import useLocalStorage from "@/hooks/useLocalStorage";
import ImageInput from "@/components/Create/ImageInput";

const CreatePage = () => {
  const { getParams, changeParam } = useUrlParams();
  const [value, setValue] = useLocalStorage('create-form', {});
  const [modal, setModal] = useState(false);
  const [isImageSet, setIsImageSet] = useState(false);

  useEffect(() => {
    if(value.mainImage){
      setIsImageSet(true);
    }else{
      setIsImageSet(false);
    }
  }, [value])

  const handleModal = () => {
    setModal(!modal);
  };
  
  useEffect(() => {
    if(value?.type){
      changeParam('type', value.type);
    }
    else if(!getParams().type){
      changeParam('type', 'quiz');
    }
  }, []);

  return (
    <div className="px-3 max-w-3xl mx-auto">
      <SelectButton
        options={['quiz', 'flashcards']}
        paramsName="type"
      />
      <ImageInput
        isImageSet={isImageSet}
        mainImage={value.mainImage}
        handleModal={handleModal}
      />
      <Form
        type={getParams().type}
        localStorage={value}
        setLocalStorage={setValue}
      />
      {
        modal && (
          <ModalPicture 
            handleCloseModal={handleModal}
            value={value}
            setValue={setValue}
            name="mainImage"
          />
        )
      }
    </div>
  )
}
export default CreatePage;