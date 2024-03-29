"use client";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import SelectButton from "@/components/SelectButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect, useState } from "react";
import Form from "./Form";

const Content = () => {
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
        isClient
        ? <SelectButton
            options={['quiz', 'flashcards']}
            paramsName="type"
            disable={value.type ? true : false}
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
        method="create"
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

export default Content;