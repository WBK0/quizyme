"use client";
import UseFormProvider from "@/providers/create-flashcards/UseFormProvider";
import DataProvider from "@/providers/create-flashcards/DataProvider";
import Actions from "@/app/(app)/create/flashcards/actions/Actions";
import Header from "@/app/(app)/create/flashcards/Header";
import Form from "@/app/(app)/create/flashcards/form/Form";

const UpdateFlashcards = ({ setView } : { setView: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div>
      <UseFormProvider>
        <DataProvider>
          <Actions method="update" setView={setView} />
          <div className="max-w-4xl mx-auto px-3">
            <Header 
              method="update"
            />
            <Form />
          </div>
        </DataProvider>
      </UseFormProvider>
    </div>
  )
}

export default UpdateFlashcards;