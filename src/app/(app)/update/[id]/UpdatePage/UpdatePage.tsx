import Form from "@/app/(app)/create/components/Form";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUrlParams from "@/hooks/useUrlParams";
import { useState } from "react";

const UpdatePage = ({ setView } : { setView: React.Dispatch<React.SetStateAction<number>> }) => {
  const { getParams } = useUrlParams();
  const [value, setValue] = useLocalStorage('update-form', {});
  const [modal, setModal] = useState(false);

  const setImage = (image : string) => {
    setValue({
      ...value,
      mainImage: image
    });
  }

  const handleModal = () => {
    setModal(!modal);
  };

  const nextStep = () => {
    if(getParams().type === 'quiz'){
      setView(3);
    }else if(getParams().type === 'flashcards'){
      setView(2);
    }
  }

  return (
    <>
      <div className="px-3 max-w-3xl mx-auto">
        <ImageInput
          isClient={true}
          mainImage={value.mainImage}
          handleModal={handleModal}
        />
        <Form
          type={getParams().type}
          localStorage={value}
          setLocalStorage={setValue}
          method="update"
          nextStep={nextStep}
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
    </>
  )
}

export default UpdatePage;