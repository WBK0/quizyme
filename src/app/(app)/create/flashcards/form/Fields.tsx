import { useContext, useEffect, useRef } from "react";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import Textarea from "./Textarea";
import InputsRef from "../types/InputsRef";
import { Draggable } from "@hello-pangea/dnd";

const Fields: React.FC = () => {
  const inputsRef = useRef<InputsRef>({});

  const { fields, register, remove } = useContext(UseFormContext);

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
    Object.keys(inputsRef.current).forEach((key) => {
      adjustHeight(key);
    });
  }, [fields.length])

  const handleRemove = (index: number) => {
    remove(index);
  }

  return (
    <>
      {fields.map((field, index) => {
        const { ref: refConcept, ...registerConcept } = register(`flashcards.${index}.concept`);
        const { ref: refDefinition, ...registerDefinition } = register(`flashcards.${index}.definition`);

        return (
          <Draggable key={index} draggableId={index.toString()} index={index} >
            {(provided) => (
            <div 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef} 
              className="flex gap-0 w-full flex-wrap bg-yellow rounded-xl my-2" 
              key={field.id}
            >
            <div className="w-full px-3 py-3 border-b-4 border-white flex justify-between items-center">
              <div>
                <p className="font-black">{index + 1}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="outline-none focus:outline-none"
                  onClick={() => {handleRemove(index)}}
                >
                  <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                    <path d="M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 22t30 8h434q18 0 29-8t13-22l38-505q0-12-9-21t-21-9z"/>
                    <path d="M344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20t21-9 21 9 9 20l18 386q0 12-7 21t-19 9z"/>
                    <path d="M508 810q0 13-7 22t-19 9-18-9-8-22l-4-385q0-12 9-20t21-9 21 9 9 20z"/>
                    <path d="M664 841q0 12-8 21t-18 9q-11 0-18-9t-8-21l18-386q0-12 9-20t21-9 21 9 9 20z"/>
                    <path d="M765 174L586 144q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15L235 174q-19 3-31 15t-13 28v28q0 9 7 15t15 6h610q9 0 16-6t6-15v-28q0-17-12-28t-32-15z"/>
                  </svg>
                </button>
                <button className="h-fit">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                  >
                    <rect width="24" height="3" rx="2" />
                    <rect y="7" width="24" height="3" rx="2" />
                    <rect y="14" width="24" height="3" rx="2" />
                  </svg>   
                </button>
              </div>
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
        )}
          </Draggable>
        );
      })}
    </>
  );
};

export default Fields;
