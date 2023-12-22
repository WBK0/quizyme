"use client";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "./form/Form";
import Actions from "./actions/Actions";
import UseFormProvider from "@/providers/create-flashcards/UseFormProvider";
import Header from "./Header";
import DataProvider from "@/providers/create-flashcards/DataProvider";

const CreateFlashcards = () => {
  return (
    <div>
      <UseFormProvider>
        <DataProvider>
          <Actions />
          <div className="max-w-4xl mx-auto px-3">
            <Header />
            <Form />
          </div>
        </DataProvider>
      </UseFormProvider>
    </div>
  )
}
export default CreateFlashcards;