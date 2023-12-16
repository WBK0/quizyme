import { UseFormContext } from "@/providers/create-quiz/UseFormProvider";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";
import { useContext, useEffect, useRef } from "react";

const Fields = () => {
  const { fields, register, move } = useContext(UseFormContext);
  const inputsRef = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    Object.values(inputsRef.current).forEach(input => {
      if(input) {
        adjustHeight(input as HTMLTextAreaElement)
      }
    })
  }, [inputsRef])

  const adjustHeight = (element: HTMLTextAreaElement) => {
    if(!element) return;
    element.style.height = "auto";
    element.style.height = (element.scrollHeight) + "px";
  }

  const handleDragEnd = (result : DropResult) => {
    if(!result.destination) return;
    move(result.source.index, result.destination.index)
  }

  return (
    <>
      <p className="text-gray-400 font-bold">
        Set answers in correct order
      </p>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col">
              { 
                fields.map((field, index) => {
                  if (inputsRef.current[field.id]) {
                    const inputElement = inputsRef.current[field.id]!;
                    inputElement.style.height = inputElement.scrollHeight + "px";
                  }
                  
                  const { ref, ...rest } = register(`answers.${index}.answer`);
                  return(
                  <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`bg-${field.color} min-h-fit w-full flex rounded-xl items-center my-2`}
                        key={field.id}
                      >
                    <textarea 
                      className='bg-transparent w-full text-white outline-none p-4 font-bold text-lg resize-none overflow-y-hidden'
                      style={{ height: inputsRef.current[field.id]?.style?.height }}
                      rows={1}
                      onInput={(e) => adjustHeight(e.target as HTMLTextAreaElement)}
                      {...rest}
                      ref={(e) => {
                        ref(e);
                        inputsRef.current[field.id] = e as HTMLTextAreaElement | null;
                      }}
                    />
                    <div  
                      className="px-4"
                    >
                      <svg
                        width="30"
                        height="24"
                        viewBox="0 0 30 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                      >
                        <rect width="30" height="5" rx="2" />
                        <rect y="9" width="30" height="5" rx="2" />
                        <rect y="18" width="30" height="5" rx="2" />
                      </svg>           
                    </div>   
                  </div>
                    )}
                </Draggable>
                )})
              } 
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
export default Fields;