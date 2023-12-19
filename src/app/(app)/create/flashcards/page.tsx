"use client";
import { useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import Form from "./form/Form";
import Actions from "./actions/Actions";

const CreateFlashcards = () => {
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues: {
      flashcards: [
        { concept: "", definition: "" },
        { concept: "", definition: "" },
        { concept: "", definition: "" },
        { concept: "", definition: "" },
        { concept: "", definition: "" },
      ]
    }
  
  });
  const { fields, append, remove } = useFieldArray({ name: "flashcards", control, rules: { required: true, minLength: 5, maxLength: 999 } })
  const inputsRef = useRef<Record<string, HTMLTextAreaElement | null>>({});

  return (
    <div>
      <Actions />
      <div className="max-w-4xl mx-auto px-3">
        <div className="flex flex-col gap-8">
          <h1 className="text-center font-black uppercase text-3xl">Add flashcards</h1>
          <p className="text-center font-semibold">You have currently created {fields.length} flashcards in this set</p>
        </div>
        <Form 
          handleSubmit={handleSubmit}
          fields={fields}
          register={register}
          append={append}
          watch={watch}
          remove={remove}
        />
      </div>
    </div>
  )
}
export default CreateFlashcards;