import { DataContext } from "@/providers/create-flashcards/DataProvider";
import { UseFormContext } from "@/providers/create-flashcards/UseFormProvider";
import { DraggableProvidedDragHandleProps } from "@hello-pangea/dnd";
import { useContext } from "react";

type HeadingProps = {
  index: number;
  id: string;
  draggable: DraggableProvidedDragHandleProps | null;
}

const Heading = ({ index, id, draggable } : HeadingProps) => {
  const { remove } = useContext(UseFormContext);
  const { setLastEddited } = useContext(DataContext);

  const handleRemove = (index: number) => {
    remove(index);
    setLastEddited(id + '-remove');
  }

  return (
    <div className="w-full px-3 py-3 border-b-4 border-white flex justify-between items-center">
      <div>
        <p className="font-black">{index + 1}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          className="outline-none focus:outline-none"
          onClick={() => {handleRemove(index)}}
          tabIndex={-1}
        >
          <svg width="18" height="18" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M767 336H233q-12 0-21 9t-9 21l38 505q1 13 12 22t30 8h434q18 0 29-8t13-22l38-505q0-12-9-21t-21-9z"/>
            <path d="M344 841q-10 0-18-9t-8-21l-26-386q0-12 9-20t21-9 21 9 9 20l18 386q0 12-7 21t-19 9z"/>
            <path d="M508 810q0 13-7 22t-19 9-18-9-8-22l-4-385q0-12 9-20t21-9 21 9 9 20z"/>
            <path d="M664 841q0 12-8 21t-18 9q-11 0-18-9t-8-21l18-386q0-12 9-20t21-9 21 9 9 20z"/>
            <path d="M765 174L586 144q-12-2-15-15l-8-33q-4-20-14-26-6-3-22-3h-90q-16 0-23 3-10 6-13 26l-8 33q-2 13-15 15L235 174q-19 3-31 15t-13 28v28q0 9 7 15t15 6h610q9 0 16-6t6-15v-28q0-17-12-28t-32-15z"/>
          </svg>
        </button>
        <button 
          className="h-fit cursor-move"
          {...draggable}
          tabIndex={-1}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <rect width="24" height="3" rx="2" />
            <rect y="6" width="24" height="3" rx="2" />
            <rect y="12" width="24" height="3" rx="2" />
          </svg>   
        </button>
      </div>
    </div>
  )
}
export default Heading;