import { useContext, useEffect, useRef } from "react";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";

interface InputsRef {
  [key: string]: {
    concept: HTMLTextAreaElement | null;
    definition: HTMLTextAreaElement | null;
  };
}

const Fields: React.FC = () => {
  const { fields, register, watch, append } = useContext(UseFormContext);
  const inputsRef = useRef<InputsRef>({});

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
              <textarea
                rows={1}
                className="bg-transparent text-black font-bold resize-none px-2 outline-none md:w-1/3 w-full border-b-2 border-gray-100 focus:border-black py-3 h-full"
                {...registerConcept}
                ref={(el) => {
                  refConcept(el);
                  inputsRef.current[field.id] = {
                    ...inputsRef.current[field.id],
                    concept: el,
                  };
                }}
                onInput={(e) => adjustHeight(field.id)}
              />
              <p className="w-full px-2 text-xs font-bold text-gray-900 py-2 md:hidden mb-2">CONCEPT</p>
              <textarea
                rows={1}
                className="bg-transparent text-black font-bold resize-none px-2 outline-none md:w-2/3 w-full border-b-2 border-gray-100 focus:border-black py-3 h-full"
                {...registerDefinition}
                ref={(el) => {
                  refDefinition(el);
                  inputsRef.current[field.id] = {
                    ...inputsRef.current[field.id],
                    definition: el,
                  };
                }}
                onInput={
                  index === fields.length - 1 && watch('flashcards')[index]?.concept !== ''
                    ? () => append({})
                    : (e) => {
                        adjustHeight(field.id);
                      }
                }
              />
              <p className="w-full px-2 text-xs font-bold text-gray-900 py-2 md:hidden">DEFINITION</p>
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
