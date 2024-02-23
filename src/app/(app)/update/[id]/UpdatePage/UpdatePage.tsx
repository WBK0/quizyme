import Form from "@/app/(app)/create/components/Form";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import Spinner from "@/components/Loading/Spinner";
import SelectButton from "@/components/SelectButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import useUrlParams from "@/hooks/useUrlParams";
import { useEffect, useState } from "react";

type Question = {
  question: string;
  time: number;
  points: number;
  type: string;
  image: string;
  answers: {
    answer: string;
    isCorrect: boolean;
    color: string;
  }[]

}

const UpdatePage = ({ id, setView } : { id: string, setView: React.Dispatch<React.SetStateAction<number>> }) => {
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

  const nextStep = () => {
    if(getParams().type === 'quiz'){
      setView(3);
    }else if(getParams().type === 'flashcards'){
      setView(2);
    }
  }

  const getStudyData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/update/${id}`)
      
      const json = await response.json();

      const colors = ['blue', 'red', 'green', 'yellow']

      setValue({
        ...value,
        id: id,
        type: json.data.type,
        mainImage: json.data.image,
        topic: json.data.topic,
        description: json.data.description,
        collection: json.data.collection.name,
        visibility: json.data.visibility,
        points: json.data.pointsMethod || null,
        tags: json.data.tags,
        questions: json.data.questions && json.data.questions.map((question : Question) => {
          return {
            question: question.question,
            answerTime: question.time,
            answerPoints: question.points,
            responseType: question.type,
            image: question.image,
            answers: question.answers.map((answer, index) => {
              return {
                answer: answer.answer,
                ...(answer.isCorrect !== null && { isCorrect: answer.isCorrect}),
                color: colors[index % 4]
              } 
            })
          }
        }),
        flashcards: json.data.flashcards
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
            isClient
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
      : 
        <div className="w-full justify-center flex flex-col items-center absolute top-0 left-0 h-screen">
          <Spinner />
        </div>
      }
    </>
  )
}

export default UpdatePage;