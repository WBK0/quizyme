import { useContext } from "react";
import Fields from "./Fields";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { DataContext } from "@/providers/create-flashcards/DataProvider";

const Form = () => {
  const { append, move } = useContext(UseFormContext);
  const { setLastEddited } = useContext(DataContext);

  const handleAppend = () => {
    append({
      concept: '',
      definition: ''
    })
  }

  const handleDragEnd = (result : DropResult) => {
    if(!result.destination) return;
    setLastEddited(result.destination.droppableId + "-" + Math.random());
    move(result.source.index, result.destination.index)
  }

  return (
    <form className="mt-20">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col"> 
              <Fields />
              {provided.placeholder}
              <div className="flex justify-center gap-4 flex-wrap mt-8">
                <button
                  type="button"
                  onClick={() => handleAppend()}
                  className="rounded-full py-2 outline-none font-bold text-lg bg-black text-white box-shadow shadow-small shadow-green hover:scale-105 duration-300 w-40"
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </form>
  )
}
export default Form;