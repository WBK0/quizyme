"use client";
import Form from "./Form";
import DataProvider from "@/providers/create-quiz/DataProvider";
import UseFormProvider from "@/providers/create-quiz/UseFormProvider";
import Modal from "./Modal";

const CreateQuiz = () => {

  return (
    <div className="relative pb-24 xl:pb-0">
      <DataProvider>
        <UseFormProvider>
          <div className="max-w-3xl mx-auto px-3">
            <Modal />
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
          
        </UseFormProvider>
      </DataProvider>
    </div>
    
  )
}
export default CreateQuiz;