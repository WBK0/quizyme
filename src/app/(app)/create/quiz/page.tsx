"use client";
import ImageInput from "@/components/Create/ImageInput";
import ModalPicture from "@/components/Create/modal/ModalPicture";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState } from "react";
import Form from "./Form";

// type FormValues = {
//   image: string;
//   question: string;
//   answerTime: string;
//   answerPoints: string;
//   responseType: string;
//   answers: {
//       answer: string;
//       isCorrect: boolean;
//     }[]
// }[]

const CreateQuiz = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="relative pb-24 xl:pb-0">
      <div className="max-w-3xl mx-auto px-3">
        <ImageInput
          isImageSet={false}
          mainImage=""
          handleModal={handleModal}
        />
        <Form
          // formValues={formValues}
          // setFormValues={setFormValues}
        />
      </div>
      <div className="absolute flex flex-col gap-4 xl:top-0 mt-10 left-1/2 transform -translate-x-1/2 xl:right-0 xl:translate-x-0 xl:left-auto xl:mt-0 w-full xl:w-fit">
        <button
          className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-red hover:scale-105 duration-300"
        >
          Delete quiz
        </button>
        <button
          className="mx-auto rounded-full w-48 py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300"
        >
          Public quiz
        </button>
      </div>
      {
        isModalOpen
        ?
          // <ModalPicture 
          //   handleCloseModal={handleModal}
          //   value={value}
          //   setValue={setValue}
          //   name="test"
          //   type="quizzes"
          // />
          <></>
        :
          null
      }
    </div>
    
  )
}
export default CreateQuiz;