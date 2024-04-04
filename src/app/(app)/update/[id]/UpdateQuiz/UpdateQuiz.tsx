"use client";
import Modal from "@/app/(app)/create/quiz/Modal";
import Form from "@/app/(app)/create/quiz/form/Form";
import QuizActions from "@/app/(app)/create/quiz/quizActions/QuizActions";
import DataProvider from "@/providers/create-quiz/DataProvider";
import UseFormProvider from "@/providers/create-quiz/UseFormProvider";

type UpdateQuizProps = {
  setView: React.Dispatch<React.SetStateAction<number>>;
  id?: string;
}

const UpdateQuiz = ({ setView, id } : UpdateQuizProps) => {
  return (
    <div className="relative pb-24 xl:pb-0">
      <DataProvider type="update">
        <UseFormProvider>
          <div className="max-w-3xl mx-auto px-3">
            <QuizActions setView={setView} method="update" id={id} />
            <Modal />
            <Form />
          </div>
        </UseFormProvider>
      </DataProvider>
    </div>    
  )
}

export default UpdateQuiz;