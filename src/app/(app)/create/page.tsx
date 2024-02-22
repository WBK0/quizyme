"use client";
import SelectButton from "@/components/SelectButton";
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
  const [isClient, setIsClient] = useState(false);

  const setImage = (image : string) => {
    setValue({
      ...value,
      mainImage: image
    });
  }

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
    setIsClient(true)
  }, []);

  return (
    <div className="px-3 max-w-3xl mx-auto">
      {
        !value?.type && isClient
        ? <SelectButton
            options={['quiz', 'flashcards']}
            paramsName="type"
          />
        : null
      }
      
      <ImageInput
        isClient={isClient}
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
            image={value.mainImage}
            setImage={setImage}
          />
        )
      }
    </div>
  )
}
export default CreatePage;