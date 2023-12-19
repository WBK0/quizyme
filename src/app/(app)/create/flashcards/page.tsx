"use client";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "./form/Form";
import Actions from "./actions/Actions";
import UseFormProvider from "@/providers/create-flashcards/UseFormProvider";
import Header from "./Header";

const CreateFlashcards = () => {
  return (
    <div>
      <UseFormProvider>
        <Actions />
        <div className="max-w-4xl mx-auto px-3">
          <Header />
          <Form />
        </div>
      </UseFormProvider>
    </div>
  )
}
export default CreateFlashcards;