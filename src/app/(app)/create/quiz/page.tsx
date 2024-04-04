"use client";
import Form from "./form/Form";
import DataProvider from "@/providers/create-quiz/DataProvider";
import UseFormProvider from "@/providers/create-quiz/UseFormProvider";
import Modal from "./Modal";
import QuizActions from "./quizActions/QuizActions";

const CreateQuiz = () => {

  return (
    <div className="relative pb-24 xl:pb-0">
      <DataProvider type="create">
        <UseFormProvider>
          <div className="max-w-3xl mx-auto px-3">
            <QuizActions method="create" />
            <Modal />
            <Form />
          </div>
        </UseFormProvider>
      </DataProvider>
    </div>    
  )
}

export default CreateQuiz;