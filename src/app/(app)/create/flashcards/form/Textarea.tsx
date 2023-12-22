import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { MutableRefObject, useContext, useEffect } from "react";
import InputsRef from "../types/InputsRef";
import { ChangeHandler, RefCallBack, UseFormRegisterReturn } from "react-hook-form";
import { DataContext } from "@/providers/create-flashcards/DataProvider";

type TextareaProps = {
  variant: 'concept' | 'definition';
  register: {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    name: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
  };
  registerRef: RefCallBack;
  inputsRef: MutableRefObject<InputsRef>;
  adjustHeight: (id: string) => void;
  id: string;
  index: number;
}

const Textarea = ({ variant, register, registerRef, inputsRef, adjustHeight, id, index } : TextareaProps) => {
  const { fields, append, watch } = useContext(UseFormContext);
  const { setLastEddited } = useContext(DataContext);

  const handleInput = () => {
    adjustHeight(id);

    if(index === fields.length - 1 && watch('flashcards')[index]?.concept !== '' && variant === 'definition'){
      append({
        concept: '',
        definition: ''
      })
    }
  }

  useEffect(() => {
    adjustHeight(id);
  }, [])

  return (
    <>
      <textarea
        rows={1}
        className={`bg-transparent text-black font-bold resize-none px-2 outline-none w-full ${variant === 'concept' ? 'md:w-1/3' : 'md:w-2/3'} border-b-2 border-gray-100 focus:border-black pt-4 pb-2 h-full`}
        {...register}
        ref={(el) => {
          registerRef && registerRef(el);
          inputsRef.current[id] = {
            ...inputsRef.current[id],
            [variant]: el,
          };
        }}
        onInput={handleInput}
        onBlur={() => setLastEddited(id + '-' + variant)}
      />
      <p className="w-full px-2 text-xs font-bold text-gray-900 py-2 md:hidden mb-2 uppercase">{variant}</p>
    </>
  )
}
export default Textarea;