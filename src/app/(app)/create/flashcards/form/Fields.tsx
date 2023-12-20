import { useContext, useEffect, useRef } from "react";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import Textarea from "./Textarea";
import InputsRef from "../types/InputsRef";

const Fields: React.FC = () => {
  const inputsRef = useRef<InputsRef>({});

  const { fields, register } = useContext(UseFormContext);

  const adjustHeight = (id: string) => {
    const inputs = inputsRef.current[id];
    if(!inputs.concept || !inputs.definition){
      return;
    }

    if(window.innerWidth < 768){
      inputs.concept.style.height = "auto";
      inputs.definition.style.height = "auto";

      inputs.concept.style.height = inputs.concept.scrollHeight + 2 + "px";
      inputs.definition.style.height = inputs.definition.scrollHeight + 2 + "px";
      return;
    }

    inputs.concept.style.height = "auto";
    inputs.definition.style.height = "auto";

    let height = Math.max(inputs.concept.scrollHeight, inputs.definition.scrollHeight);

    inputs.concept.style.height = height + 2 + "px";
    inputs.definition.style.height = height + 2 + "px";
  };


  useEffect(() => {
    let widthBreakPoint: 'mobile' | 'desktop' = window.innerWidth < 768 ? 'mobile' : 'desktop';
    const handleResize = () => {
      Object.keys(inputsRef.current).forEach((key) => {
        const newBreakPoint = window.innerWidth < 768 ? 'mobile' : 'desktop';
        if(widthBreakPoint === newBreakPoint){
          return;
        }
        widthBreakPoint = newBreakPoint;
        adjustHeight(key);
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {
    console.log('adjustHeight')

    Object.keys(inputsRef.current).forEach((key) => {
      adjustHeight(key);
    });
  }, [fields.length])

  return (
    <>
      {fields.map((field, index) => {
        const { ref: refConcept, ...registerConcept } = register(`flashcards.${index}.concept`);
        const { ref: refDefinition, ...registerDefinition } = register(`flashcards.${index}.definition`);

        return (
          <div className="flex gap-0 w-full h-fit flex-wrap bg-yellow rounded-xl" key={field.id}>
            <div className="w-full px-3 py-3 border-b-4 border-white">
              <p className="font-black">{index + 1}</p>
            </div>
            <div className="flex gap-0 w-full h-fit flex-wrap">
              <Textarea 
                variant="concept"
                register={registerConcept}
                registerRef={refConcept}
                inputsRef={inputsRef}
                adjustHeight={adjustHeight}
                id={field.id}
                index={index}
              />
              <Textarea 
                variant="definition"
                register={registerDefinition}
                registerRef={refDefinition}
                inputsRef={inputsRef}
                adjustHeight={adjustHeight}
                id={field.id}
                index={index}
              />
              <p className="w-1/3 px-2 text-xs font-bold text-gray-900 py-2 hidden md:block">CONCEPT</p>
              <p className="w-1/3 px-2 text-xs font-bold text-gray-900 py-2 hidden md:block">DEFINITION</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Fields;
