import Form from "@/app/(app)/create/components/Form";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import Spinner from "@/components/Loading/Spinner";
import SelectButton from "@/components/SelectButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect, useState } from "react";

const UpdatePage = ({ id } : { id: string }) => {
  const { getParams, changeParam } = useUrlParams();
  const [value, setValue] = useLocalStorage('create-form', {});
  const [loading, setLoading] = useState(true);
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

  const getStudyData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/update/${id}`)
      
      const json = await response.json();

      setValue({
        ...value,
        type: json.data.type,
        mainImage: json.data.image,
        topic: json.data.topic,
        description: json.data.description,
        collection: json.data.collection.name,
        visibility: json.data.visibility,
        points: json.data.points || null,
        tags: json.data.tags
      })

      changeParam('type', json.type);

      setLoading(false);
    } catch (error) { 
      console.log('error', error);
    }
  }
  
  useEffect(() => {
    setIsClient(true)
    getStudyData();
  }, []);

  return (<>
    {
      !loading ? 
      <div className="px-3 max-w-3xl mx-auto">
        {
          !value?.type && isClient
          ? <SelectButton
              options={['quiz', 'flashcards']}
              paramsName="type"
              disable={true}
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
          method="update"
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
      : 
        <div className="w-full justify-center flex flex-col items-center absolute top-0 left-0 h-screen">
          <Spinner />
        </div>
      }
    </>
  )
}

export default UpdatePage;