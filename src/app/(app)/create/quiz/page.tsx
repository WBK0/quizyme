"use client";
import Form from "./Form";
import DataProvider from "@/providers/create-quiz/DataProvider";
import UseFormProvider from "@/providers/create-quiz/UseFormProvider";
import Modal from "./Modal";
import QuizButtons from "./QuizButtons";

const CreateQuiz = () => {

  return (
    <div className="relative pb-24 xl:pb-0">
      <DataProvider>
        <UseFormProvider>
          <div className="max-w-3xl mx-auto px-3">
            <QuizButtons />
            <Modal />
            <Form
              // formValues={formValues}
              // setFormValues={setFormValues}
            />
          </div>
        </UseFormProvider>
      </DataProvider>
    </div>
    
  )
}
export default CreateQuiz;